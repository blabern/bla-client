(function() {

var conf = {
  baseUrl: 'http://api.lingvo.tv',
  //baseUrl: 'http://localhost:3000',
  languages: [{a: 'en', f: 'English'}, {a: 'de', f: 'German'}, {a: 'ru', f: 'Russian'}, {a: 'es', f: 'Spanish'}, {a: 'it', f: 'Italian'}, {a: 'fr', f: 'French'}, {a: 'pl', f: 'Polnish'}, {a: 'tr', f: 'Turkish'}, {a: 'iw', f: 'Hebrew'}, {a: 'ar', f: 'Arabic'}]
}

/* Utils */

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

function removeNode(node) {
  if (!node || !node.parentNode) return false
  node.parentNode.removeChild(node)
  return true
}

function $(nameOrNode, props, children) {
  if (Array.isArray(props)) {
    children = props
    props = null
  }

  var node = typeof nameOrNode === 'string' ? document.createElement(nameOrNode) : nameOrNode

  if (children) {
    node.innerHTML = ''
    for (var i = 0; i < children.length; i++) {
      node.appendChild(children[i])
    }
  }

  if (props) {
    for (var prop in props) {
      if (prop === 'classes') {
        node.className = props[prop].join(' ')
      } else if (prop === 'dataset') {
        for (var key in props[prop]) {
          node.dataset[key] = props[prop][key]
        }
      // Its a function call.
      } else if (typeof node[prop] === 'function') {
        node[prop].apply(node, props[prop])
      } else {
        node[prop] = props[prop]
      }
    }
  }

  return node
}

/* App */

var app
var socket
var state = assign({
  subLang: 'en',
  trLang: 'en',
  auth: undefined
}, getState())

function createApp() {
  var node = $('div', {className: 'app'})
  var stream
  var menu

  function createStream(props) {
    var node = $('div', {
      className: 'screen stream',
      onclick: onSelectWord
    })
    var down
    var first = false
    var autoScroll = true
    var sectionCounter = 0

    function onSelectWord(e) {
      var node = e.target
      if (!node.classList.contains('word')) return
      node.classList.toggle('selected')
      renderTranslation(node.closest('section'))
    }

    function onScrollToEnd() {
      node.scrollTop = node.scrollHeight
    }

    function onScroll() {
      updateDownVisibility()
    }

    // We need to reuse the instance if its in the same section.
    var getTranslation = (function() {
      var map = {}
      return function(section) {
        var key = section.dataset.key
        if (!map[key]) map[key] = createTranslation()
        return map[key]
      }
    }())

    function renderTranslation(section) {
      var words = getWords(section)
      var translation = getTranslation(section)

      if (!words) {
        removeNode(translation.node)
        return
      }

      translate(words, function(data) {
        translation.render(data)
        section.appendChild(translation.node)
        setTimeout(updateDownVisibility, 100)
      })
    }

    function updateDownVisibility() {
      // Scrolled to the bottom.
      var nextAutoScroll = Math.abs(node.scrollTop - (node.scrollHeight - node.offsetHeight)) < 5
      if (nextAutoScroll !== autoScroll) {
        autoScroll = nextAutoScroll
        down.classList[autoScroll ? 'add' : 'remove']('hidden')
      }
    }

    function getWords(section) {
      return toArray(section.querySelectorAll('.selected')).map(function(node) {
        // Remove spaces and punktuation marks.
        return node.textContent.replace(/\W/g, '')
      }).join(' ')
    }

    function renderWords(text) {
      return text.split(' ').reduce(function(words, word) {
        words.push($('span', {className: 'word', textContent: word}))
        words.push($('span', {textContent: '  '}))
        return words
      }, [])
    }

    function renderSection(text) {
      var lines = text.split('\n')
      first = !first
      return $('section', {
          className: first ? 'first' : 'second',
          dataset: {key: ++sectionCounter}
        }, [
        $('div', {className: 'subtitle'}, lines.map(function(line) {
          return $('p', renderWords(line))
        }))
      ])
    }

    function append(data) {
      node.appendChild(renderSection(data.text))
      if (autoScroll) onScrollToEnd()
    }

    function render(data) {
      return $(node, {onscroll: onScroll}, [
        down = $('button', {className: 'down-button hidden', onclick: onScrollToEnd}),
        renderSection(data.text)
      ])
    }

    return {
      node: node,
      render: render,
      append: append
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
    var node = $('div', {className: 'screen menu hidden'})

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

    function toggle() {
      node.classList.toggle('hidden')
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
      render: render,
      toggle: toggle
    }
  }

  function createNav(props) {
    var node = $('div', {className: 'nav'})
    var menu


    function onToggleMenu() {
      props.onToggleMenu()
      menu.classList.toggle('selected')
    }

    function render() {
      $(node, [
        menu = $('button', {className: 'menu-button', onclick: onToggleMenu})
      ])
      return node
    }

    return {
      node: node,
      render: render
    }
  }

  function onSubtitle(data) {
    stream.append({text: data.original})
  }

  function render(state) {
    stream = createStream()
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
      onToggleMenu: menu.toggle
    })
    nav.render()

    $(node, [
      stream.render({text: state.subtitle}),
      menu.node,
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
