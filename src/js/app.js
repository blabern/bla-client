(function () {
  var isLocalEnv = location.hostname === "localhost";
  var config = {
    baseApiUrl: isLocalEnv ? "http://localhost:3000" : "https://api.lingvo.tv",
    baseUrl: isLocalEnv ? "http://localhost:8081" : "https://lingvo.tv",
    languages: [
      { f: "Detect language", a: "auto" },
      { f: "Afrikaans", a: "af" },
      { f: "Albanian", a: "sq" },
      { f: "Amharic", a: "am" },
      { f: "Arabic", a: "ar" },
      { f: "Armenian", a: "hy" },
      { f: "Azerbaijani", a: "az" },
      { f: "Basque", a: "eu" },
      { f: "Belarusian", a: "be" },
      { f: "Bengali", a: "bn" },
      { f: "Bosnian", a: "bs" },
      { f: "Bulgarian", a: "bg" },
      { f: "Catalan", a: "ca" },
      { f: "Cebuano", a: "ceb" },
      { f: "Chichewa", a: "ny" },
      { f: "Chinese (Simplified)", a: "zh-CN" },
      { f: "Chinese (Traditional)", a: "zh-TW" },
      { f: "Corsican", a: "co" },
      { f: "Croatian", a: "hr" },
      { f: "Czech", a: "cs" },
      { f: "Danish", a: "da" },
      { f: "Dutch", a: "nl" },
      { f: "English", a: "en" },
      { f: "Esperanto", a: "eo" },
      { f: "Estonian", a: "et" },
      { f: "Filipino", a: "tl" },
      { f: "Finnish", a: "fi" },
      { f: "French", a: "fr" },
      { f: "Frisian", a: "fy" },
      { f: "Galician", a: "gl" },
      { f: "Georgian", a: "ka" },
      { f: "German", a: "de" },
      { f: "Greek", a: "el" },
      { f: "Gujarati", a: "gu" },
      { f: "Haitian Creole", a: "ht" },
      { f: "Hausa", a: "ha" },
      { f: "Hawaiian", a: "haw" },
      { f: "Hebrew", a: "iw" },
      { f: "Hindi", a: "hi" },
      { f: "Hmong", a: "hmn" },
      { f: "Hungarian", a: "hu" },
      { f: "Icelandic", a: "is" },
      { f: "Igbo", a: "ig" },
      { f: "Indonesian", a: "id" },
      { f: "Irish", a: "ga" },
      { f: "Italian", a: "it" },
      { f: "Japanese", a: "ja" },
      { f: "Javanese", a: "jw" },
      { f: "Kannada", a: "kn" },
      { f: "Kazakh", a: "kk" },
      { f: "Khmer", a: "km" },
      { f: "Korean", a: "ko" },
      { f: "Kurdish (Kurmanji)", a: "ku" },
      { f: "Kyrgyz", a: "ky" },
      { f: "Lao", a: "lo" },
      { f: "Latin", a: "la" },
      { f: "Latvian", a: "lv" },
      { f: "Lithuanian", a: "lt" },
      { f: "Luxembourgish", a: "lb" },
      { f: "Macedonian", a: "mk" },
      { f: "Malagasy", a: "mg" },
      { f: "Malay", a: "ms" },
      { f: "Malayalam", a: "ml" },
      { f: "Maltese", a: "mt" },
      { f: "Maori", a: "mi" },
      { f: "Marathi", a: "mr" },
      { f: "Mongolian", a: "mn" },
      { f: "Myanmar (Burmese)", a: "my" },
      { f: "Nepali", a: "ne" },
      { f: "Norwegian", a: "no" },
      { f: "Pashto", a: "ps" },
      { f: "Persian", a: "fa" },
      { f: "Polish", a: "pl" },
      { f: "Portuguese", a: "pt" },
      { f: "Punjabi", a: "pa" },
      { f: "Romanian", a: "ro" },
      { f: "Russian", a: "ru" },
      { f: "Samoan", a: "sm" },
      { f: "Scots Gaelic", a: "gd" },
      { f: "Serbian", a: "sr" },
      { f: "Sesotho", a: "st" },
      { f: "Shona", a: "sn" },
      { f: "Sindhi", a: "sd" },
      { f: "Sinhala", a: "si" },
      { f: "Slovak", a: "sk" },
      { f: "Slovenian", a: "sl" },
      { f: "Somali", a: "so" },
      { f: "Spanish", a: "es" },
      { f: "Sundanese", a: "su" },
      { f: "Swahili", a: "sw" },
      { f: "Swedish", a: "sv" },
      { f: "Tajik", a: "tg" },
      { f: "Tamil", a: "ta" },
      { f: "Telugu", a: "te" },
      { f: "Thai", a: "th" },
      { f: "Turkish", a: "tr" },
      { f: "Ukrainian", a: "uk" },
      { f: "Urdu", a: "ur" },
      { f: "Uzbek", a: "uz" },
      { f: "Vietnamese", a: "vi" },
      { f: "Welsh", a: "cy" },
      { f: "Xhosa", a: "xh" },
      { f: "Yiddish", a: "yi" },
      { f: "Yoruba", a: "yo" },
      { f: "Zulu", a: "zu" },
    ],
  };

  var log = console.log.bind(console);
  var error = console.error.bind(console);

  /* Utils */

  var hasTouch = "ontouchstart" in window;

  function assign(a, b) {
    for (var key in b) {
      if (b[key] !== undefined) a[key] = b[key];
    }
    return a;
  }

  function toArray(obj) {
    return [].slice.call(obj);
  }

  function removeNode(node) {
    if (!node || !node.parentNode) return false;
    node.parentNode.removeChild(node);
    return true;
  }

  function $(nameOrNode, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = null;
    }

    var node =
      typeof nameOrNode === "string"
        ? document.createElement(nameOrNode)
        : nameOrNode;

    if (children) {
      node.innerHTML = "";
      for (var i = 0; i < children.length; i++) {
        if (children[i]) {
          node.appendChild(children[i]);
        }
      }
    }

    if (props) {
      for (var prop in props) {
        if (props[prop] === undefined) continue;
        if (prop === "classes") {
          node.className = props[prop].join(" ");
        } else if (prop === "dataset") {
          for (var key in props[prop]) {
            node.dataset[key] = props[prop][key];
          }
          // Its a function call.
        } else if (typeof node[prop] === "function") {
          node[prop].apply(node, props[prop]);
        } else {
          if (prop in node) {
            node[prop] = props[prop];
          } else {
            node.setAttribute(prop, props[prop]);
          }
        }
      }
    }

    return node;
  }

  var div = $.bind(null, "div");
  var span = $.bind(null, "span");
  var label = $.bind(null, "label");
  var form = $.bind(null, "form");
  var button = $.bind(null, "button");
  var input = $.bind(null, "input");
  var select = $.bind(null, "select");
  var option = $.bind(null, "option");
  var section = $.bind(null, "section");
  var hr = $.bind(null, "hr");
  var p = $.bind(null, "p");
  var header = $.bind(null, "header");
  var h1 = $.bind(null, "h1");
  var h2 = $.bind(null, "h2");
  var h3 = $.bind(null, "h3");
  var a = $.bind(null, "a");
  var ul = $.bind(null, "ul");
  var li = $.bind(null, "li");
  var nav = $.bind(null, "nav");
  var b = $.bind(null, "b");
  var br = $.bind(null, "br");
  var script = $.bind(null, "script");

  function request(options) {
    // TODO need to figure out what to do with cases
    // where there will be error from the api
    //if (options.needsAuth && !request.token) {
    //  return Promise.reject(new Error("Unauthorized"));
    //}

    var url = options.url || config.baseApiUrl + options.path;
    var headers = {};
    if (options.data) headers["Content-Type"] = "application/json";
    if (request.token) headers["Authorization"] = "Bearer " + request.token;
    if (request.userId) headers["X-User-Id"] = request.userId;
    var fetchOptions = {
      method: options.method || "GET",
      body: JSON.stringify(options.data),
      headers: new Headers(headers),
    };

    return fetch(url, fetchOptions)
      .then(function (res) {
        if (res.headers.get("content-type").includes("application/json")) {
          return res.json();
        }
        return res.text();
      })
      .then(function (res) {
        // Fetch doesn't reject in case of code 400+,
        // only when actual network error.
        if (res.error) {
          throw new Error(res.error);
        }
        log(
          "Request successful",
          fetchOptions.method,
          options.path || options.url,
          res
        );
        return res;
      });
  }

  // Will be set as soon as we have it.
  request.token = undefined;
  request.userId = undefined;

  /* App */

  // TODO move it to mongo
  var state = assign(
    {
      subLang: "auto",
      trLang: "en",
      shareReminderCounter: 0,
    },
    getState()
  );

  function setState(nextState) {
    assign(state, nextState);
    try {
      localStorage.setItem("lingvo.tv", JSON.stringify(state));
    } catch (err) {
      error(err);
    }
  }

  function getState() {
    var item = localStorage.getItem("lingvo.tv");
    if (item) return JSON.parse(item);
  }

  function feedback() {
    ga("send", {
      hitType: "event",
      eventCategory: "feedback",
      eventAction: "feedbackFromMainNav",
    });
    location.href = "mailto:help@lingvo.tv?subject=Help";
  }

  function ScrollRenderController(props) {
    var node = props.node;
    var threshold = 20;
    var state = {};
    var timerId;

    function check() {
      var distance = node.scrollTop - (node.scrollHeight - node.offsetHeight);
      var isAtBottom = distance > -threshold;

      if (isAtBottom !== state.isAtBottom) {
        state.isAtBottom = isAtBottom;
        props.onChange(state);
      }
    }

    function reset() {
      state = {};
    }

    node.addEventListener("scroll", function () {
      clearTimeout(timerId);
      timerId = setTimeout(check, 50);
    });

    return {
      check: check,
      reset: reset,
    };
  }

  function Dialog() {
    var node = div({ classes: ["dialog", "hidden"] });

    function render(nextProps) {
      $(node, [div({ classes: ["window"] }, nextProps.children)]);
      return node;
    }

    function show() {
      node.classList.remove("hidden");
      return this;
    }

    function hide() {
      node.classList.add("hidden");
      return this;
    }

    return {
      node: node,
      render: render,
      show: show,
      hide: hide,
    };
  }

  function Stream(props) {
    var node = div({ classes: ["screen", "stream", "hidden"] });
    var sectionNodes;
    var sections = [];
    var isEmpty = true;
    var autoScroll = true;
    var stream = [];

    var scrollRenderController = ScrollRenderController({
      node: node,
      onChange: onScrollChange,
    });

    function onScrollChange(state) {
      autoScroll = state.isAtBottom;
      if (state.isAtBottom) props.onHideJumper();
      else props.onShowJumper();
    }

    function scrollToEnd() {
      node.scrollTop = node.scrollHeight;
    }

    function renderSection(text) {
      var section = SubtitleSection({});
      section.setProps({
        text: text,
        isPrimary: true,
        onTranslate: function (params) {
          return props.onTranslate(params).then(function (data) {
            setTimeout(scrollRenderController.check, 100);
            return data;
          });
        },
      });
      sections.push(section);
      return section.render();
    }

    function append(data) {
      if (isEmpty) {
        removeNode(sectionNodes.firstChild);
        isEmpty = false;
      }
      stream.push(data);
      sections[sections.length - 1].setProps({ isPrimary: false }).render();
      sectionNodes.appendChild(renderSection(data.text));
      if (autoScroll) scrollToEnd();
    }

    function show() {
      node.classList.remove("hidden");
      scrollRenderController.check();
    }

    function hide() {
      scrollRenderController.reset();
      props.onHideJumper();
      node.classList.add("hidden");
    }

    function render() {
      return $(node, [
        (sectionNodes = div({ classes: ["sections"] }, [
          // Initial entry
          // People don't expect that they receive subtitles only if they play the movie.
          renderSection("Start playing a movie with subtitles on"),
        ])),
      ]);
    }

    return {
      node: node,
      render: render,
      append: append,
      show: show,
      hide: hide,
      scrollToEnd: scrollToEnd,
    };
  }

  function SubtitleSection(props) {
    props.theme || (props.theme = { classes: {} });
    var api;
    var node = section();
    var translation = Translation({});
    var subtitle = Subtitle({});

    function onSelectWords(param) {
      if (!param.words.length) {
        return setProps({
          selected: [],
          translation: null,
        }).render();
      }

      props
        .onTranslate({ words: param.words, subtitle: props.text })
        .then(function (translation) {
          setProps({
            translation: translation,
            selected: param.words,
          }).render();
        });
    }

    function setProps(nextProps) {
      assign(props, nextProps);
      if (props.translation) {
        translation.setProps(props.translation);
      }
      subtitle.setProps({
        text: props.text,
        selected: props.selected,
        marked: props.marked,
        isPrimary: props.isPrimary,
        isSelectable: props.isSelectable,
        className: props.theme.classes.subtitle,
        onSelectWords: onSelectWords,
      });
      return api;
    }

    function render() {
      return $(node, { classes: ["subtitle-section", props.className] }, [
        subtitle.render(),
        props.translation ? translation.render() : undefined,
      ]);
    }

    return (api = {
      node: node,
      render: render,
      setProps: setProps,
    });
  }

  function Subtitle(props) {
    props.selected || (props.selected = []);
    props.marked || (props.marked = []);
    props.isSelectable !== undefined || (props.isSelectable = true);

    var api;
    var node = div({
      onclick: onClickWord,
    });

    function onClickWord(e) {
      var word = e.target;
      if (!props.isSelectable || !word.classList.contains("word")) return;
      word.classList.toggle("is-selected");
      props.onSelectWords({ node: node, words: getSelectedWords() });
    }

    function clearWord(str) {
      return str.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    }

    function splitText(text) {
      return text.split(/\s/).map(function (word) {
        return clearWord(word);
      });
    }

    function getSelectedWords() {
      var wordNodes = toArray(node.querySelectorAll(".word"));

      return wordNodes.reduce(function (selectedWords, node, pos) {
        if (node.classList.contains("is-selected")) {
          selectedWords.push({
            pos: pos,
            text: clearWord(node.textContent),
          });
        }
        return selectedWords;
      }, []);
    }

    function hasWord(text, selectedWords, pos) {
      if (!text) return false;
      var word = selectedWords.filter(function (word) {
        return word.text === text && word.pos === pos;
      })[0];
      return Boolean(word);
    }

    function renderSubtitle(text) {
      var pos = 0;

      function renderLine(line) {
        return line.split(" ").reduce(function (elements, word) {
          var cleanWord = clearWord(word);
          var isSelected = hasWord(cleanWord, props.selected, pos);
          var isMarked = hasWord(cleanWord, props.marked, pos);

          elements.push(
            span({
              classes: [
                "word",
                isSelected ? "is-selected" : "",
                isMarked ? "is-marked" : "",
                props.isSelectable ? "is-selectable" : "",
              ],
              textContent: word,
            })
          );
          elements.push(span({ textContent: " " }));
          pos++;
          return elements;
        }, []);
      }

      return text.split("\n").map(function (line) {
        return p(renderLine(line));
      });
    }

    function setProps(nextProps) {
      assign(props, nextProps);
      return api;
    }

    function render() {
      if (!props.text) return node;

      var classes = [
        "subtitle",
        props.isPrimary ? "is-primary" : "",
        props.className,
      ];
      return $(node, { classes: classes }, renderSubtitle(props.text));
    }

    return (api = {
      render: render,
      setProps: setProps,
    });
  }

  function Jumper(props) {
    var node = button({
      classes: ["icon-button", "jumper-button"],
      onclick: props.onScrollToEnd,
    });

    function show() {
      node.classList.add("show");
    }

    function hide() {
      node.classList.remove("show");
    }

    return {
      node: node,
      show: show,
      hide: hide,
    };
  }

  function Translation(props) {
    var api;
    var node = div({ classes: ["translation"] });

    function setProps(nextProps) {
      assign(props, nextProps);
      return api;
    }

    function render() {
      if (!props.translation) return node;

      $(node, [
        h2({ textContent: props.original + " - " + props.translation.main }),
        div(
          props.translation.others.map(function (tr) {
            return section([
              div({ textContent: tr.type }),
              p({ innerHTML: tr.translations.join("<br />") }),
            ]);
          })
        ),
        div(
          props.translation.thesaurus.map(function (tr) {
            return section([
              div({ textContent: tr.type }),
              p(
                tr.translations.map(function (tr) {
                  return p({ textContent: tr });
                })
              ),
            ]);
          })
        ),
      ]);

      return node;
    }

    return (api = {
      node: node,
      render: render,
      setProps: setProps,
    });
  }

  function UpgradePrompt() {
    function onUpgrade(e) {
      e.preventDefault();
      ga("send", {
        hitType: "event",
        eventCategory: "monetization",
        eventAction: "upgradeFromHistory",
        eventLabel: "upgrade",
      });
      location.href = e.target.href;
    }

    function render() {
      return $(
        div({ classes: ["upgrade-prompt"] }, [
          div({ classes: ["content"] }, [
            h2({ textContent: "LingvoTV Premium" }),
            p({
              textContent:
                "Improve your vocabulary by rereading the new words after watching the movie!",
            }),
            a({
              classes: ["control", "upgrade"],
              textContent: "Upgrade",
              href: config.baseUrl + "/#pricing",
              onclick: onUpgrade,
            }),
          ]),
        ])
      );
    }

    return {
      render: render,
    };
  }

  function History(props) {
    var node = div({ classes: ["screen", "history", "hidden"] });
    var historyData = props.historyData;
    var lastHistoryLength = historyData.length;
    var api;
    var selectedMap = {};
    var upgradePrompt = UpgradePrompt();

    function onSelect(id, e) {
      e.preventDefault();
      e.stopPropagation();
      selectedMap[id] = !selectedMap[id];
      render();
      props.onSelect({ selected: getSelected() });
    }

    function getSelected() {
      return Object.keys(selectedMap).filter(function (id) {
        return selectedMap[id];
      });
    }

    function isSameDay(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getYear() === date2.getYear()
      );
    }

    function add(params) {
      var entry = historyData.find(function (entry) {
        return entry.subtitle === params.subtitle;
      });

      if (entry) {
        // Add new lookups to the entry.
        historyData.update(entry, { words: params.words });
      } else {
        entry = {
          createdAt: Date.now(),
          subtitle: params.subtitle,
          words: params.words,
        };
        historyData.create(entry);
      }

      render();
      return api;
    }

    function deleteSelected() {
      var deleteEntries = historyData.filter(function (entry, index) {
        return selectedMap[index];
      });
      selectedMap = {};
      historyData.delete(deleteEntries);
      render();
    }

    function show() {
      if (historyData.length !== lastHistoryLength) {
        lastHistoryLength = historyData.length;
        render();
      }
      node.classList.remove("hidden");
      props.onShow();
      return api;
    }

    function hide() {
      node.classList.add("hidden");
      props.onHide();
      return api;
    }

    function renderSeparator(date) {
      var dateStr =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      return div({ classes: ["date-separator"] }, [
        span({ textContent: dateStr }),
      ]);
    }

    function renderSection(entry, id) {
      var section = SubtitleSection({})
        .setProps({
          text: entry.subtitle,
          marked: entry.words,
          isPrimary: true,
          isSelectable: !props.isInEditMode,
          className: "history-section",
          onTranslate: props.onTranslate,
          theme: {
            classes: {
              subtitle: "history-subtitle",
            },
          },
        })
        .render();

      if (props.isInEditMode) {
        return div(
          {
            classes: ["edit-mode-container"],
            onclick: onSelect.bind(null, id),
          },
          [
            input({
              type: "checkbox",
              onclick: onSelect.bind(null, id),
              checked: selectedMap[id],
            }),
            section,
          ]
        );
      }

      return section;
    }

    function render() {
      var content;

      if (historyData.length) {
        content = historyData.reduce(function (rows, entry, i, entries) {
          var prevEntry = entries[i - 1];
          var currDate = new Date(entry.createdAt);
          if (
            !prevEntry ||
            !isSameDay(new Date(prevEntry.createdAt), currDate)
          ) {
            rows.push(renderSeparator(currDate));
          }
          rows.push(renderSection(entry, i));
          return rows;
        }, []);
      } else {
        content = [
          div({ classes: ["empty"] }, [
            h2({ textContent: "No entries found" }),
            p({ textContent: "Click on subtitles to translate." }),
          ]),
        ];
      }

      if (props.featuresData.history === false) {
        content.push(upgradePrompt.render());
      }
      return $(node, content);
    }

    function setProps(nextProps) {
      assign(props, nextProps);
      return api;
    }

    return (api = {
      node: node,
      render: render,
      show: show,
      hide: hide,
      add: add,
      setProps: setProps,
      deleteSelected: deleteSelected,
    });
  }

  function HistoryHeader(props) {
    var nav = Nav({ className: "history-header", top: true });
    var node = nav.node;
    var api;

    function setProps(nextProps) {
      assign(props, nextProps);
      return api;
    }

    function renderButtons() {
      if (props.historyData.length === 0) return;

      return [
        button({
          textContent: "Edit",
          classes: ["text-button", props.isEditing ? "hidden" : ""],
          onclick: props.onEdit,
        }),
        button({
          textContent: "Done",
          classes: ["text-button", props.isEditing ? "" : "hidden", "cta"],
          onclick: props.onDone,
        }),
      ];
    }

    function render() {
      return $(node, [
        div({ classes: ["placeholder"] }),
        div({ textContent: "History", classes: ["title"] }),
        div({ classes: ["button-container"] }, renderButtons()),
      ]);
    }

    return (api = {
      node: node,
      render: render,
      setProps: setProps,
      show: nav.show,
      hide: nav.hide,
    });
  }

  function HistoryFooter(props) {
    var nav = Nav({ className: "history-footer" });
    var node = nav.node;
    var api;

    function render() {
      return $(node, [
        button({
          textContent: "Delete",
          classes: ["text-button"],
          disabled: !props.buttonsEnabled,
          onclick: props.onDelete,
        }),
      ]);
    }

    function setProps(nextProps) {
      assign(props, nextProps);
      return api;
    }

    return (api = {
      node: node,
      render: render,
      show: nav.show,
      hide: nav.hide,
      setProps: setProps,
    });
  }

  function Settings(props) {
    var node = div({ classes: ["screen", "settings", "hidden"] });

    function onChangeSubLang(e) {
      props.onChangeSubLang(e.target.value);
    }

    function onChangeTrLang(e) {
      props.onChangeTrLang(e.target.value);
    }

    function onShare() {
      props.shareDialog.show();
    }

    function renderLangOptions() {
      return props.languages.map(function (lang) {
        return option({ value: lang.a, textContent: lang.f });
      });
    }

    function show() {
      node.classList.remove("hidden");
    }

    function hide() {
      node.classList.add("hidden");
    }

    function render() {
      var id = Math.random();
      return $(node, [
        section([
          div({ classes: ["column"] }, [
            label({ textContent: "Subtitles Language", for: "subLang" + id }),
            select(
              {
                id: "subLang" + id,
                classes: ["control"],
                value: state.subLang,
                onchange: onChangeSubLang,
              },
              renderLangOptions()
            ),
          ]),
          div({ classes: ["column"] }, [
            label({ textContent: "Translation Language", for: "trLang" + id }),
            select(
              {
                id: "trLang" + id,
                classes: ["control"],
                value: state.trLang,
                onchange: onChangeTrLang,
              },
              renderLangOptions()
            ),
          ]),
        ]),
        hr(),
        button({
          classes: ["control"],
          textContent: "Share",
          onclick: onShare,
        }),
      ]);
    }

    return {
      node: node,
      render: render,
      hide: hide,
      show: show,
    };
  }

  function HelpDialog() {
    var dialog = new Dialog();
    var faqData = FaqData();

    function show() {
      dialog.show();
      faqData.read().then(render);
    }

    function render(nextProps) {
      var content = div({ classes: ["help-dialog"] }, [
        div({
          classes: ["content"],
          innerHTML: nextProps.content || "Loading…",
        }),
        nextProps.content &&
          div({ classes: ["actions-bar"] }, [
            button({
              classes: ["control", "done"],
              textContent: "Close",
              onclick: dialog.hide,
            }),
          ]),
      ]);

      return dialog.render({ children: [content] });
    }

    return {
      render: render,
      show: show,
      hide: dialog.hide,
    };
  }

  function Login(props) {
    var node = div({
      classes: ["screen", "login", "hidden"],
    });
    var helpDialog = new HelpDialog();
    var loginButtonEl;
    var search = new URLSearchParams(location.search);
    var isUrlAuth = search.get("state") != null;
    var isActivation = search.get("type_hint") === "ACTIVATION";
    var authStateMachine = {
      state: "pending",
      pending: {
        welcome: false,
        login: false,
        loading: true,
      },
      authorized: {
        welcome: true,
        login: false,
        loading: false,
      },
      unauthorized: {
        welcome: false,
        login: true,
        loading: false,
      },
      get(view) {
        return this[this.state][view];
      },
    };
    var email;

    var okta = new OktaAuth({
      issuer: "https://lingvotv.okta.com/oauth2/default",
      clientId: "0oa1egchtJEA4o9dF5d6",
      redirectUri: location.origin,
    });

    function checkUser() {
      function getUser() {
        return Promise.all([
          okta.tokenManager.get("accessToken"),
          okta.tokenManager.get("idToken"),
        ])
          .then(function ([accessToken, idToken]) {
            return okta.getUser(accessToken, idToken);
          })
          .then(function (user) {
            return {
              email: user.email,
              familyName: user.family_name,
              givenName: user.given_name,
              preferredUsername: user.preferred_username,
              locale: user.locale,
              sub: user.sub,
            };
          });
      }

      function onGotUser(user) {
        // We already got the same user,
        // This can happen when user visits login screen
        // and we are already logged in, but we needed to check.
        if (user.email === email) {
          return;
        }
        log("Authorized user", user);
        email = user.email;
        authStateMachine.state = "authorized";
        render();
        props.onLogin(user);
      }

      function onError(err) {
        log("User session not found:", err.message);
        authStateMachine.state = "unauthorized";
        render();
      }
      getUser().then(onGotUser).catch(onError);
    }

    function onLogin() {
      authStateMachine.state = "pending";
      render();
      okta.token.getWithRedirect({
        scopes: ["openid", "email", "profile"],
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    function onHelp() {
      helpDialog.show();
    }

    function hide() {
      node.classList.add("hidden");
    }

    function show() {
      node.classList.remove("hidden");
      if (isUrlAuth) return;
      checkUser();
    }

    function render() {
      $(node, [
        div(
          {
            classes: ["welcome", !authStateMachine.get("welcome") && "hidden"],
          },
          [
            p([
              h2({ textContent: "Welcome to LingvoTV Web App" }),
              h3({
                innerHTML:
                  'Don\'t forget to install the <a href="https://chrome.google.com/webstore/detail/lingvo-tv/dgeiagkojabjccafojhokcceakmehpbb">Chrome Extension</a><br /> and then enter <b>' +
                  email +
                  "</b> in it to connect!",
              }),
            ]),
          ]
        ),
        p({
          classes: ["loading", !authStateMachine.get("loading") && "hidden"],
          textContent: "Loading…",
        }),
        button({
          classes: [
            "login",
            "control",
            !authStateMachine.get("login") && "hidden",
          ],
          textContent: "Login",
          onclick: onLogin,
        }),
        button({
          classes: ["text-button", "help"],
          textContent: "Help",
          onclick: onHelp,
        }),
        helpDialog.render({ email: email }),
      ]);

      return node;
    }

    // We are getting redirected from the okta login service
    // with query params in the url containing session data.
    if (isUrlAuth) {
      okta.token
        .parseFromUrl()
        .then(function (res) {
          log("Token from URL: ", res);
          okta.tokenManager.setTokens(res.tokens);
        })
        .then(checkUser)
        .catch(function (err) {
          error("Set tokens from URL error: ", err.message);
          authStateMachine.state = "unauthorized";
          render();
        });
      // User has just registered and we need to log them in.
    } else if (isActivation) {
      props.onSignUp();
      onLogin();
    }

    return {
      node: node,
      render: render,
      hide: hide,
      show: show,
    };
  }

  function MainNav(props) {
    var nav = Nav({ className: "main-nav" }).show();
    var node = nav.node;
    var items = {};
    var selected;

    function onSelect(name) {
      if (selected === name) return;
      if (props.onSelect(name) === false) return;
      select(name);
    }

    function select(name) {
      selected = name;
      render();
    }

    function render() {
      $(node, [
        (items.login = button({
          classes: [
            "icon-button",
            "login-button",
            selected === "login" && "selected",
          ],
          textContent: "Connect",
          onclick: onSelect.bind(null, "login"),
        })),
        (items.stream = button({
          classes: [
            "icon-button",
            "stream-button",
            selected === "stream" && "selected",
          ],
          textContent: "Subtitles",
          onclick: onSelect.bind(null, "stream"),
        })),
        (items.history = button({
          classes: [
            "icon-button",
            "history-button",
            selected === "history" && "selected",
          ],
          textContent: "History",
          onclick: onSelect.bind(null, "history"),
        })),
        (items.settings = button({
          classes: [
            "icon-button",
            "settings-button",
            selected === "settings" && "selected",
          ],
          textContent: "Settings",
          onclick: onSelect.bind(null, "settings"),
        })),
        (items.feedback = button({
          classes: [
            "icon-button",
            "feedback-button",
            selected === "feedback" && "selected",
          ],
          textContent: "Feedback",
          onclick: onSelect.bind(null, "feedback"),
        })),
      ]);
      return node;
    }

    return {
      node: node,
      render: render,
      select: select,
      show: nav.show,
      hide: nav.hide,
    };
  }

  function Nav(props) {
    var node = nav({
      classes: [props.top ? "top" : "bottom", "hidden", props.className],
    });
    var api;

    function show() {
      node.classList.remove("hidden");
      return api;
    }

    function hide() {
      node.classList.add("hidden");
      return api;
    }

    return (api = {
      node: node,
      show: show,
      hide: hide,
      api: api,
    });
  }

  function ShareDialog() {
    var node = div({ classes: ["share-dialog"] });
    var dialog = new Dialog();
    var shareOptions = {
      url: "https://lingvo.tv",
    };
    var initialized = false;

    function onClose() {
      dialog.hide();
    }

    function show() {
      dialog.show();
      if (initialized) return;
      SocialShareKit.init(shareOptions);
      initialized = true;
    }

    function render() {
      var content = div({ classes: ["social-share"] }, [
        h2({
          textContent: "Share LingvoTV with friends and receive an upgrade!",
        }),
        div(
          {
            classes: ["ssk-block"],
            dataset: {
              text: "Learn languages while watching movies on Netflix and co.",
            },
          },
          [
            a({
              href: "",
              classes: ["ssk ssk-text ssk-facebook"],
              textContent: "Share on Facebook",
            }),
            a({
              href: "",
              classes: ["ssk ssk-text ssk-twitter"],
              textContent: "Share on Twitter",
            }),
            a({
              href: "",
              classes: ["ssk ssk-text ssk-vk"],
              textContent: "Share on VK",
            }),
          ]
        ),
        div({ classes: ["actions-bar"] }, [
          button({
            classes: ["control", "done"],
            textContent: "Close",
            onclick: onClose,
          }),
        ]),
      ]);
      $(node, [dialog.render({ children: [content] })]);
      return node;
    }

    return {
      show: show,
      render: render,
    };
  }

  function ShareReminder(props) {
    var shareDialog = props.shareDialog;
    var maxReminds = 3;
    var wait = 1 * 60 * 1000;
    var minDelayAfterSubtitle = 3 * 1000;
    var lastSubtitleTime = Date.now();
    var shareOptions = {
      url: "https://lingvo.tv",
    };

    function onSubtitle() {
      lastSubtitleTime = Date.now();
    }

    function show() {
      if (state.shareReminderCounter >= maxReminds) return;
      console.log(Date.now() - lastSubtitleTime, minDelayAfterSubtitle);
      if (Date.now() - lastSubtitleTime < minDelayAfterSubtitle) {
        return setTimeout(show, 5000);
      }

      setState({ shareReminderCounter: ++state.shareReminderCounter });
      shareDialog.show();
    }

    setTimeout(show, wait);

    return {
      onSubtitle: onSubtitle,
    };
  }

  function RenderController(props) {
    var active;

    function show(view) {
      if (view === active) return;
      if (active) active.hide();
      view.show();
      active = view;
      props.onShow(view);
    }

    return {
      show: show,
    };
  }

  function App(props) {
    var node = div({ classes: ["app"] });
    var stream;
    var history;
    var historyHeader;
    var historyFooter;
    var login;
    var settings;
    var nav;
    var controller;
    var jumper;
    var shareReminder;
    var historyData = props.historyData;

    controller = RenderController({
      onShow: function (inst) {
        switch (inst) {
          case stream:
            return nav.select("stream");
          case settings:
            return nav.select("settings");
          case login:
            return nav.select("login");
          case history:
            return nav.select("history");
        }
      },
    });

    nav = MainNav({
      onSelect: function (name) {
        switch (name) {
          case "login":
            return controller.show(login);
          case "stream":
            return controller.show(stream);
          case "history":
            return controller.show(history);
          case "settings":
            return controller.show(settings);
          case "feedback":
            feedback();
            return false;
        }
      },
    });

    login = Login({
      userData: props.userData,
      onLogin: props.onLogin,
      onSignUp: props.onSignUp,
    });

    stream = Stream({
      onTranslate: function (params) {
        history.add(params);
        historyHeader.setProps({ canEdit: true }).render();
        return onTranslate(params.words);
      },
      onShowJumper: function () {
        jumper.show();
      },
      onHideJumper: function () {
        jumper.hide();
      },
    });

    jumper = Jumper({
      onScrollToEnd: stream.scrollToEnd,
    });

    history = History({
      historyData: historyData,
      featuresData: props.featuresData,
      onTranslate: function (params) {
        return onTranslate(params.words);
      },
      onShow: function () {
        historyData.read().then(function () {
          historyHeader.render();
          history.render();
        });
        historyHeader.show();
      },
      onHide: function () {
        historyHeader.hide();
      },
      onSelect: function (params) {
        historyFooter
          .setProps({ buttonsEnabled: params.selected.length > 0 })
          .render();
      },
    });
    function onDoneHistoryEdit() {
      history.setProps({ isInEditMode: false }).render();
      historyHeader
        .setProps({
          isEditing: false,
          canEdit: historyData.length > 0,
        })
        .render();
      historyFooter.hide();
      nav.show();
    }
    historyHeader = HistoryHeader({
      historyData: historyData,
      onEdit: function () {
        history.setProps({ isInEditMode: true }).render();
        historyHeader.setProps({ isEditing: true }).render();
        historyFooter.show();
        nav.hide();
      },
      onDone: onDoneHistoryEdit,
    });
    historyFooter = HistoryFooter({
      onDelete: function () {
        history.deleteSelected();
        if (!historyData.length) onDoneHistoryEdit();
      },
    });

    shareDialog = new ShareDialog();

    settings = Settings({
      languages: config.languages,
      shareDialog: shareDialog,
      onChangeSubLang: function (value) {
        setState({ subLang: value });
      },
      onChangeTrLang: function (value) {
        setState({ trLang: value });
      },
    });

    shareReminder = new ShareReminder({ shareDialog: shareDialog });

    function onSubtitle(data) {
      stream.append({ text: data.original });
      shareReminder.onSubtitle(data);
    }

    function onTranslate(words) {
      words = words
        .map(function (word) {
          return word.text;
        })
        .join(" ");
      return props.onTranslate(words);
    }

    function requestAuthorization() {
      controller.show(login);
    }

    function render() {
      $(node, [
        nav.render(),
        login.render(),
        stream.render(),
        history.render(),
        historyHeader.render(),
        historyFooter.render(),
        jumper.node,
        settings.render(),
        shareDialog.render(),
      ]);

      return node;
    }

    return {
      node: node,
      render: render,
      onSubtitle: onSubtitle,
      requestAuthorization: requestAuthorization,
    };
  }

  function Socketio(props) {
    var connection;

    function connect() {
      connection = io.connect(config.baseApiUrl, {
        transports: ["polling"],
      });

      connection.on("connect", function () {
        log("Socketio connected");
      });

      connection.on("disconnect", function () {
        log("Socketio disconnected");
      });

      connection.on("authorized", function (code) {
        log("Socketio connection authorized:", code);
      });

      connection.on("subtitle", function (data) {
        log("Socketio received subtitle:", data);
        props.onSubtitle(data);
      });

      connection.on("authRequest", function () {
        log("Socketio auth requested by server");
        props.onRequestAuth();
      });

      return connection;
    }

    function authorize(code) {
      log("Sending authorization code:", code);
      connection.emit("authorize", code);
    }

    return {
      connect: connect,
      authorize: authorize,
    };
  }

  function UserData() {
    var data = {};

    function update(nextData) {
      // TODO Optimistically, rollback on error
      assign(data, nextData);

      return request({
        method: "PUT",
        path: "/user",
        data: data,
        needsAuth: true,
      }).catch(function (err) {
        error("Updating user failed:", err.message);
      });
    }

    return assign(data, {
      update: update,
    });
  }

  function TranslationData() {
    function read(text) {
      var lang = state.subLang + "-" + state.trLang;

      ga("send", {
        hitType: "event",
        eventCategory: "translation",
        eventAction: "translate",
        eventLabel: lang,
      });

      return request({
        path: "/translation/" + lang + "/" + encodeURI(text),
        needsAuth: true,
      }).catch(function (err) {
        error("Fetching translation failed:", err.message);
      });
    }

    return {
      read: read,
    };
  }

  function FeaturesData() {
    var data = {
      history: true,
    };

    function read() {
      return request({ path: "/features", needsAuth: true })
        .then(function (res) {
          return Object.assign(data, res);
        })
        .catch(function (err) {
          error("Fetching features failed:", err.message);
        });
    }

    return assign(data, { read: read });
  }

  function HistoryData() {
    var data = [];

    function create(entry) {
      // Optimistically add
      data.push(entry);

      return request({
        method: "POST",
        path: "/history",
        data: entry,
        needsAuth: true,
      }).catch(function (err) {
        // TODO recover in case of res.error
        error("Creating history entry failed:", err.message);
      });
    }

    function read() {
      return request({ path: "/history", needsAuth: true })
        .then(function (res) {
          data.splice.apply(data, [0, data.length].concat(res));
        })
        .catch(function (err) {
          // TODO recover in case of res.error
          error("Loading history failed:", err.message);
        });
    }

    function update(entry, update) {
      // Optimistically update
      assign(entry, update);

      return request({
        method: "PUT",
        path: "/history/" + entry._id,
        data: entry,
        needsAuth: true,
      }).catch(function (err) {
        // TODO recover in case of res.error
        error("Updating history entry failed:", err.message);
      });
    }

    function del(entries) {
      // Optimistic removal.
      entries.forEach(function (entry) {
        data.splice(data.indexOf(entry), 1);
      });

      var entryIds = entries
        .map(function (entry) {
          return entry._id;
        })
        .filter(Boolean);

      // E.g. when only demo item was in the list and it has no _id
      if (!entryIds.length) return;

      return request({
        method: "DELETE",
        path: "/history/" + entryIds,
        needsAuth: true,
      }).catch(function (err) {
        // TODO recover in case of res.error
        error("Saving history entry failed:", err.message);
      });
    }

    return assign(data, {
      create: create,
      read: read,
      update: update,
      delete: del,
    });
  }

  function FaqData() {
    var data = { content: "" };
    var promise;

    function read() {
      if (!promise) {
        var host = "https://lingvo.tv";
        // host = 'https://lingvo.loca.lt'
        // host = 'http://localhost:8081
        promise = request({ url: host + "/faq.html?" + Date.now() });
      }

      return promise
        .then(function (content) {
          data.content = content;
          return data;
        })
        .catch(function (err) {
          error("Reading FAQ failed:", err.message);
        });
    }
    return assign(data, { read: read });
  }

  function init() {
    MBP.enableActive();
    FastClick.attach(document.body);
    var app;
    var socketio = Socketio({
      onSubtitle: function (data) {
        app.onSubtitle(data);
      },
      onRequestAuth: function () {
        app.requestAuthorization();
      },
    });
    var featuresData = FeaturesData();
    var historyData = HistoryData();
    var translationData = TranslationData();
    var userData = UserData();

    app = App({
      onTranslate: translationData.read,
      onLogin: function (oktaUser) {
        ga("set", "userId", oktaUser.email);
        ga("send", {
          hitType: "event",
          eventCategory: "signon",
          eventAction: "signin",
          eventLabel: oktaUser.email,
        });
        request.token = oktaUser.sub;
        socketio.authorize(oktaUser.email);
        userData.update(oktaUser).then(function (user) {
          request.userId = user._id;
          featuresData.read().then(app.render);
        });
      },
      onSignUp: function () {
        ga("send", {
          hitType: "event",
          eventCategory: "signon",
          eventAction: "signup",
        });
      },
      featuresData: featuresData,
      historyData: historyData,
      userData: userData,
    });

    socketio.connect();
    app.render();

    document.body.appendChild(app.node);
  }

  window.addEventListener("load", init);
})();
