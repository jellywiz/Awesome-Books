let books = [
    {
        title: 'Harry Potter',
        author: 'Jk Rolling'
    }
]

const inputTitle = document.querySelector('#title')
const inputAuthor = document.querySelector('#author')

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

function booksLocalStorageObject(title, author) {
    this.title = title;
    this.author = author;
}

function populateLocalStorage() {
    let title = '';
    let author = '';

    //Conditional statement to check if the <input> with #title id has text/ value
    if (inputTitle.value !== null) {
        title = inputTitle.value;
    }

    //Conditional statement to check if the <input> with #author id has text/ value
    if (inputAuthor.value !== null) {
        author = inputAuthor.value;
    }

    //Creating a new object that will hold the information we get from the input values
    let booksLocalStorageObj = new booksLocalStorageObject(title, author);

    //Conditional statement to check id localStorage is available on the browser
    if (storageAvailable('localStorage')) {

        //If the condition is true, we will set the object created above into the local storage
        localStorage.setItem('formData', JSON.stringify(booksLocalStorageObj));
    }
}

function loadLocalstorageData() {
    //Creating a new istance of booksLocalStorageObject with empty values
    let booksLocalStorageObj = new booksLocalStorageObject('','');

    //Conditional statement to check id localStorage is available on the browser
    if(storageAvailable('localStorage')){

        //If the condition is true, get the localStorage data and assing to the booksLocalStorageObj
        booksLocalStorageObj = JSON.parse(localStorage.getItem('formData'));
    }

    //Conditional to check if booksLocalStorageObj has data
    if(booksLocalStorageObj !== null){

        //If the condition is true, load the data the the input elements
        inputTitle.value = booksLocalStorageObj.title;
        inputAuthor.value = booksLocalStorageObj.author;
    }
}

window.addEventListener('load', loadLocalstorageData);
inputTitle.addEventListener('input', populateLocalStorage);
inputAuthor.addEventListener('input', populateLocalStorage);