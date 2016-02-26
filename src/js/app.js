(function() {

var conf = {
  baseUrl: 'http://api.lingvo.tv',
  //baseUrl: 'http://localhost:3000',
  languages: [{a: 'en', f: 'English'}, {a: 'de', f: 'German'}, {a: 'ru', f: 'Russian'}, {a: 'es', f: 'Spanish'}, {a: 'it', f: 'Italian'}, {a: 'fr', f: 'French'}, {a: 'pl', f: 'Polnish'}, {a: 'tr', f: 'Turkish'}, {a: 'iw', f: 'Hebrew'}, {a: 'ar', f: 'Arabic'}]
}

var state = getState() || {
  autoSync: true,
  subLang: 'en',
  trLang: 'en',
  auth: undefined
}

var app
var socket

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

function $(nameOrEl, props, children) {
  if (Array.isArray(props)) {
    children = props
    props = null
  }

  var el = typeof nameOrEl === 'string' ? document.createElement(nameOrEl) : nameOrEl

  if (props) {
    for (var prop in props) {
      el[prop] = props[prop]
    }
  }

  if (children) {
    for (var i = 0; i < children.length; i++) {
      el.appendChild(children[i])
    }
  }

  return el
}

function on(el, event, handler) {
  el.addEventListener(event, handler, false)
}

function createApp() {
  var node = $('div', {className: 'app'})
  var cursor = -1
  var history = []
  var subtitles
  var menu
  var translation

  function createSubtitles() {
    var node = $('div', {className: 'subtitles'})

    function select(node) {
      if (!node.classList.contains('word')) return false
      node.classList.toggle('selected')
      return true
    }

    function getWords(node) {
      return toArray(node.querySelectorAll('.selected')).map(function(node) {
        // Remove spaces and punktuation marks.
        return node.textContent.replace(/\W/g, '')
      }).join(' ')
    }

    on(node, 'click', function(e) {
      var node = e.target
      if (!select(node)) return
      var words = getWords(node)
      if (words) {
        translate(words, translation.render)
      }
    })

    function wrapInSpans(text) {
      return text.split(' ').map(function(word) {
        return '<span class="word">' + word + '</span> '
      }).join('')
    }

    function render(state) {
      var html = state.text.split('\n').map(function(p) {
        return '<p>' + wrapInSpans(p) + '</p>'
      }).join('')

      node.innerHTML = html
    }

    return {
      node: node,
      render: render
    }
  }

  function createTranslation() {
    var node = $('div', {className: 'translation'})

    function render(state) {
      var html = ''
      html += '<h2>' + state.original + ' - ' + state.translation.main + '</h2>'
      state.translation.others.forEach(function(tr) {
        state += '<section>'
          html += '<header>' + tr.type + '</header>'
          html += '<p>' + tr.translations.join('<br />') + '</p>'
        html += '</section>'
      })
      node.innerHTML = html
    }

    return {
      node: node,
      render: render
    }
  }

  function createMenu() {
    var node = $('div', {className: 'menu'})

    var langOptions = conf.languages.map(function(lang) {
      return '<option value="'+ lang.a + '">'+ lang.f +'</option>'
    }).join('')

    function render() {
      var subLang, trLang
      var auth

      $(node, [
        $('section', [
          $('label', {textContent: 'Subtitles Language'}),
          subLang = $('select', {
            innerHTML: langOptions,
            value: state.subLang
          })
        ]),
        $('section', [
          $('label', {textContent: 'Translation Language'}),
          trLang = $('select', {
            innerHTML: langOptions,
            value: state.trLang
          })
        ]),
        $('section', [
          $('label', {textContent: 'Auth Code'}),
          auth = $('input', {
            type: 'number',
            className: 'auth',
            min: 0,
            max: 9999
          })
        ])
      ])

      on(subLang, 'change', function() {
        setState({subLang: subLang.value})
      })
      on(trLang, 'change', function() {
        setState({trLang: trLang.value})
      })
      on(auth, 'keypress', function() {
        this.value = this.value.substr(0, 3)
        if (this.value.length === 4) {
          state.auth = this.value
        }
      })
    }

    return {
      node: node,
      render: render
    }
  }

  function createNav(props) {
    var node = $('div', {className: 'nav'})

    function render() {
      var prev
      var sync
      var next
      var menu

      $(node, [
        prev = $('button', {className: 'prev'}),
        sync = $('button', {className: 'sync'}),
        next = $('button', {className: 'next'}),
        menu = $('button', {className: 'menu'})
      ])

      function setAutoSync(value) {
        setState({autoSync: value})
        sync.classList[value ? 'add' : 'remove']('selected')
      }

      function hideMenu() {
        props.onHideMenu()
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
        if (history[cursor]) subtitles.render({text: history[cursor].original})
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

          if (history[cursor]) subtitles.render({text: history[cursor].original})
          hideMenu()
        })
      })

      on(menu, 'click', function() {
        props.onToggleMenu()
        menu.classList.toggle('selected')
      })
    }

    return {
      node: node,
      render: render
    }
  }

  function onSubtitle(data) {
    history.push(data)
    if (state.autoSync) {
      cursor = history.length - 1
      subtitles.render({text: data.original})
    }
  }

  function render(state) {
    subtitles = createSubtitles()
    subtitles.render({text: state.subtitle})
    translation = createTranslation()
    menu = createMenu()
    menu.render()
    var nav = createNav({
      onHideMenu: function() {
        node.classList.remove('menu')
      },
      onToggleMenu: function() {
        node.classList.toggle('menu')
      }
    })
    nav.render()

    $(node, [
      $('div', {className: 'body'}, [
        subtitles.node,
        translation.node,
        menu.node
      ]),
      nav.node
    ])
  }

  return {
    node: node,
    render: render,
    onSubtitle: onSubtitle
  }
}

function connect() {
  var socket = io.connect(conf.baseUrl, {
    transports: ['polling']
  })

  socket.on('connected', function() {
    console.log('Connected.')
  })

  socket.on('subtitle', app.onSubtitle)

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
  app = createApp()
  // People don't expect that they receive subtitles only if they play the movie.
  app.render({subtitle: 'Play movie to receive subtitles'})
  document.body.appendChild(app.node)
  // if (state.auth) socket = connect()
  socket = connect()
}())
}())
