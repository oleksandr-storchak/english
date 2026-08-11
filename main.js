if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

var ukPattern = /[\u0400-\u04FF]/;
var renderedCategories = new Set();

function renderCategory(id) {
  if (renderedCategories.has(id)) return;
  var category = WORD_DATA.categories[id];
  if (!category) return;
  var ul = document.getElementById('words-' + id);
  if (!ul) return;
  var html = '';
  for (var i = 0; i < category.words.length; i++) {
    var uk = category.words[i].uk;
    var en = category.words[i].en;
    html += '<li onclick="playWord(this)"><span class="uk">' + uk + '</span><span class="en">' + en + '</span><span class="play-btn"></span></li>';
  }
  ul.innerHTML = html;
  ul.classList.remove('hidden-section');
  var divider = ul.previousElementSibling;
  if (divider && divider.classList.contains('divider')) {
    divider.classList.remove('hidden-section');
  }
  renderedCategories.add(id);
}

var currentCategoryId = null;

function showOnlyCategory(id) {
  currentCategoryId = id;
  renderCategory(id);
  Object.values(WORD_DATA.order).forEach(function (otherId) {
    var ul = document.getElementById('words-' + otherId);
    if (!ul) return;
    var divider = ul.previousElementSibling;
    var hide = otherId !== id;
    ul.classList.toggle('hidden-section', hide);
    if (divider && divider.classList.contains('divider')) {
      divider.classList.toggle('hidden-section', hide);
    }
    if (!hide) {
      ul.querySelectorAll('li').forEach(function (li) { li.classList.remove('hidden'); });
    }
  });
}

var renderedPhraseCategories = new Set();

function renderPhraseCategory(id) {
  if (renderedPhraseCategories.has(id)) return;
  var category = PHRASE_DATA.categories[id];
  if (!category) return;
  var ul = document.getElementById('phrases-' + id.replace(/^phrase-/, ''));
  if (!ul) return;
  var html = '';
  for (var i = 0; i < category.phrases.length; i++) {
    var en = category.phrases[i].en;
    var uk = category.phrases[i].uk;
    html += '<li onclick="playWord(this)"><span class="en">' + en + '</span><span class="uk">' + uk + '</span><span class="play-btn"></span></li>';
  }
  ul.innerHTML = html;
  ul.classList.remove('hidden-section');
  var divider = ul.previousElementSibling;
  if (divider && divider.classList.contains('divider')) {
    divider.classList.remove('hidden-section');
  }
  renderedPhraseCategories.add(id);
}

var currentPhraseCategoryId = null;

function showOnlyPhraseCategory(id) {
  currentPhraseCategoryId = id;
  renderPhraseCategory(id);
  Object.values(PHRASE_DATA.order).forEach(function (otherId) {
    var ul = document.getElementById('phrases-' + otherId.replace(/^phrase-/, ''));
    if (!ul) return;
    var divider = ul.previousElementSibling;
    var hide = otherId !== id;
    ul.classList.toggle('hidden-section', hide);
    if (divider && divider.classList.contains('divider')) {
      divider.classList.toggle('hidden-section', hide);
    }
  });
}
//test

window['search-clear'].addEventListener('click', function () {
  window.search.value = '';
  window.search.dispatchEvent(new Event('input'));
  window.search.focus();
});

window.search.addEventListener('input', function () {
  window['search-clear'].classList.toggle('visible', this.value.length > 0);
  const query = this.value.trim();
  const lowerQuery = query.toLowerCase();

  if (query) {
    this.style.setProperty('color', ukPattern.test(query) ? '#cdaf57' : '#6ea8d6', 'important');
  } else {
    this.style.removeProperty('color');
  }

  if (!lowerQuery) {
    window['words-no-results'].style.display = 'none';
    // Clearing the search returns to the tile grid unless a category was picked.
    if (!categoryChosen) document.body.classList.remove('start-done');
    if (currentCategoryId) showOnlyCategory(currentCategoryId);
    return;
  }

  // Search shows matches across categories, so the grid steps aside — but this
  // is not a category choice, so clearing the query brings it back.
  document.body.classList.add('start-done');

  Object.values(WORD_DATA.order).forEach(function (id) {
    var category = WORD_DATA.categories[id];
    var hasMatch = category.words.some(function (w) {
      return w.uk.toLowerCase().includes(lowerQuery) || w.en.toLowerCase().includes(lowerQuery);
    });
    if (hasMatch) renderCategory(id);
  });

  var items = document.querySelectorAll('.words li');
  var wordLists = document.querySelectorAll('.words');

  items.forEach(function (li) {
    const uk = li.querySelector('.uk').textContent.toLowerCase();
    const en = li.querySelector('.en').textContent.toLowerCase();
    const match = uk.includes(lowerQuery) || en.includes(lowerQuery);
    li.classList.toggle('hidden', !match);
  });

  var anyVisible = false;
  wordLists.forEach(function (ul) {
    var id = ul.id.replace(/^words-/, '');
    if (!renderedCategories.has(id)) return;
    var hasVisible = !!ul.querySelector('li:not(.hidden)');
    const divider = ul.previousElementSibling;
    ul.classList.toggle('hidden-section', !hasVisible);
    if (divider && divider.classList.contains('divider')) {
      divider.classList.toggle('hidden-section', !hasVisible);
    }
    if (hasVisible) anyVisible = true;
  });

  window['words-no-results'].style.display = (!anyVisible) ? '' : 'none';
});

