const myLibrary = [];

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
};

const addBookToLibrary = (title, author, status) => myLibrary.push(new Book(title, author, status));

// dummy books added to library for testing
addBookToLibrary('abook', 'wesley oaks', 'read');
addBookToLibrary('james bond', 'carl dickinson', 'not read');
addBookToLibrary('indiana jones', 'james franco', 'not read');
console.table(myLibrary);

// loop myLibrary array and display each book on the page
const selectBookList = document.querySelector('.book-list');

function updateTable() {

    for (let i = 0; i < myLibrary.length; i++) {
        const makeTr = document.createElement('tr');
        const makeTdTitle = document.createElement('td');
        const makeTdAuthor = document.createElement('td');
        const makeTdStatus = document.createElement('td');
    
        // create new row
        selectBookList.appendChild(makeTr);
        makeTr.setAttribute('id', i);
        const targetRow = document.getElementById(i);
    
        // add title
        targetRow.appendChild(makeTdTitle);
        makeTdTitle.setAttribute('id', i + ' title');
        let targetTitle = document.getElementById(i + ' title');
        targetTitle.textContent = myLibrary[i]['title'];
    
        // add author
        targetRow.appendChild(makeTdAuthor);
        makeTdAuthor.setAttribute('id', i + ' author');
        let targetAuthor = document.getElementById(i + ' author');
        targetAuthor.textContent = myLibrary[i]['author'];
    
        // add status
        targetRow.appendChild(makeTdStatus);
        makeTdStatus.setAttribute('id', i + ' status');
        let targetStatus = document.getElementById(i + ' status');
        targetStatus.textContent = myLibrary[i]['status'];
    };
};

updateTable();

// button to open form to submit new book information to our library
const formMenu = document.querySelector('dialog');
const openFormBtn = document.querySelector('.open-form');
const closeFormBtn = document.querySelector('.close-menu-btn');
const addBookBtn = document.querySelector('.add-book-btn');
const getForm = document.querySelector('form');

openFormBtn.addEventListener('click', () => {
    formMenu.showModal();
});

closeFormBtn.addEventListener('click', () => {
    formMenu.close();
});

addBookBtn.addEventListener('click', preventDefault, false);
addBookBtn.addEventListener('click', () => {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    let read = '';

    if (document.getElementById('read').checked) {
        read = 'read';
    } else {
        read = 'not read';
    };

    // addBookToLibrary(title.value, author.value, read);

    const checkAlreadyExists = myLibrary.map(book => book.title).indexOf(title.value);

    if (checkAlreadyExists >= 0) {
        console.log('This Title already exists and we cannot add it again.');
    } else {
        addBookToLibrary(title.value, author.value, read);
    };

    // formMenu.close();
});

function preventDefault(event) {
    event.preventDefault();
};