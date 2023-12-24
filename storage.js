const STORAGE_KEY = "BOOKSHELF_APPS";

// Function to get books from local storage
function getBooks() {
  let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return books;
}

// Function to save books to local storage
function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
