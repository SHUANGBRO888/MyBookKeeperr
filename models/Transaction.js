const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    amount: { type: Number, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    reference: { type: String, required: true },
    note: { type: String, required: true },
    date: { type: Date, default: Date.now },
    key: { type: String, required: true },
});

const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;