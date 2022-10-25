// Getting the elements from the html page
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const form = document.querySelector('form');
const list = document.querySelector('ul');

// creating the array of the objects
const book = [];

// This function acts like a constructor for the book object
function Book(title, author) {
  this.title = title;
  this.author = author;
}

// This function will add the book to the local storage
function addToLocalStorage() {
  localStorage.setItem('books', JSON.stringify(book));
}

// This function will display all the books in the list and also add the books to the local storage
function displayBook() {
  // Creating the a new list element
  const li = document.createElement('li');

  // Creating spans to hold the title and the author and creating a new button to remove the book
  li.innerHTML = `
  <span>${inputTitle.value}</span><br>
  <span>${inputAuthor.value}</span><br>
  <button id="remove-btn" class="remove">Remove</button> <hr>`;

  // Creating a new object that will hold the information we get from the input values
  const newBook = new Book(inputTitle.value, inputAuthor.value);
  // Pushing the new book to the book array
  book.push(newBook);
  // Adding the new book to the local storage
  addToLocalStorage(book);
  // Appending the new list element to the list
  list.appendChild(li);

  // Creating a new varibale that will hold the remove button class
  const removeBtn = document.querySelectorAll('.remove');

  // Function to remove the book from the list
  function removeBook(element) {
    // Creating a key variable that will hold the index of the book in the book array
    const key = element;
    localStorage.removeItem(key);
    for (let i = 0; i < book.length; i += 1) {
      if (element === book[i].title) {
        book.splice(i, 1);
      }
    }
  }

  // Looping through the remove button and adding an event listener to each one
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removeBook(e.target.parentElement.firstElementChild.innerText);
      e.target.parentElement.remove();
      localStorage.clear();
      addToLocalStorage(book);
    });
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
