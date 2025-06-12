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
import normalize from 'normalize-mongoose';

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
}, { timestamps: true });

const User = mongoose.model('User', userSchema.plugin(normalize));

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

  category: String,

  author: {
    type: String, required: true
  },

  description: {
    type: String, required: true
  },

  imageURL: [{
    type: String,
    required: true
  }]

}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema.plugin(normalize));
export { User, Book };
