(function() {

var conf = {
  baseUrl: 'http://api.lingvo.tv',
  //baseUrl: 'http://localhost:3000',
  languages: [{a: 'en', f: 'English'}, {a: 'de', f: 'German'}, {a: 'ru', f: 'Russian'}, {a: 'es', f: 'Spanish'}, {a: 'it', f: 'Italian'}, {a: 'fr', f: 'French'}, {a: 'pl', f: 'Polnish'}, {a: 'tr', f: 'Turkish'}, {a: 'iw', f: 'Hebrew'}, {a: 'ar', f: 'Arabic'}]
}

var log = console.log.bind(console)
var error = console.error.bind(console)

/* Utils */

function assign(a, b) {
  for (var key in b) a[key] = b[key]
  return a
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

var state = assign({
  subLang: 'en',
  trLang: 'en',
  auth: undefined
}, getState())

function setState(nextState) {
  assign(state, nextState)
  try {
    localStorage.setItem('lingvo.tv', JSON.stringify(state))
  } catch (err) {
    error(err)
  }
}

function getState() {
  var item = localStorage.getItem('lingvo.tv')
  if (item) return JSON.parse(item)
}

function createApp(props) {
  var node = $('div', {className: 'app'})
  var stream

  function createStream(props) {
    var node = $('div', {
      className: 'screen stream hidden',
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

      props.onTranslate(words, function(data) {
        translation.render(data)
        section.appendChild(translation.node)
        setTimeout(updateDownVisibility, 100)
      })
    }

    function updateDownVisibility() {
      // Scrolled to the bottom.
      var distance = node.scrollTop - (node.scrollHeight - node.offsetHeight)
      var nextAutoScroll = distance > -20
      if (nextAutoScroll !== autoScroll) {
        autoScroll = nextAutoScroll
        down.classList[autoScroll ? 'remove' : 'add']('upscaled')
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
        words.push($('span', {textContent: ' '}))
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

    function show() {
      node.classList.remove('hidden')
    }

    function hide() {
      node.classList.add('hidden')
    }

    function render(data) {
      return $(node, {onscroll: onScroll}, [
        down = $('button', {className: 'icon-button down-button', onclick: onScrollToEnd}),
        renderSection(data.text)
      ])
    }

    return {
      node: node,
      render: render,
      append: append,
      show: show,
      hide: hide
    }
  }

  function createTranslation() {
    var node = $('div', {className: 'translation'})

    function render(data) {
      $(node, [
        $('h2', {textContent: data.original + ' - ' + data.translation.main}),
        $('div', data.translation.others.map(function(tr) {
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

    function onAuthorize() {
      props.onAuthorize()
    }

    function renderLangOptions() {
      return props.languages.map(function(lang) {
        return $('option', {value: lang.a, textContent: lang.f})
      })
    }

    function show() {
      node.classList.remove('hidden')
    }

    function hide() {
      node.classList.add('hidden')
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
        $('hr'),
        $('section', [
          $('button', {textContent: 'Re-enter Auth Code', onclick: onAuthorize})
        ])
      ])

      return node
    }

    return {
      node: node,
      render: render,
      hide: hide,
      show: show
    }
  }

  function createAuth(props) {
    var node = $('div', {className: 'screen auth hidden'})
    var input
    var length = 4

    function onSubmit(e) {
      e.preventDefault()
      props.onAuth(input.value)
    }

    // Length validation in mobile safari doesn't work.
    function onKeyUp() {
      if (input.value.length === length) {
        input.setCustomValidity('')
      } else {
        input.setCustomValidity('Required '+ length +' numbers.')
      }
    }

    function hide() {
      input.blur()
      node.classList.add('hidden')
    }

    function show() {
      node.classList.remove('hidden')
      input.focus()
    }

    function checkValidity() {
      var isValid = input.checkValidity()
      if (isValid) props.onAuth(input.value)
      return isValid
    }

    function render() {
      $(node, [
        $('form', {onsubmit: onSubmit}, [
          $('label', {textContent: 'Auth Code'}),
          input = $('input', {
            type: 'number',
            className: 'auth no-spinner',
            min: 1,
            max: 9999,
            size: length,
            value: props.value || '',
            required: true,
            autofocus: true,
            onkeyup: onKeyUp
          }),
          $('p', {textContent: 'Click on Extension to get the code.'})
        ])
      ])

      return node
    }

    return {
      node: node,
      render: render,
      hide: hide,
      show: show,
      checkValidity: checkValidity
    }
  }

  function createNav(props) {
    var node = $('div', {className: 'nav'})
    var items = {}
    var selected

    function onShow(name) {
      if (selected === items[name]) return
      props.onShow(name)
      select(name)
    }

    function select(name) {
      unselect()
      selected = items[name]
      selected.classList.add('selected')
    }

    function unselect() {
      if (!selected) return
      selected.classList.remove('selected')
      selected = null
    }

    function render() {
      $(node, [
        items.menu = $('button', {
          className: 'icon-button menu-button',
          onclick: onShow.bind(null, 'menu')
        }),
        items.stream = $('button', {
          className: 'icon-button stream-button',
          onclick: onShow.bind(null, 'stream')
        })
      ])
      return node
    }

    return {
      node: node,
      render: render,
      select: select,
      unselect: unselect
    }
  }

  function onSubtitle(data) {
    stream.append({text: data.original})
  }

  function createController(props) {
    var active

    function show(view) {
      if (view === active) return
      if (active) active.hide()
      view.show()
      active = view
      props.onShow(view)
    }

    return {
      show: show
    }
  }

  function render(data) {
    var controller = createController({
      onShow: function(inst) {
        switch (inst) {
          case stream:
            return nav.select('stream')
          case menu:
            return nav.select('menu')
          case auth:
            return nav.unselect()
        }
      }
    })

    stream = createStream({onTranslate: props.onTranslate})

    var menu = createMenu({
      languages: conf.languages,
      onChangeSubLang: function(value) {
        setState({subLang: value})
      },
      onChangeTrLang: function(value) {
        setState({trLang: value})
      },
      onAuthorize: function() {
        controller.show(auth)
      }
    })
    menu.render()

    var nav = createNav({
      onShow: function(name) {
        switch (name) {
          case 'menu':
            return controller.show(menu)
          case 'stream':
            return controller.show(stream)
        }
      }
    })
    nav.render()

    var auth = createAuth({
      value: state.auth,
      onAuth: function(value) {
        setState({auth: value})
        controller.show(stream)
        props.onAuth(value)
      }
    })
    auth.render()
    if (!auth.checkValidity()) {
      controller.show(auth)
    }

    $(node, [
      stream.render({text: data.subtitle}),
      menu.node,
      auth.node,
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

function createApi(props) {
  var socket

  function connect() {
    socket = io.connect(conf.baseUrl, {
      transports: ['polling']
    })

    socket.on('connect', function() {
      log('Socket connected.')
    })

    socket.on('authorized', function(code) {
      log('Connection authorized', code)
    })

    socket.on('subtitle', props.onSubtitle)

    return socket
  }

  function auth(code) {
    socket.emit('authorize', code)
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
      .catch(error)
  }

  return {
    connect: connect,
    translate: translate,
    auth: auth
  }
}


;(function init() {
  FastClick.attach(document.body)

  var api = createApi({
    onSubtitle: function(data) {
      app.onSubtitle(data)
    }
  })

  var app = createApp({
    onTranslate: api.translate,
    onAuth: api.auth
  })

  api.connect()
  // People don't expect that they receive subtitles only if they play the movie.
  app.render({subtitle: 'Play movie to receive subtitles'})

  document.body.appendChild(app.node)
}())
}())