var bestVoice = null;
window['settings-btn'].addEventListener('click', function () {
  window['settings-dialog'].showModal();
});

window['settings-dialog'].addEventListener('click', function (e) {
  if (e.target === window['settings-dialog']) window['settings-dialog'].close();
});

function populateVoices() {
  var voices = speechSynthesis.getVoices();
  var enVoices = voices.filter(function (v) { return v.lang.startsWith('en'); });

  var savedVoiceName = localStorage.getItem('selectedVoice');
  window['voice-select'].innerHTML = '';

  enVoices.forEach(function (v) {
    var option = document.createElement('option');
    option.value = v.name;
    option.textContent = v.name + ' (' + v.lang + ')';
    if (savedVoiceName) {
      if (v.name === savedVoiceName) option.selected = true;
    } else {
      if (v.name.includes('Google US English')) option.selected = true;
    }
    window['voice-select'].appendChild(option);
  });

  applySelectedVoice(enVoices);
}

function applySelectedVoice(enVoices) {
  if (!enVoices) {
    enVoices = speechSynthesis.getVoices().filter(function (v) { return v.lang.startsWith('en'); });
  }
  var selectedName = window['voice-select'].value;
  bestVoice = enVoices.find(function (v) { return v.name === selectedName; }) ||
    enVoices.find(function (v) { return v.name.includes('Google US English'); }) ||
    enVoices.find(function (v) { return v.lang === 'en-US' && v.localService; }) ||
    enVoices.find(function (v) { return v.lang === 'en-US'; }) ||
    enVoices[0] || null;
}

window['voice-select'].addEventListener('change', function () {
  localStorage.setItem('selectedVoice', window['voice-select'].value);
  applySelectedVoice();
});

populateVoices();
speechSynthesis.addEventListener('voiceschanged', populateVoices);


var phrasesNav = window['phrases-nav'];
var navBack = window['back-btn'];
var navFwd = window['phrases-btn'];
var panels = [categories, words, phrases, phrasesNav];
var panelNames = ['Категорії', 'Слова', 'Фрази', 'Теми'];

main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });

function currentPanel() {
  if (main.scrollLeft >= main.scrollWidth - main.clientWidth - 5) {
    return panels.length - 1;
  }
  var x = main.scrollLeft + 10;
  var idx = 0;
  for (var i = 0; i < panels.length; i++) {
    if (panels[i].offsetLeft <= x) idx = i;
  }
  return idx;
}

function updateNav() {
  var idx = currentPanel();
  navBack.classList.toggle('nav-dimmed', idx <= 0);
  navFwd.classList.toggle('nav-dimmed', idx >= panels.length - 1);
  if (idx > 0) navBack.querySelector('span').textContent = panelNames[idx - 1];
  if (idx < panels.length - 1) navFwd.querySelector('span').textContent = panelNames[idx + 1];
}

function goToPanel(idx) {
  idx = Math.max(0, Math.min(panels.length - 1, idx));
  main.scrollTo({ left: panels[idx].offsetLeft, behavior: 'smooth' });
  panels[idx].focus({ preventScroll: true });
}

main.addEventListener('scroll', updateNav);
updateNav();

navBack.addEventListener('click', function () { goToPanel(currentPanel() - 1); });
navFwd.addEventListener('click', function () { goToPanel(currentPanel() + 1); });

categories.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="#"]');
  if (!link) return;
  showOnlyCategory(link.getAttribute('href').slice(1));
  dismissStartScreen();
  goToPanel(1);
});

var categoryLinks = categories.querySelectorAll('a[href^="#"]');
var wordCategoryIds = Object.values(WORD_DATA.order);

// The tile grid owns the words panel until a category is chosen. Any route into
// a specific category (tile, nav link, search, deep link) dismisses it.
var categoryChosen = false;

