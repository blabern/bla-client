(function() {

var baseUrl = 'http://api.lingvo.tv'
//var baseUrl = 'http://localhost:3000'

function toArray(obj) {
  return [].slice.call(obj)
}

function createView() {
  var cursor = -1
  var history = []

  var app = document.createElement('div')
  app.className = 'app'
  document.body.appendChild(app)

  var subtitles = (function() {
    var subtitles = document.createElement('div')
    subtitles.className = 'subtitles'
    app.appendChild(subtitles)

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

    subtitles.addEventListener('click', function(e) {
      var node = e.target
      if (!select(node)) return
      var words = getWords(node)
      if (words) translate(words, renderTranslation)
    })
    return subtitles
  }())

  var translation = (function() {
    var translation = document.createElement('div')
    translation.className = 'translation'
    app.appendChild(translation)
    return translation
  }())

  var nav = (function() {
    var autoSync

    var nav = document.createElement('div')
    nav.className = 'nav'
    app.appendChild(nav)
    var prev = document.createElement('button')
    prev.className = 'prev'
    nav.appendChild(prev)

    var sync = document.createElement('button')
    sync.className = 'sync'
    nav.appendChild(sync)
    setAutoSync(true)

    sync.addEventListener('click', function() {
      document.body.scrollTop = 0
      setAutoSync(true)
      cursor = history.length - 1
      if (history[cursor]) renderSubtitle(history[cursor].original)
    })

    var next = document.createElement('button')
    next.className = 'next'
    nav.appendChild(next)

    ;[prev, next].forEach(function(button) {
      button.addEventListener('click', function(e) {
        if (e.target === prev) {
          cursor--
          if (cursor < 0) cursor = 0
        } else {
          cursor++
          if (!history[cursor]) cursor = history.length - 1
        }
        setAutoSync(false)

        if (history[cursor]) renderSubtitle(history[cursor].original)
      })
    })

    function setAutoSync(value) {
      autoSync = value
      if (value) sync.classList.add('selected')
      else sync.classList.remove('selected')
    }

    function getAutoSync() {
      return autoSync
    }

    return {
      setAutoSync: setAutoSync,
      getAutoSync: getAutoSync
    }
  }())

  function onSubtitle(data) {
    history.push(data)
    if (nav.getAutoSync()) {
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
  var socket = io.connect(baseUrl, {
    transports: ['polling']
  })

  socket.on('connected', function() {
    console.log('Connected.')
  })

  socket.on('subtitle', view.onSubtitle)

  return socket
}

function translate(text, callback) {
  var url = baseUrl + '/translation/' + encodeURI(text)
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
  view.renderSubtitle('Waiting for subtitles')
  connect(view)
}())
}())
