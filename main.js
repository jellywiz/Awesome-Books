function Book(title, author) {
  this.title = title;
  this.author = author;
}

// Creating a new istance of booksLocalStorageObject with empty values
let booksLocalStorageObj = new Book('', '');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const addbtn = document.querySelector('#add')

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22
            // Firefox
            || e.code === 1014
            // test name field too, because code might not be present
            // everything except Firefox
            || e.name === 'QuotaExceededError'
            // Firefox
            || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            // acknowledge QuotaExceededError only if there's something already stored
            && (storage && storage.length !== 0);
  }
}

function populateLocalStorage() {
  let titleStr = '';
  let authorStr = '';

  // Conditional statement to check if the <input> with #title id has text/ value
  if (title.value !== null) {
    titleStr = title.value;
  }

  // Conditional statement to check if the <input> with #author id has text/ value
  if (author.value !== null) {
    authorStr = author.value;
  }

  // Creating a new object that will hold the information we get from the input values
  booksLocalStorageObj = new Book(titleStr, authorStr);

  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, we will set the object created above into the local storage
    localStorage.setItem('book', JSON.stringify(booksLocalStorageObj));
  }
}

function loadLocalstorageData() {
  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, get the localStorage data and assing to the booksLocalStorageObj
    booksLocalStorageObj = JSON.parse(localStorage.getItem('book'));
  }

  // Conditional to check if booksLocalStorageObj has data
  if (booksLocalStorageObj !== null) {
    // If the condition is true, load the data the the input elements
    title.value = booksLocalStorageObj.title;
    author.value = booksLocalStorageObj.author;
  }
}

const book = [{
  title: 'The Hobbit',
  author: 'J.R.R. Tolkien',
},

{
  title: 'The Good Parts',
  author: 'Douglas Crockford',
},
];

function addBook(title, author) {
  const newBook = new Book(title, author);
  book.push(newBook);
}

function removeBook(title, author) {
  const newBook = new Book(title, author);
  return book.title !== newBook.title && book.author !== newBook.author;
}

window.addEventListener('load', loadLocalstorageData);
title.addEventListener('input', populateLocalStorage);
author.addEventListener('input', populateLocalStorage);
