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
    this.style.setProperty('color', ukPattern.test(query) ? '#ffd700' : '#90caf9', 'important');
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


main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });

main.addEventListener('scroll', function () {
  var atCategories = main.scrollLeft < main.scrollWidth / 5;
  window['back-btn'].dataset.expanded = atCategories ? 'true' : 'false';
});

window['back-btn'].addEventListener('click', function () {
  if (window['back-btn'].dataset.expanded === 'true') {
    main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });
    words.focus({ preventScroll: true });
    window['back-btn'].dataset.expanded = 'false';
  } else {
    main.scrollTo({ left: 0, behavior: 'smooth' });
    window['back-btn'].dataset.expanded = 'true';
  }
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
    exact.click();
    window['category-search'].value = '';
    window['category-search'].dispatchEvent(new Event('input'));
  }
});

categories.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="#"]');
  if (!link) return;
  e.preventDefault();
  link.blur();
  var target = document.getElementById(link.getAttribute('href').slice(1));
  if (!target) return;
  window['back-btn'].dataset.expanded = 'false';
  main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });
  words.focus({ preventScroll: true });
  target.scrollIntoView({ block: 'start', behavior: 'smooth' });
});


main.addEventListener('click', function (e) {
  const li = e.target.closest('li');
  if (!li) return;

  const word = li.querySelector('.en').textContent;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  if (bestVoice) utterance.voice = bestVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);

  // Only scroll to the section if categories nav is open
  if (window['back-btn'].dataset.expanded === 'true') {
    var section = li.closest('.words').previousElementSibling;
    if (section && section.classList.contains('divider')) {
      window['back-btn'].dataset.expanded = 'false';
      main.scrollTo({ left: words.offsetLeft, behavior: 'smooth' });
      words.focus({ preventScroll: true });
      section.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
});
