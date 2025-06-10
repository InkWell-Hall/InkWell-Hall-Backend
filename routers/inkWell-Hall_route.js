// import { Router } from "express";
// import { deleteBooks, getAllBooks, getBooks, patchBooks, postBooks } from "../controllers/inkWell-Hall_controller.js";


// export const inkWellHallRoute = Router();


// inkWellHallRoute.get('/Books/:id', getBooks)

// inkWellHallRoute.get('/Books', getAllBooks)

// inkWellHallRoute.post('/Books', postBooks)

// inkWellHallRoute.delete('/Books/:id', deleteBooks)

// inkWellHallRoute.patch('/Books/:id', patchBooks)



import { Router } from 'express';
import { authenticateUser, deleteBook, getAbook, getAllBooks, loginUser, patchAbook, postbooks, registerUser, } from '../controllers/inkWell-Hall_controller.js';
import { adminAuth, authenticate } from '../middleware/Authentication.js';

export const inkWellHallRoute = Router();

// registration
inkWellHallRoute.post('/User', registerUser);
// login by user
inkWellHallRoute.post('/User/auth',loginUser, authenticate);
// login by admin
inkWellHallRoute.post('/User/Admin',authenticate,adminAuth, loginUser);
// authenticaton tester by backend
inkWellHallRoute.get('/User', authenticate,authenticateUser);
// get books from the web using axios from (https://www.googleapis.com/books/v1/volumes?q=books)
// inkWellHallRoute.get('/Books',authenticate, getBooks);
// save all books derived from site to my db
// inkWellHallRoute.post('/Books', saveBooks);
inkWellHallRoute.post('/Books', postbooks);
// get access to all books in my db
inkWellHallRoute.get('/Books',authenticate, getAllBooks);
// get access to a  single book
inkWellHallRoute.get('/Books/:id', getAbook);
// delete a book
inkWellHallRoute.delete('/Books/:id', deleteBook);
// Patch or update a book
inkWellHallRoute.patch('/Books/:id', patchAbook);

