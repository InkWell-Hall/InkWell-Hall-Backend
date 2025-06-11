// import Book from "../module/InkWell-HallModule.js";

// export const getAllBooks = async (req, res) => {
//     try {
//         res.status(200).json(await Book.find());
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getBooks = async (req, res) => {
//     try {
//         const id = req.params.id;
//         res.status(200).json(await Book.findById(id));
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const postBooks = async (req, res) => {
//     // Normalize input data
//     const raw = Array.isArray(req.body.books)
//         ? req.body.books
//         : Array.isArray(req.body)
//             ? req.body
//             : req.body;

//     if (!raw || (Array.isArray(raw) && raw.length === 0)) {
//         return res.status(400).json({ error: 'Invalid format or empty body' });
//     }

//     console.log("Data being inserted:", raw);

//     try {
//         let result;

//         if (Array.isArray(raw)) {
//             result = await Book.insertMany(raw); // Multiple books
//         } else {
//             result = await Book.create(raw); // Single book
//         }

//         res.status(201).json(result);
//     } catch (error) {
//         console.error("Error inserting books:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


// export const deleteBooks = async (req, res) => {
//     const id = req.params.id;
//     try {
//         res.status(200).json(await Book.findByIdAndDelete(id));
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

// export const patchBooks = async (req, res) => {
//     const id = req.params.id;
//     try {
//         res.status(200).json(await Book.findByIdAndUpdate(id, req.body, { new: true}));
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Book, User } from '../module/InkWell-HallModule.js';
import { bookSchema } from '../Schemas/InkWell-Hall_BookSchema.js';


// User registration
export const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};


export const authenticateUser = async (req, res) => {
  res.json({ message: 'Authentication successful', user: req.user });
};

// Get books from Google Books API
// export const getBooks = async (req, res) => {
//   try {
//     const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=books');
//     const books = response.data.items;
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// };


export const postbooks = async (req, res) => {
  const raw = Array.isArray(req.body.books) ? req.body.books : Array.isArray(req.body) ? req.body : [req.body];

  if (!raw || (Array.isArray(raw) && raw.length === 0)) {
    return res.status(400).json({ error: 'Invalid format or empty body' });
  }

  console.log("Data being inserted:", raw);

  const { error, value } = bookSchema.validate(raw);

  try {
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newBooks = await Book.insertMany(value);
    return res.status(201).json({ 'Books': newBooks });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}




// Save books to database
// export const saveBooks = async (req, res) => {
//   try {
//     const books = req.body;
//     await Book.insertMany(books);
//     res.json({ message: 'Books saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving books' });
//   }
// };

export const getAllBooks = async (req, res) => {
  try {
    res.status(200).json(await Book.find());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      res.status(404).json({ error: `Book with id not found ${id}` })
    } return res.status(200).json(deleteBook);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const getAbook = async (req, res) => {
  const id = req.params.id;
  try {
    const getAbook = await Book.findById(id);
    if (!getAbook) {
      res.status(404).json({ error: `Book with id not found ${id}` })
    } return res.status(200).json(getAbook);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}



export const patchAbook = async (req, res) => {
  const id = req.params.id;
  try {
    res.status(200).json(await Book.findByIdAndUpdate(id, req.body, { new: true }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};