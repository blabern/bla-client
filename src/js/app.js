(function() {
var conf = {
  baseUrl: 'http://api.lingvo.tv',
  // baseUrl: 'http://localhost:3000',
  languages: [{"f": "Detect language", "a": "auto"},{"f":"Afrikaans","a":"af"},{"f":"Albanian","a":"sq"},{"f":"Amharic","a":"am"},{"f":"Arabic","a":"ar"},{"f":"Armenian","a":"hy"},{"f":"Azerbaijani","a":"az"},{"f":"Basque","a":"eu"},{"f":"Belarusian","a":"be"},{"f":"Bengali","a":"bn"},{"f":"Bosnian","a":"bs"},{"f":"Bulgarian","a":"bg"},{"f":"Catalan","a":"ca"},{"f":"Cebuano","a":"ceb"},{"f":"Chichewa","a":"ny"},{"f":"Chinese (Simplified)","a":"zh-CN"},{"f":"Chinese (Traditional)","a":"zh-TW"},{"f":"Corsican","a":"co"},{"f":"Croatian","a":"hr"},{"f":"Czech","a":"cs"},{"f":"Danish","a":"da"},{"f":"Dutch","a":"nl"},{"f":"English","a":"en"},{"f":"Esperanto","a":"eo"},{"f":"Estonian","a":"et"},{"f":"Filipino","a":"tl"},{"f":"Finnish","a":"fi"},{"f":"French","a":"fr"},{"f":"Frisian","a":"fy"},{"f":"Galician","a":"gl"},{"f":"Georgian","a":"ka"},{"f":"German","a":"de"},{"f":"Greek","a":"el"},{"f":"Gujarati","a":"gu"},{"f":"Haitian Creole","a":"ht"},{"f":"Hausa","a":"ha"},{"f":"Hawaiian","a":"haw"},{"f":"Hebrew","a":"iw"},{"f":"Hindi","a":"hi"},{"f":"Hmong","a":"hmn"},{"f":"Hungarian","a":"hu"},{"f":"Icelandic","a":"is"},{"f":"Igbo","a":"ig"},{"f":"Indonesian","a":"id"},{"f":"Irish","a":"ga"},{"f":"Italian","a":"it"},{"f":"Japanese","a":"ja"},{"f":"Javanese","a":"jw"},{"f":"Kannada","a":"kn"},{"f":"Kazakh","a":"kk"},{"f":"Khmer","a":"km"},{"f":"Korean","a":"ko"},{"f":"Kurdish (Kurmanji)","a":"ku"},{"f":"Kyrgyz","a":"ky"},{"f":"Lao","a":"lo"},{"f":"Latin","a":"la"},{"f":"Latvian","a":"lv"},{"f":"Lithuanian","a":"lt"},{"f":"Luxembourgish","a":"lb"},{"f":"Macedonian","a":"mk"},{"f":"Malagasy","a":"mg"},{"f":"Malay","a":"ms"},{"f":"Malayalam","a":"ml"},{"f":"Maltese","a":"mt"},{"f":"Maori","a":"mi"},{"f":"Marathi","a":"mr"},{"f":"Mongolian","a":"mn"},{"f":"Myanmar (Burmese)","a":"my"},{"f":"Nepali","a":"ne"},{"f":"Norwegian","a":"no"},{"f":"Pashto","a":"ps"},{"f":"Persian","a":"fa"},{"f":"Polish","a":"pl"},{"f":"Portuguese","a":"pt"},{"f":"Punjabi","a":"pa"},{"f":"Romanian","a":"ro"},{"f":"Russian","a":"ru"},{"f":"Samoan","a":"sm"},{"f":"Scots Gaelic","a":"gd"},{"f":"Serbian","a":"sr"},{"f":"Sesotho","a":"st"},{"f":"Shona","a":"sn"},{"f":"Sindhi","a":"sd"},{"f":"Sinhala","a":"si"},{"f":"Slovak","a":"sk"},{"f":"Slovenian","a":"sl"},{"f":"Somali","a":"so"},{"f":"Spanish","a":"es"},{"f":"Sundanese","a":"su"},{"f":"Swahili","a":"sw"},{"f":"Swedish","a":"sv"},{"f":"Tajik","a":"tg"},{"f":"Tamil","a":"ta"},{"f":"Telugu","a":"te"},{"f":"Thai","a":"th"},{"f":"Turkish","a":"tr"},{"f":"Ukrainian","a":"uk"},{"f":"Urdu","a":"ur"},{"f":"Uzbek","a":"uz"},{"f":"Vietnamese","a":"vi"},{"f":"Welsh","a":"cy"},{"f":"Xhosa","a":"xh"},{"f":"Yiddish","a":"yi"},{"f":"Yoruba","a":"yo"},{"f":"Zulu","a":"zu"}]
}

var log = console.log.bind(console)
var error = console.error.bind(console)

/* Utils */

var hasTouch = 'ontouchstart' in window

function assign(a, b) {
  for (var key in b) {
    if (b[key] !== undefined) a[key] = b[key]
  }
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
var h1 = $.bind(null, 'h1')
var h2 = $.bind(null, 'h2')
var a = $.bind(null, 'a')
var ul = $.bind(null, 'ul')
var li = $.bind(null, 'li')
var nav = $.bind(null, 'nav')

/* App */

var state = assign({
  subLang: 'auto',
  trLang: 'en',
  auth: undefined,
  shareReminderCounter: 0,
  history: []
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

function feedback() {
  location.href = 'mailto:lingvotvapp@gmail.com?subject=Feedback'
}

function ScrollRenderController(props) {
  var node = props.node
  var threshold = 20
  var state = {}
  var timerId

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

  node.addEventListener('scroll', function() {
    clearTimeout(timerId)
    timerId = setTimeout(check, 50)
  })

  return {
    check: check,
    reset: reset
  }
}

function Dialog(options) {
  var node = div({classes: ['dialog', 'hidden']})

  function render() {
    $(node, [div({className: 'window'}, [options.content])])
    return node
  }

  function show() {
    node.classList.remove('hidden')
    return this
  }

  function hide() {
    node.classList.add('hidden')
    return this
  }

  return {
    node: node,
    render: render,
    show: show,
    hide: hide
  }
}

function Stream(props) {
  var node = div({className: 'screen stream hidden'})
  var sectionNodes
  var sections = []
  var reconnect
  var isEmpty = true
  var autoScroll = true
  var stream = []

  var scrollRenderController = ScrollRenderController({
    node: node,
    onChange: onScrollChange
  })

  function onScrollChange(state) {
    autoScroll = state.isAtBottom
    if (state.isAtBottom) props.onHideJumper()
    else props.onShowJumper()
  }

  function scrollToEnd() {
    node.scrollTop = node.scrollHeight
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

  function renderSection(text) {
    var section = SubtitleSection({})
    section.setProps({
      text: text,
      isPrimary: true,
      onTranslate: function(params, callback) {
        props.onTranslate(params, function(data) {
          callback(data)
          setTimeout(scrollRenderController.check, 100)
        })
      }
    })
    sections.push(section)
    return section.render()
  }

  function append(data) {
    if (isEmpty) {
      reconnect.classList.add('hidden')
      removeNode(sectionNodes.firstChild)
      isEmpty = false
    }
    stream.push(data)
    sections[sections.length - 1].setProps({isPrimary: false}).render()
    sectionNodes.appendChild(renderSection(data.text))
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
    stream.push(data)

    return $(node, [
      sectionNodes = div({className: 'sections'}, [
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

function SubtitleSection(props) {
  props.theme || (props.theme = {classes: {}})
  var api
  var node = section()
  var translation = Translation({})
  var subtitle = Subtitle({})

  function onSelectWords(param) {
    if (!param.words.length) {
      return setProps({
        selected: [],
        translation: null
      }).render()
    }

    props.onTranslate({words: param.words, subtitle: props.text}, function(translation) {
      setProps({translation: translation, selected: param.words}).render()
    })
  }

  function setProps(nextProps) {
    assign(props, nextProps)
    if (props.translation) {
      translation.setProps(props.translation)
    }
    subtitle.setProps({
      text: props.text,
      selected: props.selected,
      marked: props.marked,
      isPrimary: props.isPrimary,
      isSelectable: props.isSelectable,
      className: props.theme.classes.subtitle,
      onSelectWords: onSelectWords
    })
    return api
  }

  function render() {
    return $(node, {classes: ['subtitle-section', props.className]}, [
      subtitle.render(),
      props.translation ? translation.render() : undefined
    ])
  }

  return api = {
    node: node,
    render: render,
    setProps: setProps
  }
}

function Subtitle(props) {
  props.selected || (props.selected = [])
  props.marked || (props.marked = [])
  props.isSelectable !== undefined || (props.isSelectable = true)

  var api
  var node = div({
    onclick: onClickWord
  })

  function onClickWord(e) {
    var word = e.target
    if (!props.isSelectable || !word.classList.contains('word')) return
    word.classList.toggle('is-selected')
    props.onSelectWords({node: node, words: getSelectedWords()})
  }

  function clearWord(str) {
    return str.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
  }

  function splitText(text) {
    return text.split(/\s/).map(function(word) {
      return clearWord(word)
    })
  }

  function getSelectedWords() {
    var wordNodes = toArray(node.querySelectorAll('.word'))

    return wordNodes.reduce(function(selectedWords, node, pos) {
      if (node.classList.contains('is-selected')) {
        selectedWords.push({
          pos: pos,
          text: clearWord(node.textContent)
        })
      }
      return selectedWords
    }, [])
  }

  function hasWord(text, selectedWords, pos) {
    if (!text) return false
    var word = selectedWords.filter(function(word) {
      return word.text === text && word.pos === pos
    })[0]
    return Boolean(word)
  }

  function renderSubtitle(text) {
    var pos = 0

    function renderLine(line) {
      return line.split(' ').reduce(function(elements, word) {
        var cleanWord = clearWord(word)
        var isSelected = hasWord(cleanWord, props.selected, pos)
        var isMarked = hasWord(cleanWord, props.marked, pos)

        elements.push(span({
          classes: [
            'word',
            isSelected ? 'is-selected' : '',
            isMarked ? 'is-marked' : '',
            props.isSelectable ? 'is-selectable' : ''
          ],
          textContent: word
        }))
        elements.push(span({textContent: ' '}))
        pos++
        return elements
      }, [])
    }

    return text.split('\n').map(function(line) {
      return p(renderLine(line))
    })
  }

  function setProps(nextProps) {
    assign(props, nextProps)
    return api
  }

  function render() {
    if (!props.text) return node

    var classes = [
      'subtitle',
      props.isPrimary ? 'is-primary' : '',
      props.className
    ]
    return $(node, {classes: classes}, renderSubtitle(props.text))
  }

  return api = {
    render: render,
    setProps: setProps
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

function Translation(props) {
  var api
  var node = div({className: 'translation'})

  function setProps(nextProps) {
    assign(props, nextProps)
    return api
  }

  function render() {
    if (!props.translation) return node

    $(node, [
      h2({textContent: props.original + ' - ' + props.translation.main}),
      div(props.translation.others.map(function(tr) {
        return section([
          div({textContent: tr.type}),
          p({innerHTML: tr.translations.join('<br />')})
        ])
      })),
      div(props.translation.thesaurus.map(function(tr) {
        return section([
          div({textContent: tr.type}),
          p(tr.translations.map(function(tr) {
            return p({textContent: tr})
          }))
        ])
      }))
    ])

    return node
  }

  return api = {
    node: node,
    render: render,
    setProps: setProps
  }
}

function History(props) {
  var node = div({className: 'screen history hidden'})
  var lastHistoryLength = state.history.length
  var api
  var selectedMap = {}

  function onSelect(id, e) {
    e.preventDefault()
    e.stopPropagation()
    selectedMap[id] = !selectedMap[id]
    render()
    props.onSelect({selected: getSelected()})
  }

  function getSelected() {
    return Object.keys(selectedMap).filter(function(id) {
      return selectedMap[id]
    })
  }

  function isSameDay(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getYear() === date2.getYear()
  }

  function add(params) {
    var entry = state.history.filter(function(entry) {
      return entry.subtitle === params.subtitle
    })[0]

    if (entry) {
      // Add new lookups to the entry.
      entry.words = params.words
    } else {
      state.history.push({
        time: Date.now(),
        subtitle: params.subtitle,
        words: params.words
      })
    }

    setState(state)
    render()
    return api
  }

  function deleteSelected() {
    state.history = state.history.filter(function(entry, id) {
      return !selectedMap[id]
    })
    selectedMap = {}
    render()
    setState(state)
  }

  function show() {
    if (state.history.length !== lastHistoryLength) {
      lastHistoryLength = state.history.length
      render()
    }
    node.classList.remove('hidden')
    props.onShow()
    return api
  }

  function hide() {
    node.classList.add('hidden')
    props.onHide()
    return api
  }

  function renderSeparator(date) {
    var dateStr = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    return div({className: 'date-separator'}, [
      span({textContent: dateStr})
    ])
  }

  function renderSection(entry, id) {
    var section = SubtitleSection({}).setProps({
      text: entry.subtitle,
      marked: entry.words,
      isPrimary: true,
      isSelectable: !props.isInEditMode,
      className: 'history-section',
      onTranslate: props.onTranslate,
      theme: {
        classes: {
          subtitle: 'history-subtitle'
        }
      }
    }).render()

    if (props.isInEditMode) {
      return div({className: 'edit-mode-container', onclick: onSelect.bind(null, id)}, [
        input({
          type: 'checkbox',
          onclick: onSelect.bind(null, id),
          checked: selectedMap[id]
        }),
        section
      ])
    }

    return section
  }

  function render() {
    var content

    if (state.history.length) {
      content = state.history.reduce(function(rows, entry, i, entries) {
        var prevEntry = entries[i - 1]
        var currDate = new Date(entry.time)
        if (!prevEntry || !isSameDay(new Date(prevEntry.time), currDate)) {
          rows.push(renderSeparator(currDate))
        }
        rows.push(renderSection(entry, i))
        return rows
      }, [])
    } else {
      content = [
        div({className: 'empty'}, [
          h1({textContent: 'Nothing found.'}),
          p({textContent: 'Click on subtitles to translate.'})
        ])
      ]
    }

    return $(node, content)
  }

  function setProps(nextProps) {
    assign(props, nextProps)
    return api
  }

  return api = {
    node: node,
    render: render,
    show: show,
    hide: hide,
    add: add,
    setProps: setProps,
    deleteSelected: deleteSelected
  }
}

function HistoryHeader(props) {
  var nav = Nav({className: 'history-header', top: true})
  var node = nav.node
  var api

  function setProps(nextProps) {
    assign(props, nextProps)
    return api
  }

  function renderButtons() {
    if (!props.canEdit) return

    return [
      button({
        textContent: 'Edit',
        classes: ['text-button', props.isEditing ? 'hidden' : ''],
        onclick: props.onEdit
      }),
      button({
        textContent: 'Done',
        classes: ['text-button', props.isEditing ? '' : 'hidden', 'cta'],
        onclick: props.onDone
      })
    ]
  }

  function render() {
    return $(node, [
      div({className: 'placeholder'}),
      div({textContent: 'History', classes: ['title']}),
      div({className: 'button-container'}, renderButtons())
    ])

    return api
  }

  return api = {
    node: node,
    render: render,
    setProps: setProps,
    show: nav.show,
    hide: nav.hide
  }
}

function HistoryFooter(props) {
  var nav = Nav({className: 'history-footer'})
  var node = nav.node
  var api

  function render() { 
    return $(node, [
      button({
        textContent: 'Delete',
        className: 'text-button',
        disabled: !props.buttonsEnabled,
        onclick: props.onDelete
      })
    ])
  }

  function setProps(nextProps) {
    assign(props, nextProps)
    return api
  }

  return api = {
    node: node,
    render: render,
    show: nav.show,
    hide: nav.hide,
    setProps: setProps
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

function AuthHelp() {
  var dialog

  function onHide() {
    dialog.hide()
  }

  var content = div({className: 'auth-help'}, [
    h2({textContent: 'Please make sure:'}),
    li({textContent: 'Both devices, desktop and phone have internet access.'}),
    li({textContent: 'Chrome Extension on your desktop browser is installed.'}),
    li({textContent: 'Verification code from extension is correct.'}),
    li({textContent: 'Movie is playing and subtitles are on the screen.'}),
    div({classes: ['actions-bar']}, [
      button({
        classes: ['control', 'done'],
        textContent: 'Ok',
        onclick: onHide
      })
    ])
  ])

  dialog = new Dialog({content: content})

  return dialog
}

function Auth(props) {
  var node = div({classes: ['screen', 'auth', 'hidden', hasTouch ? '' : 'has-keyboard']})
  var code
  var numPad
  var length = 4
  var help

  function onInputFromNumPad(val) {
    code.value += val
    changed()
  }

  function onKeyPress() {
    setTimeout(changed)
  }

  function onHelp() {
    help.show()
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
    help = new AuthHelp()

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
        classes: ['text-button', 'help'],
        textContent: 'Help',
        onclick: onHelp
      }),
      button({
        classes: ['text-button', 'clear'],
        textContent: 'Clear',
        onclick: clear
      }),
      help.render()
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

function MainNav(props) {
  var nav = Nav({className: 'main-nav'}).show()
  var node = nav.node
  var items = {}
  var selected

  function onSelect(name) {
    if (selected === items[name]) return
    if (props.onSelect(name) === false) return
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
        onclick: onSelect.bind(null, 'auth')
      }),
      items.stream = button({
        className: 'icon-button stream-button',
        textContent: 'Subtitles',
        onclick: onSelect.bind(null, 'stream')
      }),
      items.history = button({
        className: 'icon-button history-button',
        textContent: 'History',
        onclick: onSelect.bind(null, 'history')
      }),
      items.menu = button({
        className: 'icon-button settings-button',
        textContent: 'Settings',
        onclick: onSelect.bind(null, 'menu')
      }),
      items.feedback = button({
        className: 'icon-button feedback-button',
        textContent: 'Feedback',
        onclick: onSelect.bind(null, 'feedback')
      })
    ])
    return node
  }

  return {
    node: node,
    render: render,
    select: select,
    unselect: unselect,
    show: nav.show,
    hide: nav.hide
  }
}

function Nav(props) {
  var node = nav({classes: [props.top ? 'top' : 'bottom', 'hidden', props.className]})
  var api

  function show() {
    node.classList.remove('hidden')
    return api
  }

  function hide() {
    node.classList.add('hidden')
    return api
  }

  return api = {
    node: node,
    show: show,
    hide: hide,
    api: api
  }
}


function ShareReminder() {
  var node = div({className: 'share-reminder'})
  var maxReminds = 3
  var wait = 3 * 60 * 1000
  var minDelayAfterSubtitle = 3 * 1000
  var lastSubtitleTime = Date.now()
  var dialog
  var shareOptions = {
    url: 'http://lingvo.tv'
  }

  function close() {
    dialog.hide()
  }

  function renderShare() {
    var content = div({className: 'social-share'}, [
      h2({textContent: 'Support Lingvo TV by sharing it with friends!'}),
      div({
        className: 'ssk-block',
        dataset: {text: 'Learn languages while watching movies on Netflix and co.'}
      }, [
        a({href: '', className: 'ssk ssk-text ssk-facebook', textContent: 'Share on Facebook'}),
        a({href: '', className: 'ssk ssk-text ssk-twitter', textContent: 'Share on Twitter'}),
        a({href: '', className: 'ssk ssk-text ssk-vk', textContent: 'Share on VK'})
      ]),
      div({classes: ['actions-bar']}, [
        button({
          classes: ['control', 'done'],
          textContent: 'Done',
          onclick: close
        })
      ])
    ])
    dialog = new Dialog({content: content})
    $(node, [dialog.render()])
    SocialShareKit.init(shareOptions)
    dialog.show()
  }

  function onYes() {
    dialog.hide()
    renderShare()
  }

  function onNo() {
    dialog.hide()
    feedback()
  }

  function onSubtitle() {
    lastSubtitleTime = Date.now()
  }

  function renderQuestion() {
    var content = div({className: 'like-question'}, [
      h2({textContent: 'Do you like Lingvo TV?'}),
      div({classes: ['actions-bar']}, [
        button({
          classes: ['control', 'no'],
          textContent: 'No',
          onclick: onNo
        }),
        button({
          classes: ['control', 'yes'],
          textContent: 'Yes',
          onclick: onYes
        })
      ])
    ])
    dialog = new Dialog({content: content})
    $(node, [dialog.render()])
    dialog.show()
  }

  function start() {
    if (state.shareReminderCounter >= maxReminds) return

    if (Date.now() - lastSubtitleTime < minDelayAfterSubtitle) {
      return setTimeout(start, 5000)
    }

    setState({shareReminderCounter: ++state.shareReminderCounter})
    renderQuestion()
  }

  setTimeout(start, wait)

  return {
    node: node,
    onSubtitle: onSubtitle
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
  var history
  var historyHeader
  var historyFooter
  var auth
  var menu
  var nav
  var controller
  var jumper
  var shareReminder

  controller = RenderController({
    onShow: function(inst) {
      switch (inst) {
        case stream:
          return nav.select('stream')
        case menu:
          return nav.select('menu')
        case auth:
          return nav.select('auth')
        case history:
          return nav.select('history')
      }
    }
  })

  function onSubtitle(data) {
    stream.append({text: data.original})
    shareReminder.onSubtitle(data)
  }

  function onAuthorized() {
    controller.show(stream)
  }

  function onTranslate(words, callback) {
    words = words.map(function(word) {
      return word.text
    }).join(' ')
    props.onTranslate(words, callback)
  }

  function requestAuthorization() {
    if (!state.auth) controller.show(auth)
    else props.onAuthorize(state.auth)
  }

  function render(data) {
    nav = MainNav({
      onSelect: function(name) {
        switch (name) {
          case 'auth':
            return controller.show(auth)
          case 'stream':
            return controller.show(stream)
          case 'history':
            return controller.show(history)
          case 'menu':
            return controller.show(menu)
          case 'feedback':
            feedback()
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

    stream = Stream({
      onTranslate: function(params, callback) {
        onTranslate(params.words, callback)
        history.add(params)
        historyHeader.setProps({canEdit: true}).render()
      },
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
    stream.render({text: data.subtitle})

    jumper = Jumper({
      onScrollToEnd: stream.scrollToEnd
    })

    history = History({
      onTranslate: function(params, callback) {
        onTranslate(params.words, callback)
      },
      onShow: function() {
        historyHeader.show()
      },
      onHide: function() {
        historyHeader.hide()
      },
      onSelect: function(params) {
        historyFooter
          .setProps({buttonsEnabled: params.selected.length > 0})
          .render()
      }
    })
    history.render()

    historyHeader = HistoryHeader({
      canEdit: state.history.length > 0,
      onEdit: function() {
        history.setProps({isInEditMode: true}).render()
        historyHeader.setProps({isEditing: true}).render()
        historyFooter.show()
        nav.hide()
      },
      onDone: onDoneHistoryEdit
    })
    historyHeader.render()

    historyFooter = HistoryFooter({
      onDelete: function() {
        history.deleteSelected()
        if (!state.history.length) onDoneHistoryEdit()
      }
    })
    historyFooter.render()
    function onDoneHistoryEdit() {
      history.setProps({isInEditMode: false}).render()
      historyHeader.setProps({
        isEditing: false,
        canEdit: state.history.length > 0
      }).render()
      historyFooter.hide()
      nav.show()
    }


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

    shareReminder = new ShareReminder()

    $(node, [
      nav.node,
      auth.node,
      stream.node,
      history.node,
      historyHeader.node,
      historyFooter.node,
      jumper.node,
      menu.node,
      shareReminder.node
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
        try {
          callback(JSON.parse(text))
        } catch (err) {
          error(err)
        }
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
