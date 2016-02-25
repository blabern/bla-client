(function() {

var conf = {
  baseUrl: 'http://api.lingvo.tv',
  //baseUrl: 'http://localhost:3000',
  languages: [{a: 'en', f: 'English'}, {a: 'de', f: 'German'}, {a: 'ru', f: 'Russian'}, {a: 'es', f: 'Spanish'}, {a: 'it', f: 'Italian'}, {a: 'fr', f: 'French'}, {a: 'pl', f: 'Polnish'}, {a: 'tr', f: 'Turkish'}, {a: 'iw', f: 'Hebrew'}, {a: 'ar', f: 'Arabic'}]
}

var state = getState() || {
  autoSync: true,
  subLang: 'en',
  trLang: 'en'
}

function assign(a, b) {
  for (var key in b) a[key] = b[key]
  return a
}

function setState(nextState) {
  assign(state, nextState)
  try {
    localStorage.setItem('lingvo.tv', JSON.stringify(state))
  } catch (err) {
    console.log(err)
  }
}

function getState() {
  var item = localStorage.getItem('lingvo.tv')
  if (item) return JSON.parse(item)
}

function toArray(obj) {
  return [].slice.call(obj)
}

function $(name, props) {
  var el = document.createElement(name)
  if (props) {
    for (var prop in props) {
      el[prop] = props[prop]
    }
  }
  return el
}

function on(el, event, handler) {
  el.addEventListener(event, handler, false)
}

function createView() {
  var cursor = -1
  var history = []

  var app = document.body.appendChild($('div', {className: 'app'}))
  var body = app.appendChild($('div', {className: 'body'}))

  var subtitles = (function(parent) {
    var subtitles = parent.appendChild($('div', {className: 'subtitles'}))

    function select(node) {
      if (!node.classList.contains('word')) return false
      node.classList.toggle('selected')
      return true
    }

    function getWords(node) {
      return toArray(subtitles.querySelectorAll('.selected')).map(function(node) {
        // Remove spaces and punktuation marks.
        return node.textContent.replace(/\W/g, '')
      }).join(' ')
    }

    on(subtitles, 'click', function(e) {
      var node = e.target
      if (!select(node)) return
      var words = getWords(node)
      if (words) translate(words, renderTranslation)
    })

    return subtitles
  }(body))

  var translation = body.appendChild($('div', {className: 'translation'}))

  var menu = (function(parent) {
    var menu =  body.appendChild($('div', {className: 'menu'}))

    var langOptions = conf.languages.map(function(lang) {
      return '<option value="'+ lang.a+ '">'+ lang.f +'</option>'
    }).join('')

    var section = menu.appendChild($('section'))
    section.appendChild($('label', {textContent: 'Subtitles Language'}))
    var subLang = section.appendChild($('select', {
      innerHTML: langOptions,
      value: state.subLang
    }))
    on(subLang, 'change', function() {
      setState({subLang: subLang.value})
    })

    var section = menu.appendChild($('section'))
    section.appendChild($('label', {
      textContent: 'Translation Language'
    }))
    var trLang = section.appendChild($('select', {
      innerHTML: langOptions,
      value: state.trLang
    }))
    on(trLang, 'change', function() {
      setState({trLang: trLang.value})
    })
  }(body))

  var nav = (function(parent) {
    var nav = parent.appendChild($('div', {className: 'nav'}))
    var prev = nav.appendChild($('button', {className: 'prev'}))
    var sync = nav.appendChild($('button', {className: 'sync'}))
    var next = nav.appendChild($('button', {className: 'next'}))
    var menu = nav.appendChild($('button', {className: 'menu'}))

    function setAutoSync(value) {
      setState({autoSync: value})
      sync.classList[value ? 'add' : 'remove']('selected')
    }

    function hideMenu() {
      parent.classList.remove('menu')
      menu.classList.remove('selected')
    }

    on(sync, 'click', function() {
      // Already on, switch off.
      if (state.autoSync) {
        return setAutoSync(false)
      }
      document.body.scrollTop = 0
      setAutoSync(true)
      cursor = history.length - 1
      if (history[cursor]) renderSubtitle(history[cursor].original)
      hideMenu()
    })

    setAutoSync(state.autoSync)

    ;[prev, next].forEach(function(button) {
      on(button, 'click', function(e) {
        if (e.target === prev) {
          cursor--
          if (cursor < 0) cursor = 0
        } else {
          cursor++
          if (!history[cursor]) cursor = history.length - 1
        }
        setAutoSync(false)

        if (history[cursor]) renderSubtitle(history[cursor].original)
        hideMenu()
      })
    })

    on(menu, 'click', function() {
      parent.classList.toggle('menu')
      menu.classList.toggle('selected')
    })
  }(app))

  function onSubtitle(data) {
    history.push(data)
    if (state.autoSync) {
      cursor = history.length - 1
      renderSubtitle(data.original)
    }
  }

  function renderSubtitle(subtitle) {
    function wrapInSpans(text) {
      return text.split(' ').map(function(word) {
        return '<span class="word">' + word + '</span> '
      }).join('')
    }

    var html = subtitle.split('\n').map(function(p) {
      return '<p>' + wrapInSpans(p) + '</p>'
    }).join('')

    subtitles.innerHTML = html
  }

  function renderTranslation(data) {
    var html = ''
    html += '<h2>' + data.original + ' - ' + data.translation.main + '</h2>'
    data.translation.others.forEach(function(tr) {
      html += '<section>'
        html += '<header>' + tr.type + '</header>'
        html += '<p>' + tr.translations.join('<br />') + '</p>'
      html += '</section>'
    })
    translation.innerHTML = html
  }

  return {
    onSubtitle: onSubtitle,
    renderSubtitle: renderSubtitle
  }
}

function connect(view) {
  var socket = io.connect(conf.baseUrl, {
    transports: ['polling']
  })

  socket.on('connected', function() {
    console.log('Connected.')
  })

  socket.on('subtitle', view.onSubtitle)

  return socket
}

function translate(text, callback) {
  var url = conf.baseUrl + '/translation/' + state.subLang + '-' + state.trLang + '/' + encodeURI(text)
  fetch(url)
    .then(function(res) {
      return res.text()
    })
    .then(function(text) {
      callback(JSON.parse(text))
    })
    .catch(function(err) {
      console.log(err)
    })
}

;(function init() {
  MBP.scaleFix()
  MBP.hideUrlBarOnLoad()
  MBP.listenForGhostClicks()
  FastClick.attach(document.body)
  var view = createView()
  // People don't expect that they receive subtitles only if they play the movie.
  view.renderSubtitle('Play movie to receive subtitles')
  connect(view)
}())
}())