function dismissStartScreen() {
  categoryChosen = true;
  document.body.classList.add('start-done');
}

if (location.hash && wordCategoryIds.includes(location.hash.slice(1))) {
  showOnlyCategory(location.hash.slice(1));
  dismissStartScreen();
} else {
  showOnlyCategory(wordCategoryIds[0]);
}
window.addEventListener('hashchange', function () {
  var id = location.hash.slice(1);
  if (wordCategoryIds.includes(id)) {
    showOnlyCategory(id);
    dismissStartScreen();
  }
});

window['category-search'].addEventListener('input', function () {
  var query = this.value.trim().toLowerCase();
  var hasVisibleResults = false;

  categoryLinks.forEach(function (a) {
    var match = !query || a.textContent.toLowerCase().includes(query);
    a.style.display = match ? '' : 'none';
    if (match) hasVisibleResults = true;
  });

  window['no-results'].style.display = (query && !hasVisibleResults) ? '' : 'none';

  var exact = Array.from(categoryLinks).find(function (a) {
    return a.textContent.toLowerCase() === query;
  });
  if (exact) {
    goToPanel(1);
    exact.click();
    window['category-search'].value = '';
    window['category-search'].dispatchEvent(new Event('input'));
  }
});


var phraseLinks = phrasesNav.querySelectorAll('a[href^="#"]');

phrasesNav.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="#"]');
  if (!link) return;
  showOnlyPhraseCategory(link.getAttribute('href').slice(1));
  dismissPhraseStartScreen();
  goToPanel(2);
});

function dismissPhraseStartScreen() {
  document.body.classList.add('start-done-phrases');
}

var phraseCategoryIds = Object.values(PHRASE_DATA.order);
if (location.hash && phraseCategoryIds.includes(location.hash.slice(1))) {
  showOnlyPhraseCategory(location.hash.slice(1));
  dismissPhraseStartScreen();
} else {
  showOnlyPhraseCategory(phraseCategoryIds[0]);
}
window.addEventListener('hashchange', function () {
  var id = location.hash.slice(1);
  if (phraseCategoryIds.includes(id)) {
    showOnlyPhraseCategory(id);
    dismissPhraseStartScreen();
  }
});

window['phrase-search'].addEventListener('input', function () {
  var query = this.value.trim().toLowerCase();
  var hasVisibleResults = false;

  phraseLinks.forEach(function (a) {
    var match = !query || a.textContent.toLowerCase().includes(query);
    a.style.display = match ? '' : 'none';
    if (match) hasVisibleResults = true;
  });

  window['no-results-phrases'].style.display = (query && !hasVisibleResults) ? '' : 'none';

  var exact = Array.from(phraseLinks).find(function (a) {
    return a.textContent.toLowerCase() === query;
  });
  if (exact) {
    goToPanel(2);
    exact.click();
    window['phrase-search'].value = '';
    window['phrase-search'].dispatchEvent(new Event('input'));
  }
});



// On load the words panel shows a grid of category tiles instead of the first
// category's words, so the full range of categories is visible. Picking a tile
// (or searching, or using the category nav) swaps in the normal word list.
window['start-screen'].addEventListener('click', function (e) {
  var tile = e.target.closest('a.start-tile');
  if (!tile) return;
  e.preventDefault();
  showOnlyCategory(tile.getAttribute('href').slice(1));
  dismissStartScreen();
});

window['start-screen-phrases'].addEventListener('click', function (e) {
  var tile = e.target.closest('a.start-tile');
  if (!tile) return;
  e.preventDefault();
  showOnlyPhraseCategory(tile.getAttribute('href').slice(1));
  dismissPhraseStartScreen();
});

var currentPlayingLi = null;

function setPlaying(li, isPlaying) {
  if (li) li.classList.toggle('playing', isPlaying);
}

function playWord(li) {
  const word = li.querySelector('.en').textContent;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  if (bestVoice) utterance.voice = bestVoice;

  speechSynthesis.cancel();

  if (currentPlayingLi) setPlaying(currentPlayingLi, false);
  currentPlayingLi = li;
  setPlaying(li, true);

  utterance.onend = function () {
    setPlaying(li, false);
    if (currentPlayingLi === li) currentPlayingLi = null;
  };
  utterance.onerror = utterance.onend;

  speechSynthesis.speak(utterance);

  // Only scroll to the section if the categories panel is showing
  if (currentPanel() === 0) {
    var wordList = li.closest('.words');
    var section = wordList && wordList.previousElementSibling;
    if (section && section.classList.contains('divider')) {
      main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });
      words.focus({ preventScroll: true });
      section.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
}
