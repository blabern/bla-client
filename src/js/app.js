(function() {

var socketUrl = 'https://bla-server.herokuapp.com/'

function toArray(obj) {
  return [].slice.call(obj)
}

var view = (function(){
  (function init() {
    MBP.hideUrlBarOnLoad()
    MBP.listenForGhostClicks()
    FastClick.attach(document.body)
  }())

  var app = document.createElement('div')
  app.className = 'app'
  document.body.appendChild(app)

  var subtitles = (function() {
    var subtitles = document.createElement('div')
    subtitles.className = 'subtitles'
    subtitles.innerHTML = 'Waiting for subtitles'
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
      socket.emit('translate', getWords(node))
    })
    return subtitles
  }())

  var translation = (function() {
    var translation = document.createElement('div')
    translation.className = 'translation'
    app.appendChild(translation)
    return translation
  }())

  var cursor = -1
  var history = []

  var nav = (function() {
    var autoSync

    var nav = document.createElement('div')
    nav.className = 'nav'
    app.appendChild(nav)
    var prev = document.createElement('button')
    prev.className = 'prev'
    nav.appendChild(prev)

    var follow = document.createElement('button')
    follow.className = 'sync'
    nav.appendChild(follow)
    setAutoSync(true)

    follow.addEventListener('click', function() {
      document.body.scrollTop = 0
      setAutoSync(true)
      cursor = history.length - 1
      renderSubtitle(history[cursor])
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

        renderSubtitle(history[cursor])
      })
    })

    function setAutoSync(value) {
      autoSync = value
      if (value) follow.classList.add('selected')
      else follow.classList.remove('selected')
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
      renderSubtitle(data)
    }
  }

  function renderSubtitle(data) {
    function wrapInSpans(text) {
      return text.split(' ').map(function(word) {
        return '<span class="word">' + word + '</span> '
      }).join('')
    }

    var html = data.original.split('\n').map(function(p) {
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
    renderTranslation: renderTranslation
  }
}())

var socket = (function connect() {
  var socket = io.connect(socketUrl, {
    transports: ['polling']
  })

  socket.on('connected', function() {
    console.log('Connected.')
  })

  socket.on('subtitle', view.onSubtitle)

  socket.on('translation', view.renderTranslation)

  return socket
}())

}())
