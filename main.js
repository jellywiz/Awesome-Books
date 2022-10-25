/* eslint-disable max-classes-per-file */
// Getting the elements from the html page
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const bookContainer = document.querySelector('.books-container');
const btn = document.querySelector('#add-btn');

// Addinding a book class with a constructor that will hold the title and the author
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Adding another class that will hold the books array
class SettingBooks {
  // A constructor that will hold the books array
  constructor(books = []) {
    this.books = books;
  }

  // Add method to add a book to the books array
  add(bookItem) {
    this.books.push(bookItem);
    this.show(bookItem);
    this.remove();
    this.addToLocalStorage();
    inputAuthor.value = '';
    inputTitle.value = '';
  }

  // Remove method to remove a book from the books array
  remove() {
    const removeBtns = document.querySelectorAll('.remove-button');
    removeBtns[removeBtns.length - 1].addEventListener('click', (e) => {
      this.removeFromCollection(e.target);
      bookContainer.removeChild(e.target.parentNode);
    });
  }

  // This method will create new content in the html page
  show(item) {
    if (this) {
      const div = document.createElement('div');
      div.className = 'books';
      div.innerHTML = `<h3 class="books-items">"${item.title}" by
                    ${item.author}</h3>
                    <button data-value="${item.title}-${item.author}" type="button" class ="remove-button">Remove</button>`;
      bookContainer.appendChild(div);
    }
  }

  removeFromCollection(item) {
    const arr = item.getAttribute('data-value').split('-');
    this.books = this.books.filter(
      (data) => data.title !== arr[0] && data.author !== arr[1],
    );
    this.addToLocalStorage();
  }

  // This method will add the book to the local storage
  addToLocalStorage() {
    localStorage.setItem('bookItems', JSON.stringify({ bookColl: this.books }));
  }
}

const call = new SettingBooks();
if (localStorage.getItem('bookItems')) {
  const localBooks = JSON.parse(localStorage.getItem('bookItems'));
  localBooks.bookColl.forEach((item) => {
    call.add(new Book(item.title, item.author));
  });
}

// Adding a function to check if the local storage is available on the browser
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

function BooksLocalStorageObject(title, author) {
  this.title = title;
  this.author = author;
}

function populateLocalStorage() {
  let title = '';
  let author = '';

  // Conditional statement to check if the <input> with #title id has text/ value
  if (inputTitle.value !== null) {
    title = inputTitle.value;
  }

  // Conditional statement to check if the <input> with #author id has text/ value
  if (inputAuthor.value !== null) {
    author = inputAuthor.value;
  }

  // Creating a new object that will hold the information we get from the input values
  const booksLocalStorageObj = new BooksLocalStorageObject(title, author);

  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, we will set the object created above into the local storage
    localStorage.setItem('formData', JSON.stringify(booksLocalStorageObj));
  }
}

function loadLocalstorageData() {
  // Creating a new istance of booksLocalStorageObject with empty values
  let booksLocalStorageObj = new BooksLocalStorageObject('', '');

  // Conditional statement to check id localStorage is available on the browser
  if (storageAvailable('localStorage')) {
    // If the condition is true, get the localStorage data and assing to the booksLocalStorageObj
    booksLocalStorageObj = JSON.parse(localStorage.getItem('formData'));
  }

  // Conditional to check if booksLocalStorageObj has data
  if (booksLocalStorageObj !== null) {
    // If the condition is true, load the data the the input elements
    inputTitle.value = booksLocalStorageObj.title;
    inputAuthor.value = booksLocalStorageObj.author;
  }
}

window.addEventListener('load', loadLocalstorageData);
inputTitle.addEventListener('input', populateLocalStorage);
inputAuthor.addEventListener('input', populateLocalStorage);