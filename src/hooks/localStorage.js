import toast from "react-hot-toast";


// react toast: 
const notifyFavorute = () => toast.success("Wow Successfully Added 😍")
const existFavorute = () => toast.error("Allready this book Added 😊")
const removeFavorute = () => toast.success("Remove this book 🤷‍♂️")

// get gob key
export const favoruteBookGet = () => {
    let favoruteBook = [];
    const storedFavoruteBook = localStorage.getItem('favoruteBook');
    if (storedFavoruteBook) {
        favoruteBook = JSON.parse(storedFavoruteBook);
    }
    return favoruteBook;
};



export const setFavoruteBook = (book) => {
    let books = favoruteBookGet();
    const isExist = books.find(b => b?.books?._id === book?.books?._id);
    if (isExist) {
        return existFavorute()
    }
    books.push(book);
    const stringBook = JSON.stringify(books);
    localStorage.setItem('favoruteBook', stringBook);
    notifyFavorute();
}


// remove job in localStorage
export const removeBook = (book) => {
    const books = favoruteBookGet();
    const currentBook = books.filter(b => b?.books?._id !== book?.books?._id);
    const stringBook = JSON.stringify(currentBook);
    localStorage.setItem('favoruteBook', stringBook);
    removeFavorute();
}



// add to cart er jonno
// react toast: 
const notifyCart = () => toast.success("Wow Successfully Added 😍")
const existCart = () => toast.error("Allready this book Added 😊")
const removeCart = () => toast.success("Remove this book 🤷‍♂️")

// get gob key
export const cartBookGet = () => {
    let cartBook = [];
    const storedCartBook = localStorage.getItem('cartBook');
    if (storedCartBook) {
        cartBook = JSON.parse(storedCartBook);
    }
    return cartBook;
};



export const setCartBook = (book) => {
    let books = cartBookGet();
    const isExist = books.find(b => b?.books?._id === book?.books?._id);
    if (isExist) {
        return existCart()
    }
    books.push(book);
    const stringBook = JSON.stringify(books);
    localStorage.setItem('cartBook', stringBook);
    notifyCart();
}


// remove job in localStorage
export const removeCartBook = (book) => {
    const books = cartBookGet();
    const currentBook = books.filter(b => b?.books?._id !== book?.books?._id);
    const stringBook = JSON.stringify(currentBook);
    localStorage.setItem('cartBook', stringBook);
    removeCart();
}