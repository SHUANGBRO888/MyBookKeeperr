const express = require('express');
const Transaction = require('../models/Transaction');
const moment = require('moment');
const router = express.Router();

// Get transactions API routes

router.post('/add-transaction', async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.send("Transaction added successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all transactions API routes
router.post('/get-all-transactions', async (req, res) => {
    try {
        const { frequency, selectRange, type } = req.body;
        const transactions = await Transaction.find({
            ...(frequency !== 'custom'
                ? { date: { $gt: moment().subtract(Number(frequency), 'd').toDate() } }
                : { date: { $gte: selectRange[0], $lte: selectRange[1] } }),
            userid: req.body.userid,
            ...(type !== 'All' && { mainCategory: type }),
        }).sort({ date: -1 });
        res.send(transactions);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Edit transactions API routes
router.post('/edit-transaction', async (req, res) => {
    try {
        await Transaction.findByIdAndUpdate({ _id: req.body.transactionId }, req.body.payload);
        res.send("Transaction edited successfully");
    } catch (error) {
        res.send("Transaction edited wrongly");
        res.status(500).json(error);
    }
});

// Delete transactions API routes
router.post('/delete-transaction', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete({ _id: req.body.transactionId });
        res.send("Transaction deleted successfully");
    } catch (error) {
        res.send("Transaction edited wrongly");
        res.status(500).json(error);
    }
});


module.exports = router;