const Borrow = require('../models/Borrow');

exports.borrowBook = async (req, res, next) => {
  try {
    const borrow = await Borrow.create({
      book: req.body.bookId,
      member: req.user.id
    });
    res.status(201).json(borrow);
  } catch (err) {
    next(err);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ error: 'Borrow record not found' });

    borrow.status = 'returned';
    borrow.returnedAt = new Date();
    await borrow.save();

    res.json({ message: 'Book returned' });
  } catch (err) {
    next(err);
  }
};
