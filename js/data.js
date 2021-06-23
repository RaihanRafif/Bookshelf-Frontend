const STORAGE_KEY = "BOOKSHELF";
const TEMP_STORAGE = "TEMP_BOOKSHELF";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }

  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
  if (data !== null) books = data;
  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) saveData();
}

function composeBookObject(title, author, year, isFinished) {
  return {
    id: +new Date(),
    author,
    title,
    year,
    isFinished,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }

  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function filterBook() {
  const input = document.getElementById("judul-buku");
  const filter = input.value.toUpperCase();
  const bookshelfFinished = document.getElementById("bookFinished");
  const bookshelfUnfinished = document.getElementById("bookUnfinished");

  const bookshelfFinishedLength =
    bookshelfFinished.getElementsByClassName("item").length;

  const bookshelfUnfinishedLength =
    bookshelfUnfinished.getElementsByClassName("item").length;

  for (i = 0; i < bookshelfFinishedLength; i++) {
    const theBook = bookshelfFinished.getElementsByClassName("item")[i];
    const bookFinishedTitle = theBook
      .getElementsByClassName("inner")[0]
      .getElementsByTagName("h2")[0];

    const finishedTitle =
      bookFinishedTitle.textContent || bookFinishedTitle.innerText;

    if (finishedTitle.toUpperCase().indexOf(filter) > -1) {
      theBook.style.display = "";
    } else {
      theBook.style.display = "none";
    }
  }
  for (i = 0; i < bookshelfUnfinishedLength; i++) {
    const theBook = bookshelfUnfinished.getElementsByClassName("item")[i];
    const bookUnfinishedTitle = theBook
      .getElementsByClassName("inner")[0]
      .getElementsByTagName("h2")[0];

    const unfinishedTitle =
      bookUnfinishedTitle.textContent || bookUnfinishedTitle.innerText;

    if (unfinishedTitle.toUpperCase().indexOf(filter) > -1) {
      theBook.style.display = "";
    } else {
      theBook.style.display = "none";
    }
  }
}
