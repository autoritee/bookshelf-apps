document.addEventListener("DOMContentLoaded", function () {
  const formInputBook = document.getElementById("inputBook");
  const formSearchBook = document.getElementById("searchBook");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  function renderBooks() {
    const incompleteBooks = getBooks().filter((book) => !book.isComplete);
    const completeBooks = getBooks().filter((book) => book.isComplete);

    renderBookList(incompleteBookshelfList, incompleteBooks);
    renderBookList(completeBookshelfList, completeBooks);
  }

  function renderBookList(bookshelfList, books) {
    bookshelfList.innerHTML = "";

    books.forEach((book) => {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");

      bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <p>Tahun: ${book.year}</p>
        
        <div class="action">
          <button class="green" onclick="toggleBookStatus(${book.id})">
            ${book.isComplete ? "Belum selesai di Baca" : "Selesai dibaca"}
          </button>
          <button class="red" onclick="deleteBook(${
            book.id
          })">Hapus buku</button>
        </div>
      `;

      bookshelfList.appendChild(bookItem);
    });
  }

  formInputBook.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const yearString = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const year = parseInt(yearString);

    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };

    const books = getBooks();
    books.push(newBook);
    saveBooks(books);

    formInputBook.reset();
    renderBooks();
  });

  formSearchBook.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchTitle = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const books = getBooks();
    const searchResult = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle)
    );

    renderBookList(
      incompleteBookshelfList,
      searchResult.filter((book) => !book.isComplete)
    );
    renderBookList(
      completeBookshelfList,
      searchResult.filter((book) => book.isComplete)
    );
  });

  window.toggleBookStatus = function (bookId) {
    const books = getBooks();
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });

    saveBooks(updatedBooks);
    renderBooks();
  };

  window.deleteBook = function (bookId) {
    const books = getBooks();
    const updatedBooks = books.filter((book) => book.id !== bookId);

    saveBooks(updatedBooks);
    renderBooks();
  };

  renderBooks();
});
