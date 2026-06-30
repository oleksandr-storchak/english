if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

var items = document.querySelectorAll('.words li');
var wordLists = document.querySelectorAll('.words');
var ukPattern = /[\u0400-\u04FF]/;

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

  items.forEach(function (li) {
    const uk = li.querySelector('.uk').textContent.toLowerCase();
    const en = li.querySelector('.en').textContent.toLowerCase();
    const match = !lowerQuery || uk.includes(lowerQuery) || en.includes(lowerQuery);
    li.classList.toggle('hidden', !match);
  });

  var anyVisible = false;
  wordLists.forEach(function (ul) {
    const hasVisible = ul.querySelector('li:not(.hidden)');
    const divider = ul.previousElementSibling;
    ul.classList.toggle('hidden-section', !hasVisible);
    if (divider && divider.classList.contains('divider')) {
      divider.classList.toggle('hidden-section', !hasVisible);
    }
    if (hasVisible) anyVisible = true;
  });

  window['words-no-results'].style.display = (lowerQuery && !anyVisible) ? '' : 'none';
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
  goToPanel(1);
});

var categoryLinks = categories.querySelectorAll('a[href^="#"]');

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



var currentPlayingLi = null;
var currentPlayingTimeout = null;
var speechBusy = false;

function setPlaying(li, isPlaying) {
  if (li) li.classList.toggle('playing', isPlaying);
}

function stopCurrentPlaying() {
  speechBusy = false;
  if (currentPlayingTimeout) {
    clearTimeout(currentPlayingTimeout);
    currentPlayingTimeout = null;
  }
  if (currentPlayingLi) {
    setPlaying(currentPlayingLi, false);
    currentPlayingLi = null;
  }
}

main.addEventListener('click', function (e) {
  const li = e.target.closest('li');
  if (!li) return;

  // Ignore clicks while speech is in flight so rapid/double clicks
  // can't queue or overlap multiple utterances. Click the same or a
  // different card again once the current one finishes.
  if (speechBusy) return;
  speechBusy = true;

  const word = li.querySelector('.en').textContent;

  // Show feedback immediately on tap — mobile speech engines can take
  // a while to actually start, and waiting for that would make taps
  // feel unresponsive.
  currentPlayingLi = li;
  setPlaying(li, true);

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  if (bestVoice) utterance.voice = bestVoice;

  utterance.onend = stopCurrentPlaying;
  utterance.onerror = stopCurrentPlaying;
  // Safety net in case onend/onerror never fire on some engines.
  currentPlayingTimeout = setTimeout(stopCurrentPlaying, 1100);

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
});
