const title = document.getElementById('title');
const aurthor = document.getElementById('aurthor');
const addbtn = document.getElementById('add');

const book = [{
  title: 'The Hobbit',
  aurthor: 'J.R.R. Tolkien',
},

{
  title: 'The Good Parts',
  aurthor: 'Douglas Crockford',
},
];

function Book(title, aurthor) {
  this.title = title;
  this.aurthor = aurthor;
}

function addBook(title, aurthor) {
  const newBook = new Book(title, aurthor);
  book.push(newBook);
}

function removeBook(title, aurthor) {
  const newBook = new Book(title, aurthor);
  return book.title !== newBook.title && book.aurthor !== newBook.aurthor;
}