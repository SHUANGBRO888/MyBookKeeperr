const express = require('express');
const dbConnect = require('./dbConnect');
const userRoute = require('./routes/usersRoute');
const PORT = process.env.PORT || 5500;
const transactionRoute = require('./routes/transactionsRoute');


const app = express();
// Set Middleware
app.use(express.json());
// Set Route
app.use('/api/users/', userRoute);
app.use('/api/transactions/', transactionRoute);


app.listen(PORT, () => console.log(`Server is in PORT： ${PORT}.`));
