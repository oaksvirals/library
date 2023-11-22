const myLibrary = [];

// function Book(title, author, status) {
//     this.title = title;
//     this.author = author;
//     this.status = status;
// };

// Book.prototype.changeStatus = function() {
//     if (this.status === 'Read') {
//         this.status = 'Not Read';
//     } else if (this.status === 'Not Read') {
//         this.status = 'Read'
//     };
// };


// Refactored above code into a Class per Odin Lesson
class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
    }

    changeStatus() {
        if (this.status === 'Read') {
            this.status = 'Not Read';
        } else if (this.status === 'Not Read') {
            this.status = 'Read'
        };
    }
};

const addBookToLibrary = (title, author, status) => myLibrary.unshift(new Book(title, author, status));

// dummy books added to library for filler
addBookToLibrary('Clean Code', 'Robert Martin', 'Read');
addBookToLibrary('The Pragmatic Programmer', 'Andrew Hunt and David Thomas', 'Read');
addBookToLibrary('Cracking the Coding Interview', 'Gayle McDowell', 'Not Read');

// initialize table data
function updateTable(array) {

    for (let i = 0; i < array.length; i++) {
        const selectBookList = document.querySelector('.book-list');

        const makeTr = document.createElement('tr');
        const makeNum = document.createElement('td');
        const makeTdTitle = document.createElement('td');
        const makeTdAuthor = document.createElement('td');
        const makeTdStatus = document.createElement('td');
        const removeButtonTd = document.createElement('td');
        const changeStatusButtonTd = document.createElement('td');
        const removeButton = document.createElement('button');
        const changeStatusButton = document.createElement('button');
    
        // create new row
        selectBookList.appendChild(makeTr);
        makeTr.setAttribute('id', i);
        const targetRow = document.getElementById(i);

        // add number
        targetRow.appendChild(makeNum);
        makeNum.textContent = i + 1;

        // add title
        targetRow.appendChild(makeTdTitle);
        makeTdTitle.setAttribute('id', i + ' title');
        makeTdTitle.style.textAlign = 'left'
        let targetTitle = document.getElementById(i + ' title');
        targetTitle.textContent = array[i]['title'];
    
        // add author
        targetRow.appendChild(makeTdAuthor);
        makeTdAuthor.setAttribute('id', i + ' author');
        makeTdAuthor.style.textAlign = 'left'
        let targetAuthor = document.getElementById(i + ' author');
        targetAuthor.textContent = array[i]['author'];
    
        // add status
        targetRow.appendChild(makeTdStatus);
        makeTdStatus.setAttribute('id', i + ' status');
        let targetStatus = document.getElementById(i + ' status');
        targetStatus.textContent = array[i]['status'];

        // add remove button td
        targetRow.appendChild(removeButtonTd);
        removeButtonTd.appendChild(removeButton);
        removeButton.setAttribute('class', 'btn remove-book');
        removeButton.setAttribute('value', i);
        removeButton.textContent = 'Delete Book';

        removeButton.addEventListener('click', () => {
            let find = array[removeButton.value].title;
            let position = myLibrary.map(book => book.title).indexOf(find);

            myLibrary.splice(position, 1);
            rebuildTable();
            updateTable(myLibrary);

            searchBar.value = '';
        });

        // add change status td
        targetRow.appendChild(changeStatusButtonTd);
        changeStatusButtonTd.appendChild(changeStatusButton);
        changeStatusButton.setAttribute('class', 'btn change-status');
        changeStatusButton.setAttribute('value', i);
        changeStatusButton.textContent = 'Change Status';

        changeStatusButton.addEventListener('click', () => {
            let find = array[removeButton.value].title;
            let position = myLibrary.map(book => book.title).indexOf(find);

            myLibrary[position].changeStatus();
            rebuildTable();
            updateTable(myLibrary);

            searchBar.value = '';
        });

    };

        // update search bar with book total
        const searchBar = document.querySelector('.search');

        if (array.length >= 1) {
            searchBar.setAttribute('placeholder', 'Search through your library of ' + array.length + ' books...');
        } else {
            searchBar.setAttribute('placeholder', 'Try adding books to your library...');
        };

        searchBar.addEventListener('input', () => {
            performSearch();
        });

        function performSearch() {
            const thisSearch = document.querySelector('.search');
            let search = thisSearch.value.toLowerCase();
            let searchLibrary = [];
        
            for (let i = 0; i < myLibrary.length; i++) {
                if (search === myLibrary[i].title.toLowerCase()) {
                    searchLibrary.push(myLibrary[i]);
                    rebuildTable();
                    updateTable(searchLibrary);
                }
            };
        
            if (search === '') {
                rebuildTable();
                updateTable(myLibrary);
                searchLibrary = [];
            }
        };

        // hide footer for long tables
        const footer = document.querySelector('.footer');
        if (myLibrary.length >= 5) {
            footer.style.visibility = 'hidden';
        } else {
            footer.style.visibility = 'visible';
        };
};

updateTable(myLibrary);

// button to open form to submit new book information to our library
const formMenu = document.querySelector('dialog');
const openFormBtn = document.querySelector('.open-form');
const closeFormBtn = document.querySelector('.close-menu-btn');
const addBookBtn = document.querySelector('.add-book-btn');
const getForm = document.querySelector('form');

openFormBtn.addEventListener('click', () => {
    formMenu.showModal();
    formMenu.style.backgroundColor = 'var(--white)';
    formMenu.style.border = '3px solid var(--accent)';
    formMenu.style.borderRadius = '8px';
    formMenu.style.padding = '25px';
});

closeFormBtn.addEventListener('click', () => {
    formMenu.style.display = '';
    formMenu.close();
});

addBookBtn.addEventListener('click', preventDefault, false);

function preventDefault(event) {
    event.preventDefault();
};

// Add New Book Button
addBookBtn.addEventListener('click', () => {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    let read = '';

    if (document.getElementById('read').checked) {
        read = 'Read';
    } else {
        read = 'Not Read';
    };

    // search if title already exists before adding it
    const alreadyExistNotification = document.querySelector('form p');
    const checkAlreadyExists = myLibrary.map(book => book.title).indexOf(title.value);

    if (checkAlreadyExists >= 0 || title.value === '' || author.value === '') {
        alreadyExistNotification.style.visibility = 'visible';
    } else {
        addBookToLibrary(title.value, author.value, read);
        rebuildTable();
        updateTable(myLibrary);

        title.value = '';
        author.value = '';
        alreadyExistNotification.style.visibility = 'hidden';

        formMenu.close();
    };
});

function rebuildTable() {
    const selectBookList = document.querySelector('.book-list');
    selectBookList.remove();

    const table = document.querySelector('table');

    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const number = document.createElement('th');
    const title = document.createElement('th');
    const author = document.createElement('th');
    const status = document.createElement('th');
    const remove = document.createElement('th');
    const changeStatus = document.createElement('th');

    table.appendChild(tbody);
    tbody.appendChild(tr);
    
    const topRow = document.querySelector('tr');

    topRow.appendChild(number);
    number.textContent = '#';
    topRow.appendChild(title);
    title.textContent = 'Title';
    topRow.appendChild(author);
    author.textContent = 'Author';
    topRow.appendChild(status);
    status.textContent = 'Status';
    topRow.appendChild(remove);
    remove.textContent = 'Remove';
    topRow.appendChild(changeStatus);
    changeStatus.textContent = 'Update'

    tbody.setAttribute('class', 'book-list');
};