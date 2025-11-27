const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
  borrowedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
