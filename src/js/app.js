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

  if (children) {
    el.innerHTML = ''
    for (var i = 0; i < children.length; i++) {
      el.appendChild(children[i])
    }
  }

  if (props) {
    for (var prop in props) {
      // Its a function call.
      if (typeof el[prop] === 'function') {
        el[prop].apply(el, props[prop])
      } else {
        el[prop] = props[prop]
      }
    }
  }

  return el
}

function createApp() {
  var node = $('div', {className: 'app'})
  var cursor = -1
  var history = []
  var subtitles
  var menu
  var translation

  function createSubtitles(props) {
    var node = $('div', {
      className: 'subtitles',
      onclick: onSelectWord
    })

    function getWords() {
      return toArray(node.querySelectorAll('.selected')).map(function(node) {
        // Remove spaces and punktuation marks.
        return node.textContent.replace(/\W/g, '')
      }).join(' ')
    }

    function onSelectWord(e) {
      if (!e.target.classList.contains('word')) return
      e.target.classList.toggle('selected')
      var words = getWords()
      if (words) props.onSelectWords(words)
    }

    function renderWords(text) {
      return text.split(' ').reduce(function(words, word) {
        words.push($('span', {className: 'word', textContent: word}))
        words.push($('span', {textContent: '  '}))
        return words
      }, [])
    }

    function render(state) {
      $(node, state.text.split('\n').map(function(line) {
        return $('p', renderWords(line))
      }))
      return node
    }

    return {
      node: node,
      render: render
    }
  }

  function createTranslation() {
    var node = $('div', {className: 'translation'})

    function render(state) {
      $(node, [
        $('h2', {textContent: state.original + ' - ' + state.translation.main}),
        $('div', state.translation.others.map(function(tr) {
          return $('section', [
            $('header', {textContent: tr.type}),
            $('p', {innerHTML: tr.translations.join('<br />')})
          ])
        }))
      ])
      return node
    }

    return {
      node: node,
      render: render
    }
  }

  function createMenu(props) {
    var node = $('div', {className: 'menu'})

    function onChangeSubLang(e) {
      props.onChangeSubLang(e.target.value)
    }

    function onChangeTrLang(e) {
      props.onChangeTrLang(e.target.value)
    }

    function onChangeAuth(e) {
      var value = e.target.value
      e.target.value = value.substr(0, 3)
      if (value.length === 4) {
        props.onChangeAuth(value)
      }
    }

    function renderLangOptions() {
      return props.languages.map(function(lang) {
        return $('option', {value: lang.a, textContent: lang.f})
      })
    }

    function render() {
      $(node, [
        $('section', [
          $('label', {textContent: 'Subtitles Language'}),
          $('select', {
            value: state.subLang,
            onchange: onChangeSubLang
          }, renderLangOptions())
        ]),
        $('section', [
          $('label', {textContent: 'Translation Language'}),
          $('select', {
            value: state.trLang,
            onchange: onChangeTrLang
          }, renderLangOptions())
        ]),
        $('section', [
          $('label', {textContent: 'Auth Code'}),
          $('input', {
            type: 'number',
            className: 'auth',
            min: 0,
            max: 9999,
            onkeypress: onChangeAuth
          })
        ])
      ])

      return node
    }

    return {
      node: node,
      render: render
    }
  }

  function createNav(props) {
    var node = $('div', {className: 'nav'})
    var sync
    var menu

    function onSync() {
      // Already on, switch off.
      if (state.autoSync) {
        return setAutoSync(false)
      }
      document.body.scrollTop = 0
      setAutoSync(true)
      cursor = history.length - 1
      if (history[cursor]) subtitles.render({text: history[cursor].original})
      hideMenu()
    }

    function onShowPrev(e) {
      cursor--
      if (cursor < 0) cursor = 0
      updateSubtitles()
    }

    function onShowNext(e) {
      cursor++
      if (!history[cursor]) cursor = history.length - 1
      updateSubtitles()
    }

    function onToggleMenu() {
      props.onToggleMenu()
      menu.classList.toggle('selected')
    }

    function updateSubtitles() {
      setAutoSync(false)
      if (history[cursor]) subtitles.render({text: history[cursor].original})
      hideMenu()
    }

    function setAutoSync(value) {
      setState({autoSync: value})
      sync.classList[value ? 'add' : 'remove']('selected')
    }

    function hideMenu() {
      props.onHideMenu()
      menu.classList.remove('selected')
    }

    function render() {
      $(node, [
        $('button', {className: 'prev', onclick: onShowPrev}),
        sync = $('button', {className: 'sync', onclick: onSync}),
        $('button', {className: 'next', onclick: onShowNext}),
        menu = $('button', {className: 'menu', onclick: onToggleMenu})
      ])
      setAutoSync(state.autoSync)
      return node
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
    subtitles = createSubtitles({
      onSelectWords: function(words) {
        translate(words, translation.render)
      }
    })
    translation = createTranslation()
    menu = createMenu({
      languages: conf.languages,
      onChangeSubLang: function(value) {
        setState({subLang: value})
      },
      onChangeTrLang: function(value) {
        setState({trLang: value})
      },
      onChangeAuth: function(value) {
        setState({auth: value})
      }
    })
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
        subtitles.render({text: state.subtitle}),
        translation.node,
        menu.node
      ]),
      nav.node
    ])

    return node
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
