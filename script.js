const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

// show loading
function loading() {
  loader.hiddem = false;
  quoteContainer.hidden=true;
}

// hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}


// if (!loader.hidden) it means if loader hidden is false. it a fast way
let apiQuote = [];

// show new quote
function newQuote() {

  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if author field is blank and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
// check quote lenght to determine styling
if (quote.text.length > 120) {
  quoteText.classList.add('long-quote');
} else {
  quoteText.classList.remove('long-quote');
}
// Set Quote Hide Loader
  quoteText.textContent = quote.text;
}


// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    complete();
  } catch (error) {
    // Catch Error Here
  }
}

// Get Quotes From API (Optional)
// async function getQuotes() {
//   const proxyUrl = 'htpps://cors-anywhere.herokuapp.com/'
//   const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuotes&lang=en$format=json';
//   try {
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     getQuotes();
//     console.log('whoops, no quote', error);
//   }
// }


// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}


// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuotes();

