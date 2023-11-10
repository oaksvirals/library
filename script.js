const myLibrary = [];

function Book(title, author, status) {
    this.title = title;
    this.author = author;
    this.status = status;
};

const addBookToLibrary = (title, author, status) => myLibrary.push(new Book(title, author, status));

// test
addBookToLibrary('wild things', 'wesley oaks', 'read');
addBookToLibrary('james bond', 'carl dickinson', 'not read');
addBookToLibrary('indiana jones', 'james franco', 'not read');

console.table(myLibrary);

// loop array and display each book on the page
const selectBookList = document.querySelector('.book-list');

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