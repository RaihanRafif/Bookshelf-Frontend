const UNCOMPLETED_BOOK_ID = "bookUnfinished";
const COMPLETED_BOOK_ID = "bookFinished";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h2");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("h4");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookContainer = document.createElement("div");
  bookContainer.classList.add("inner");
  bookContainer.append(bookTitle, bookAuthor, bookYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(bookContainer);

  if (isCompleted === "true" || isCompleted === true) {
    container.append(createButtonMovingToUnfinished(), createTrashButton());
  } else if (isCompleted === "false" || isCompleted === false) {
    container.append(createButtonMovingToFinished(), createTrashButton());
  }

  return container;
}

function createButtonMovingToUnfinished() {
  return createButton("btnToFinished", function (event) {
    movingBookToUnfinished(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeBookFromShelf(event.target.parentElement);
  });
}

function createButtonMovingToFinished() {
  return createButton("check-button", function (event) {
    movingBookToFinished(event.target.parentElement);
  });
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  if (buttonTypeClass == "btnToFinished") {
    button.textContent = "unFinish";
  } else if (buttonTypeClass == "check-button") {
    button.textContent = "Finish";
  } else if (buttonTypeClass == "trash-button"){
    button.textContent = "Erase";
  } return button;
}

function addBookToFinished() {
  const finishedBookShelf = document.getElementById(COMPLETED_BOOK_ID);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const isFinishedBook = document.getElementById("isFinished").value;

  const book = makeBook(titleBook, authorBook, yearBook, isFinishedBook);
  const bookObject = composeBookObject(
    titleBook,
    authorBook,
    yearBook,
    isFinishedBook
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  finishedBookShelf.append(book);
  updateDataToStorage();
}

function addBookToUnfinished() {
  const unfinishedBookShelf = document.getElementById(UNCOMPLETED_BOOK_ID);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const isFinishedBook = document.getElementById("isFinished").value;

  const book = makeBook(titleBook, authorBook, yearBook, isFinishedBook);
  const bookObject = composeBookObject(
    titleBook,
    authorBook,
    yearBook,
    isFinishedBook
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  unfinishedBookShelf.append(book);
  updateDataToStorage();
}

function movingBookToFinished(taskElement) {
  const finishBookshelf = document.getElementById(COMPLETED_BOOK_ID);
  const isFinished = true;
  const bookTitle = taskElement.querySelector(".inner > h2").innerText;
  const bookAuthor = taskElement.querySelector(".inner > p").innerText;
  const bookYear = taskElement.querySelector(".inner > p").innerText;
  const newBook = makeBook(bookTitle, bookAuthor, bookYear, isFinished);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isFinished = true;
  newBook[BOOK_ITEMID] = book.id;

  finishBookshelf.append(newBook);
  taskElement.remove();
  updateDataToStorage();
}

function movingBookToUnfinished(taskElement) {
  const unfinishBookshelf = document.getElementById(UNCOMPLETED_BOOK_ID);
  const isFinished = false;
  const bookTitle = taskElement.querySelector(".inner > h2").innerText;
  const bookAuthor = taskElement.querySelector(".inner > p").innerText;
  const bookYear = taskElement.querySelector(".inner > p").innerText;
  const newBook = makeBook(bookTitle, bookAuthor, bookYear, isFinished);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isFinished = false;
  newBook[BOOK_ITEMID] = book.id;

  unfinishBookshelf.append(newBook);
  taskElement.remove();
  updateDataToStorage();
}

function removeBookFromShelf(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();
  updateDataToStorage();
}

function refreshDataFromBooks() {
  const bookUnfinished = document.getElementById(UNCOMPLETED_BOOK_ID);
  let bookFinished = document.getElementById(COMPLETED_BOOK_ID);
  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isFinished
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isFinished === true || book.isFinished === "true") {
      bookFinished.append(newBook);
    } else if (book.isFinished === false || book.isFinished === "false") {
      bookUnfinished.append(newBook);
    }
  }
}
