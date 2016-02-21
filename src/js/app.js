
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
      [].slice.call(subtitles.querySelectorAll('.selected')).forEach(function(node) {
        node.classList.remove('selected')
      })
      node.classList.add('selected')
    }

    subtitles.addEventListener('click', function(e) {
      select(e.target)
      var word = e.target.textContent
      // Remove spaces and punktuation marks.
      word = word.replace(/\W/g, '')
      socket.emit('translate', word)
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
  var autoFollow = true
  var history = []


  var nav = (function() {
    var nav = document.createElement('div')
    nav.className = 'nav'
    app.appendChild(nav)
    var prev = document.createElement('button')
    prev.textContent = 'Prev'
    nav.appendChild(prev)

    var follow = document.createElement('button')
    follow.className = 'follow'
    follow.textContent = 'A'
    nav.appendChild(follow)
    follow.addEventListener('click', function() {
      autoFollow = true
      cursor = history.length - 1
      renderSubtitle(history[cursor])
    })

    var next = document.createElement('button')
    next.textContent = 'Next'
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
        autoFollow = false
        renderSubtitle(history[cursor])
      })
    })
  }())

  function onSubtitle(data) {
    history.push(data)
    if (autoFollow) {
      cursor = history.length - 1
      renderSubtitle(data)
    }
  }

  function renderSubtitle(data) {
    function wrapInSpans(text) {
      return text.split(' ').map(function(word) {
        return '<span>' + word + ' </span>'
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
  var socket = io.connect('https://movielangserver.localtunnel.me', {
    transports: ['polling']
  })

  socket.on('connected', function() {
    console.log('Connected.')
  })

  socket.on('subtitle', view.onSubtitle)

  socket.on('translation', view.renderTranslation)

  return socket
}())



