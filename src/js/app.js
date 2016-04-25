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
      if (children[i]) {
        node.appendChild(children[i])
      }
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
        if (prop in node) {
          node[prop] = props[prop]
        } else {
          node.setAttribute(prop, props[prop])
        }
      }
    }
  }

  return node
}

var div = $.bind(null, 'div')
var span = $.bind(null, 'span')
var label = $.bind(null, 'label')
var form = $.bind(null, 'form')
var button = $.bind(null, 'button')
var input = $.bind(null, 'input')
var select = $.bind(null, 'select')
var option = $.bind(null, 'option')
var section = $.bind(null, 'section')
var hr = $.bind(null, 'hr')
var p = $.bind(null, 'p')
var header = $.bind(null, 'header')
var h2 = $.bind(null, 'h2')

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

function ScrollRenderController(props) {
  var node = props.node
  var threshold = 20
  var state = {}

  function check() {
    var distance = node.scrollTop - (node.scrollHeight - node.offsetHeight)
    var isAtBottom = distance > -threshold

    if (isAtBottom !== state.isAtBottom) {
      state.isAtBottom = isAtBottom
      props.onChange(state)
    }
  }

  function reset() {
    state = {}
  }

  node.addEventListener('scroll', check)

  return {
    check: check,
    reset: reset
  }
}

