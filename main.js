if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

const search = document.getElementById('search');
const items = document.querySelectorAll('.words li');
const wordLists = document.querySelectorAll('.words');
const ukPattern = /[\u0400-\u04FF]/;

search.addEventListener('input', function () {
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

  wordLists.forEach(function (ul) {
    const hasVisible = ul.querySelector('li:not(.hidden)');
    const divider = ul.previousElementSibling;
    ul.classList.toggle('hidden-section', !hasVisible);
    if (divider && divider.classList.contains('divider')) {
      divider.classList.toggle('hidden-section', !hasVisible);
    }
  });
});

var bestVoice = null;

function pickVoice() {
  var voices = speechSynthesis.getVoices();
  var enVoices = voices.filter(function (v) { return v.lang.startsWith('en'); });
  bestVoice =
    enVoices.find(function (v) { return v.name.includes('Google US English'); }) ||
    enVoices.find(function (v) { return v.lang === 'en-US' && v.localService; }) ||
    enVoices.find(function (v) { return v.lang === 'en-US'; }) ||
    enVoices[0] || null;
}

pickVoice();
speechSynthesis.addEventListener('voiceschanged', pickVoice);

items.forEach(function (li) {
  if (li.scrollWidth > li.clientWidth) {
    var en = li.querySelector('.en');
    var currentSize = parseFloat(getComputedStyle(en).fontSize);
    while (li.scrollWidth > li.clientWidth && currentSize > 8) {
      currentSize -= 1;
      en.style.fontSize = currentSize + 'px';
    }
  }
});

document.querySelector('main').addEventListener('click', function (e) {
  const li = e.target.closest('li');
  if (!li) return;

  const word = li.querySelector('.en').textContent;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  if (bestVoice) utterance.voice = bestVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});
