(function() {

var conf = {
  baseUrl: 'http://api.lingvo.tv',
  // baseUrl: 'http://localhost:3000',
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

function createScrollController(props) {
  var node = props.node
  var threshold = 20
  var state = {
    isAtBottom: undefined
  }

  function check() {
    var distance = node.scrollTop - (node.scrollHeight - node.offsetHeight)
    var isAtBottom = distance > -threshold
    if (isAtBottom !== state.isAtBottom) {
      state.isAtBottom = isAtBottom
      props.onChange(state)
    }
  }

  node.addEventListener('scroll', check)

  return {
    check: check
  }
}


function createStream(props) {
  var node = $('div', {
    className: 'screen stream hidden',
    onclick: onSelectWord
  })
  var first = false
  var autoScroll = true
  var sectionCounter = 0

  var scrollController = createScrollController({
    node: node,
    onChange: onScrollChange
  })

  function onSelectWord(e) {
    var node = e.target
    if (!node.classList.contains('word')) return
    node.classList.toggle('selected')
    renderTranslation(node.closest('section'))
  }

  function onScrollChange(state) {
    autoScroll = state.isAtBottom
    if (state.isAtBottom) props.onHideJumper()
    else props.onShowJumper()
  }

  function scrollToEnd() {
    node.scrollTop = node.scrollHeight
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
      scrollController.check()
      return
    }

    props.onTranslate(words, function(data) {
      translation.render(data)
      section.appendChild(translation.node)
      setTimeout(scrollController.check, 100)
    })
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
    if (autoScroll) scrollToEnd()
  }

  function show() {
    node.classList.remove('hidden')
  }

  function hide() {
    node.classList.add('hidden')
  }

  function render(data) {
    return $(node, [
      renderSection(data.text)
    ])
  }

  return {
    node: node,
    render: render,
    append: append,
    show: show,
    hide: hide,
    scrollToEnd: scrollToEnd
  }
}

function createJumper(props) {
  var node = $('button', {
    className: 'icon-button jumper-button',
    onclick: props.onScrollToEnd
  })

  function show() {
    node.classList.add('show')
  }

  function hide() {
    node.classList.remove('show')
  }

  return {
    node: node,
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
        $('div', {className: 'column'}, [
          $('label', {textContent: 'Subtitles Language'}),
          $('select', {
            value: state.subLang,
            onchange: onChangeSubLang
          }, renderLangOptions())
        ]),
        $('div', {className: 'column'}, [
          $('label', {textContent: 'Translation Language'}),
          $('select', {
            value: state.trLang,
            onchange: onChangeTrLang
          }, renderLangOptions())
        ])
      ]),
      $('hr')
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
    props.onAuthorize(input.value)
  }

  function onBlur() {
    props.onAuthorize(input.value)
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
    document.body.scrollTop = 0
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
          onkeyup: onKeyUp,
          onblur: onBlur
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
    show: show
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
      items.auth = $('button', {
        className: 'icon-button auth-button',
        textContent: 'Auth',
        onclick: onShow.bind(null, 'auth')
      }),
      items.stream = $('button', {
        className: 'icon-button stream-button',
        textContent: 'Subtitles',
        onclick: onShow.bind(null, 'stream')
      }),
      items.menu = $('button', {
        className: 'icon-button menu-button',
        textContent: 'Settings',
        onclick: onShow.bind(null, 'menu')
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


function createApp(props) {
  var node = $('div', {className: 'app'})
  var stream
  var auth
  var menu
  var nav
  var controller
  var jumper

  controller = createController({
    onShow: function(inst) {
      switch (inst) {
        case stream:
          return nav.select('stream')
        case menu:
          return nav.select('menu')
        case auth:
          return nav.select('auth')
      }
    }
  })

  function onSubtitle(data) {
    stream.append({text: data.original})
  }

  function onAuthorized() {
    controller.show(stream)
  }

  function requestAuthorization() {
    if (!state.auth) controller.show(auth)
    else props.onAuthorize(state.auth)
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
    stream = createStream({
      onTranslate: props.onTranslate,
      onShowJumper: function() {
        jumper.show()
      },
      onHideJumper: function() {
        jumper.hide()
      }
    })

    jumper = createJumper({
      onScrollToEnd: stream.scrollToEnd
    })

    menu = createMenu({
      languages: conf.languages,
      onChangeSubLang: function(value) {
        setState({subLang: value})
      },
      onChangeTrLang: function(value) {
        setState({trLang: value})
      }
    })
    menu.render()

    nav = createNav({
      onShow: function(name) {
        switch (name) {
          case 'menu':
            return controller.show(menu)
          case 'stream':
            return controller.show(stream)
          case 'auth':
            return controller.show(auth)
        }
      }
    })
    nav.render()

    auth = createAuth({
      value: state.auth,
      onAuthorize: function(value) {
        setState({auth: value})
        controller.show(stream)
        props.onAuthorize(value)
      }
    })
    auth.render()

    $(node, [
      stream.render({text: data.subtitle}),
      menu.node,
      auth.node,
      nav.node,
      jumper.node
    ])

    return node
  }

  return {
    node: node,
    render: render,
    onSubtitle: onSubtitle,
    onAuthorized: onAuthorized,
    requestAuthorization: requestAuthorization
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

    socket.on('disconnect', function() {
      log('Socket disconnected.')
    })

    socket.on('authorized', function(code) {
      log('Connection authorized:', code)
      props.onAuthorized()
    })

    socket.on('subtitle', function(data) {
      log('Received subtitle:', data)
      props.onSubtitle(data)
    })

    socket.on('authRequest', function() {
      log('Auth requested by server.')
      props.onRequestAuth()
    })

    return socket
  }

  function authorize(code) {
    log('Sending authorization code:', code)
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
    authorize: authorize
  }
}


function init() {
  MBP.enableActive()
  FastClick.attach(document.body)
  var app
  var api = createApi({
    onSubtitle: function(data) {
      app.onSubtitle(data)
    },
    onRequestAuth: function() {
      app.requestAuthorization()
    },
    onAuthorized: function() {
      app.onAuthorized()
    }
  })

  app = createApp({
    onTranslate: api.translate,
    onAuthorize: api.authorize
  })

  api.connect()
  // People don't expect that they receive subtitles only if they play the movie.
  app.render({subtitle: 'Play movie to receive subtitles'})

  document.body.appendChild(app.node)
}

window.addEventListener('load', init)
}())
