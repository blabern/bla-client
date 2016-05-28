(function() {
var conf = {
  baseUrl: 'http://api.lingvo.tv',
  // baseUrl: 'http://localhost:3000',
  languages: [{"f":"Afrikaans","a":"af"},{"f":"Albanian","a":"sq"},{"f":"Amharic","a":"am"},{"f":"Arabic","a":"ar"},{"f":"Armenian","a":"hy"},{"f":"Azerbaijani","a":"az"},{"f":"Basque","a":"eu"},{"f":"Belarusian","a":"be"},{"f":"Bengali","a":"bn"},{"f":"Bosnian","a":"bs"},{"f":"Bulgarian","a":"bg"},{"f":"Catalan","a":"ca"},{"f":"Cebuano","a":"ceb"},{"f":"Chichewa","a":"ny"},{"f":"Chinese (Simplified)","a":"zh-CN"},{"f":"Chinese (Traditional)","a":"zh-TW"},{"f":"Corsican","a":"co"},{"f":"Croatian","a":"hr"},{"f":"Czech","a":"cs"},{"f":"Danish","a":"da"},{"f":"Dutch","a":"nl"},{"f":"English","a":"en"},{"f":"Esperanto","a":"eo"},{"f":"Estonian","a":"et"},{"f":"Filipino","a":"tl"},{"f":"Finnish","a":"fi"},{"f":"French","a":"fr"},{"f":"Frisian","a":"fy"},{"f":"Galician","a":"gl"},{"f":"Georgian","a":"ka"},{"f":"German","a":"de"},{"f":"Greek","a":"el"},{"f":"Gujarati","a":"gu"},{"f":"Haitian Creole","a":"ht"},{"f":"Hausa","a":"ha"},{"f":"Hawaiian","a":"haw"},{"f":"Hebrew","a":"iw"},{"f":"Hindi","a":"hi"},{"f":"Hmong","a":"hmn"},{"f":"Hungarian","a":"hu"},{"f":"Icelandic","a":"is"},{"f":"Igbo","a":"ig"},{"f":"Indonesian","a":"id"},{"f":"Irish","a":"ga"},{"f":"Italian","a":"it"},{"f":"Japanese","a":"ja"},{"f":"Javanese","a":"jw"},{"f":"Kannada","a":"kn"},{"f":"Kazakh","a":"kk"},{"f":"Khmer","a":"km"},{"f":"Korean","a":"ko"},{"f":"Kurdish (Kurmanji)","a":"ku"},{"f":"Kyrgyz","a":"ky"},{"f":"Lao","a":"lo"},{"f":"Latin","a":"la"},{"f":"Latvian","a":"lv"},{"f":"Lithuanian","a":"lt"},{"f":"Luxembourgish","a":"lb"},{"f":"Macedonian","a":"mk"},{"f":"Malagasy","a":"mg"},{"f":"Malay","a":"ms"},{"f":"Malayalam","a":"ml"},{"f":"Maltese","a":"mt"},{"f":"Maori","a":"mi"},{"f":"Marathi","a":"mr"},{"f":"Mongolian","a":"mn"},{"f":"Myanmar (Burmese)","a":"my"},{"f":"Nepali","a":"ne"},{"f":"Norwegian","a":"no"},{"f":"Pashto","a":"ps"},{"f":"Persian","a":"fa"},{"f":"Polish","a":"pl"},{"f":"Portuguese","a":"pt"},{"f":"Punjabi","a":"pa"},{"f":"Romanian","a":"ro"},{"f":"Russian","a":"ru"},{"f":"Samoan","a":"sm"},{"f":"Scots Gaelic","a":"gd"},{"f":"Serbian","a":"sr"},{"f":"Sesotho","a":"st"},{"f":"Shona","a":"sn"},{"f":"Sindhi","a":"sd"},{"f":"Sinhala","a":"si"},{"f":"Slovak","a":"sk"},{"f":"Slovenian","a":"sl"},{"f":"Somali","a":"so"},{"f":"Spanish","a":"es"},{"f":"Sundanese","a":"su"},{"f":"Swahili","a":"sw"},{"f":"Swedish","a":"sv"},{"f":"Tajik","a":"tg"},{"f":"Tamil","a":"ta"},{"f":"Telugu","a":"te"},{"f":"Thai","a":"th"},{"f":"Turkish","a":"tr"},{"f":"Ukrainian","a":"uk"},{"f":"Urdu","a":"ur"},{"f":"Uzbek","a":"uz"},{"f":"Vietnamese","a":"vi"},{"f":"Welsh","a":"cy"},{"f":"Xhosa","a":"xh"},{"f":"Yiddish","a":"yi"},{"f":"Yoruba","a":"yo"},{"f":"Zulu","a":"zu"}]
}

var log = console.log.bind(console)
var error = console.error.bind(console)

/* Utils */

var hasTouch = 'ontouchstart' in window

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
      if (props[prop] === undefined) continue
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

function NumPad(props) {
  var node = div({classes: ['num-pad', props.className]})
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
  var numPad
  var length = 4

  function onInputFromNumPad(val) {
    code.value += val
    changed()
  }

  function onKeyPress() {
    setTimeout(changed)
  }

  function changed() {
    var value = code.value
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
    if (!numPad) {
      code.focus()
    }
  }

  function clear() {
    code.value = ''
    props.onChange('')
  }

  function render() {
    if (hasTouch) {
      numPad = NumPad({
        className: 'touch-keyboard',
        onInput: onInputFromNumPad
      })
    }

    $(node, [
      p({
        className: 'info',
        innerHTML: 'Click on Lingvo Extension <br />in your Browser to get the Code.'
      }),
      code = input({
        classes: ['code', 'control'],
        maxlength: length,
        readonly: numPad ? true : undefined,
        value: props.value || '',
        onkeypress: onKeyPress
      }),
      numPad && numPad.render(),
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
    if (props.onShow(name) === false) return
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
      }),
      items.feedback = button({
        className: 'icon-button feedback-button',
        textContent: 'Feedback',
        onclick: onShow.bind(null, 'feedback')
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
          case 'feedback':
            UserSnap.openReportWindow()
            return false
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
    var lang = state.subLang + '-' + state.trLang
    var url = conf.baseUrl + '/translation/' + lang + '/' + encodeURI(text)
    fetch(url)
      .then(function(res) {
        return res.text()
      })
      .then(function(text) {
        callback(JSON.parse(text))
      })
      .catch(error)

    ga('send', {
      hitType: 'event',
      eventCategory: 'translation',
      eventAction: 'translate',
      eventLabel: lang
    })
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