function Stream(props) {
  var node = div({
    className: 'screen stream hidden',
    onclick: onSelectWord
  })
  var sections
  var reconnect
  var isEmpty = true
  var autoScroll = true
  var sectionCounter = 0

  var scrollRenderController = ScrollRenderController({
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
      if (!map[key]) map[key] = Translation()
      return map[key]
    }
  }())

  function renderTranslation(section) {
    var words = getWords(section)
    var translation = getTranslation(section)

    if (!words) {
      removeNode(translation.node)
      scrollRenderController.check()
      return
    }

    props.onTranslate(words, function(data) {
      translation.render(data)
      section.appendChild(translation.node)
      setTimeout(scrollRenderController.check, 100)
    })
  }

  function getWords(section) {
    return toArray(section.querySelectorAll('.selected')).map(function(node) {
      // Remove spaces and punktuation marks.
      return node.textContent.replace(/\W/g, '')
    }).join(' ')
  }

  function renderReconnect() {
    return div({className: 'reconnect-container'}, [
      button({
        classes: ['control', 'reconnect'],
        textContent: 'Reconnect',
        onclick: props.onReconnect
      })
    ])
  }

  function renderWords(text) {
    return text.split(' ').reduce(function(words, word) {
      words.push(span({className: 'word', textContent: word}))
      words.push(span({textContent: ' '}))
      return words
    }, [])
  }

  function renderSection(text) {
    var lines = text.split('\n')
    return section({
        dataset: {key: ++sectionCounter}
      }, [
      div({className: 'subtitle'}, lines.map(function(line) {
        return p(renderWords(line))
      }))
    ])
  }

  function append(data) {
    if (isEmpty) {
      reconnect.classList.add('hidden')
      removeNode(sections.firstChild)
      isEmpty = false
    }
    sections.appendChild(renderSection(data.text))
    if (autoScroll) scrollToEnd()
  }

  function show() {
    node.classList.remove('hidden')
    scrollRenderController.check()
  }

  function hide() {
    scrollRenderController.reset()
    props.onHideJumper()
    node.classList.add('hidden')
  }

  function render(data) {
    return $(node, [
      sections = div({className: 'sections'}, [
        renderSection(data.text)
      ]),
      reconnect = renderReconnect()
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

function Jumper(props) {
  var node = button({
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

function Translation() {
  var node = div({className: 'translation'})

  function render(data) {
    $(node, [
      h2({textContent: data.original + ' - ' + data.translation.main}),
      div(data.translation.others.map(function(tr) {
        return section([
          header({textContent: tr.type}),
          p({innerHTML: tr.translations.join('<br />')})
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

function Menu(props) {
  var node = div({className: 'screen menu hidden'})

  function onChangeSubLang(e) {
    props.onChangeSubLang(e.target.value)
  }

  function onChangeTrLang(e) {
    props.onChangeTrLang(e.target.value)
  }

  function renderLangOptions() {
    return props.languages.map(function(lang) {
      return option({value: lang.a, textContent: lang.f})
    })
  }

  function show() {
    node.classList.remove('hidden')
  }

  function hide() {
    node.classList.add('hidden')
  }

  function render() {
    var id = Math.random()
    $(node, [
      section([
        div({className: 'column'}, [
          label({textContent: 'Subtitles Language', for: 'subLang' + id}),
          select({
            id: 'subLang' + id,
            className: 'control',
            value: state.subLang,
            onchange: onChangeSubLang
          }, renderLangOptions())
        ]),
        div({className: 'column'}, [
          label({textContent: 'Translation Language', for: 'trLang' + id}),
          select({
            id: 'trLang' + id,
            className: 'control',
            value: state.trLang,
            onchange: onChangeTrLang
          }, renderLangOptions())
        ])
      ]),
      hr()
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

function NumericKeyboard(props) {
  var node = div({classes: ['numeric-keyboard', props.className]})
  var layout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0]
  ]

  function renderNumbers() {
    return layout.map(function(row) {
      return div(
        {className: 'row'},
        row.map(function(num) {
          return button({
            className: 'number',
            textContent: num,
            onclick: props.onInput.bind(null, num)
          })
        })
      )
    })
  }

  function render() {
    var numbers = renderNumbers()
    $(node, numbers)
    return node
  }

  return {
    node: node,
    render: render
  }
}

function Auth(props) {
  var node = div({classes: ['screen', 'auth', 'hidden']})
  var code
  var length = 4

  function onInput(val) {
    var value = code.value += val
    props.onChange(value)
    if (value.length === length) {
      props.onAuthorize(value)
    }
  }

  function hide() {
    node.classList.add('hidden')
  }

  function show() {
    node.classList.remove('hidden')
  }

  function clear() {
    code.value = ''
    props.onChange('')
  }

  function render() {
    var keyboard = NumericKeyboard({
      className: 'keyboard',
      onInput: onInput
    })
    $(node, [
      p({
        className: 'info',
        innerHTML: 'Click on Lingvo Extension <br />in your Browser to get the Code.'
      }),
      code = input({
        classes: ['code', 'control'],
        maxlength: length,
        readonly: true,
        value: props.value || ''
      }),
      keyboard.render(),
      button({
        classes: ['text-button', 'clear'],
        textContent: 'Clear',
        onclick: clear
      })
    ])

    return node
  }

  return {
    node: node,
    render: render,
    hide: hide,
    show: show,
    clear: clear
  }
}

function Nav(props) {
  var node = div({className: 'nav'})
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
      items.auth = button({
        className: 'icon-button auth-button',
        textContent: 'Connect',
        onclick: onShow.bind(null, 'auth')
      }),
      items.stream = button({
        className: 'icon-button stream-button',
        textContent: 'Subtitles',
        onclick: onShow.bind(null, 'stream')
      }),
      items.menu = button({
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

function RenderController(props) {
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

function App(props) {
  var node = div({className: 'app'})
  var stream
  var auth
  var menu
  var nav
  var controller
  var jumper

  controller = RenderController({
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

  function render(data) {
    stream = Stream({
      onTranslate: props.onTranslate,
      onShowJumper: function() {
        jumper.show()
      },
      onHideJumper: function() {
        jumper.hide()
      },
      onReconnect: function() {
        auth.clear()
        controller.show(auth)
      }
    })

    jumper = Jumper({
      onScrollToEnd: stream.scrollToEnd
    })

    menu = Menu({
      languages: conf.languages,
      onChangeSubLang: function(value) {
        setState({subLang: value})
      },
      onChangeTrLang: function(value) {
        setState({trLang: value})
      }
    })
    menu.render()

    nav = Nav({
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

    auth = Auth({
      value: state.auth,
      onChange: function(value) {
        setState({auth: value})
      },
      onAuthorize: function(value) {
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

function Api(props) {
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
  var api = Api({
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

  app = App({
    onTranslate: api.translate,
    onAuthorize: api.authorize
  })

  api.connect()
  // People don't expect that they receive subtitles only if they play the movie.
  app.render({subtitle: 'Play movie to receive subtitles.'})

  document.body.appendChild(app.node)
}

window.addEventListener('load', init)
}())
