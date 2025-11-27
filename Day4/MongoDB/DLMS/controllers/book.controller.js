const Book = require('../models/Book');
const NodeCache = require('../utils/cache');
const path = require('path');
const fs = require('fs');
const catchAsync = require('../utils/catch');

exports.addBook = catchAsync(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required' });
  const book = await Book.create({ 
    title: req.body.title, 
    author: req.body.author, 
    filename: req.file.filename 
  });
  NodeCache.del('books'); // invalidate cache
  res.status(201).json({ message: 'Book added', book });
});

exports.getBooks = catchAsync(async (req,res) => {
  let books = NodeCache.get('books');
  if (!books) {
    books = await Book.find();
    NodeCache.set('books', books);
  }
  res.json(books);
});

exports.streamBook = catchAsync(async (req,res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const filePath = path.join(__dirname, '../uploads', book.filename);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found' });

  res.setHeader('Content-Type', 'application/pdf');
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});
