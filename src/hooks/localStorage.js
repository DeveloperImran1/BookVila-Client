// import toast from "react-hot-toast";

// // react toast:
// const notifyFavorute = () => toast.success("Wow Successfully Added 😍")
// const existFavorute = () => toast.error("Allready this book Added 😊")
// const removeFavorute = () => toast.success("Remove this book 🤷‍♂️")

// // get gob key
// export const favoruteBookGet = () => {
//     let favoruteBook = [];
//     const storedFavoruteBook = localStorage.getItem('favoruteBook');
//     if (storedFavoruteBook) {
//         favoruteBook = JSON.parse(storedFavoruteBook);
//     }
//     return favoruteBook;
// };

// export const setFavoruteBook = (book) => {
//     let books = favoruteBookGet();
//     const isExist = books.find(b => b?.books?._id === book?.books?._id);
//     if (isExist) {
//         return existFavorute()
//     }
//     books.push(book);
//     const stringBook = JSON.stringify(books);
//     localStorage.setItem('favoruteBook', stringBook);
//     notifyFavorute();
// }

// // remove job in localStorage
// export const removeBook = (book) => {
//     const books = favoruteBookGet();
//     const currentBook = books.filter(b => b?.books?._id !== book?.books?._id);
//     const stringBook = JSON.stringify(currentBook);
//     localStorage.setItem('favoruteBook', stringBook);
//     removeFavorute();
// }

// // add to cart er jonno
// // react toast:
// const notifyCart = () => toast.success("Wow Successfully Added 😍")
// const existCart = () => toast.error("Allready this book Added 😊")
// const removeCart = () => toast.success("Remove this book 🤷‍♂️")

// // get gob key
// export const cartBookGet = () => {
//     let cartBook = [];
//     const storedCartBook = localStorage.getItem('cartBook');
//     if (storedCartBook) {
//         cartBook = JSON.parse(storedCartBook);
//     }
//     return cartBook;
// };

// export const setCartBook = (book) => {
//     let books = cartBookGet();
//     const isExist = books.find(b => b?.books?._id === book?.books?._id);
//     if (isExist) {
//         return existCart()
//     }
//     books.push(book);
//     const stringBook = JSON.stringify(books);
//     localStorage.setItem('cartBook', stringBook);
//     notifyCart();
// }

// // remove job in localStorage
// export const removeCartBook = (book) => {
//     const books = cartBookGet();
//     const currentBook = books.filter(b => b?.books?._id !== book?.books?._id);
//     const stringBook = JSON.stringify(currentBook);
//     localStorage.setItem('cartBook', stringBook);
//     removeCart();
// }

import toast from "react-hot-toast";

// Toast Messages
const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);

// Helper: Check for localStorage availability
export const isLocalStorageAvailable = () =>
  typeof window !== "undefined" && window.localStorage;

// Helper: Safely parse JSON
const safeParse = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Favorite Books Functions
export const favoruteBookGet = () => {
  if (!isLocalStorageAvailable()) return [];
  const storedFavoruteBook = localStorage.getItem("favoruteBook");
  return safeParse(storedFavoruteBook);
};

export const setFavoruteBook = (book) => {
  if (!isLocalStorageAvailable()) return;
  const books = favoruteBookGet() || [];
  const isExist = books.some((b) => b?.books?._id === book?.books?._id);

  if (isExist) {
    notifyError("Already this book is added 😊");
    return;
  }

  books.push(book);
  localStorage.setItem("favoruteBook", JSON.stringify(books));
  notifySuccess("Book successfully added to favorites 😍");
};

export const removeBook = (book) => {
  if (!isLocalStorageAvailable()) return;
  const books = favoruteBookGet() || [];
  const updatedBooks = books.filter((b) => b?.books?._id !== book?.books?._id);

  localStorage.setItem("favoruteBook", JSON.stringify(updatedBooks));
  notifySuccess("Book removed from favorites 🤷‍♂️");
};

// Cart Functions
export const cartBookGet = () => {
  if (!isLocalStorageAvailable()) return [];
  const storedCartBook = localStorage.getItem("cartBook");
  return safeParse(storedCartBook);
};

export const setCartBook = (book) => {
  if (!isLocalStorageAvailable()) return;

  // Ensure books is always an array
  const books = cartBookGet() || []; // Fallback to an empty array if null

  // Check if the book already exists
  const isExist = books.some((b) => b?.books?._id === book?.books?._id);

  if (isExist) {
    notifyError("Already this book is added to the cart 😊");
    return;
  }

  // Add the new book
  books.push(book);
  localStorage.setItem("cartBook", JSON.stringify(books));
  notifySuccess("Book successfully added to cart 😍");
};

export const removeCartBook = (book) => {
  if (!isLocalStorageAvailable()) return;
  const books = cartBookGet() || [];
  const updatedBooks = books.filter((b) => b?.books?._id !== book?.books?._id);

  localStorage.setItem("cartBook", JSON.stringify(updatedBooks));
  notifySuccess("Book removed from cart 🤷‍♂️");
};
