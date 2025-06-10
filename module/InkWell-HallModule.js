// this should be your Mongoose model
// import mongoose, { Schema } from 'mongoose';

// const bookSchema = new Schema({
//     isbn: { type: String, required: true },
//     title: { type: String, required: true },
//     subtitle: String,
//     author: String,
//     published: Date,
//     publisher: String,
//     pages: Number,
//     description: String,
//     website: String
// }, { timestamps: true });


// const Book = mongoose.model('Book', bookSchema);
// export default Book;

import mongoose, { Schema } from 'mongoose';

// User model
const userSchema = new Schema({
  username: String,
  password: String,
  location: String,
  interest: {
    type: String,
    default: "" 
  },
  Age: Number
  // role: { type: String, enum: ['user', 'admin'] }
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

// Book model
// const bookSchema = new Schema({
//   title: String,
//   authors: [String],
//   publisher: String,
//   publishedDate: String,
//   description: String,
//   imageLinks: {
//     thumbnail: String
//   }
// },{ timestamps: true });

const bookSchema = new Schema({
    isbn: { 
      type: String, required: true 
    },
    title: { 
      type: String, required: true 
    },
    subtitle: String,
    author: { 
      type: String, required: true 
    },
    published: { 
      type: Number, required: true 
    },
    publisher: { 
      type: String, required: true 
    },
    pages: Number,
    description: { 
      type: String, required: true 
    },
    website: { 
      type: String, required: true 
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export { User, Book };
