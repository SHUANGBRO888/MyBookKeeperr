import React from 'react';
import '../resources/analytic.css';
import { Progress } from 'antd';

const Analytics = ({ transactions }) => {
    // Transaction count
    const totalTransactions = transactions.length;
    const totalIncomeTransaction = transactions.filter((transaction) => transaction.mainCategory === 'Income');
    const totalExpenseTransaction = transactions.filter((transaction) => transaction.mainCategory === 'Expense');

    const totalIncomeTransactionsPercentage = (totalIncomeTransaction.length / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = (totalExpenseTransaction.length / totalTransactions) * 100;

    // Transaction amounts
    const totalAmounts = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncome = transactions.filter((transaction) => transaction.mainCategory === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions.filter((transaction) => transaction.mainCategory === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomePercentage = (totalIncome / totalAmounts) * 100;
    const totalExpensePercentage = (totalExpense / totalAmounts) * 100;

    // Categories
    const subCategory = [
        'Salary',
        'Freelance',
        'Food',
        'Entertainment',
        'Investment',
        'Travel',
        'Education',
        'Medical',
        'Transportation',
        'Utilities',
        'Housing/Rent',
        'Insurance',
        'Groceries',
        'Clothing',
        'Gifts/Donations',
        'Personal Care',
        'Fitness',
        'Digital Services',
        'Pets',
        'Taxes',
        'Savings',
    ];

    // Format
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };


    return (
        <div className='analytics'>
            <div className='row'>
                <div className='col-md-4 mt-3'>
                    <div className='transaction-count'>
                        <h4>Total Transaction: {totalTransactions}</h4>
                        <hr />
                        <h5>Total Income: {totalIncomeTransaction.length}</h5>
                        <h5>Total Expense: {totalExpenseTransaction.length}</h5>
                        {/*Progress*/}
                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='#5DD64F'
                                type='circle'
                                percent={totalIncomeTransactionsPercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor='#E5572F'
                                type='circle'
                                percent={totalExpenseTransactionsPercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-md-4 mt-3'>
                    <div className='transaction-count'>
                        <h4>Total Amount: {formatCurrency(totalAmounts)}</h4>
                        <hr />
                        <h5>Total Income: {formatCurrency(totalIncome)}</h5>
                        <h5>Total Expense: {formatCurrency(totalExpense)}</h5>
                        {/*Progress*/}
                        <div className='progress-bars'>
                            <Progress
                                className='mx-5'
                                strokeColor='#5DD64F'
                                type='circle'
                                percent={totalIncomePercentage.toFixed(0)}
                            />
                            <Progress
                                strokeColor='#E5572F'
                                type='circle'
                                percent={totalExpensePercentage.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='row'>
                <div className='col-md-6'>
                    <div className='category-analytics'>
                        <h4>Income Sub Category</h4>
                        {subCategory.map((category, index) => {
                            const amount = transactions
                                .filter(
                                    (transaction) =>
                                        transaction.mainCategory === 'Income' &&
                                        transaction.subCategory === category
                                )
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='category-card' key={index}>
                                        <h5>{category}</h5>
                                        <Progress
                                            strokeColor='#0B5AD9'
                                            percent={((amount / totalIncome) * 100).toFixed(0
                                            )}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='category-analytics'>
                        <h4>Expense Sub Category</h4>
                        {subCategory.map((category, index) => {
                            const amount = transactions
                                .filter(
                                    (transaction) =>
                                        transaction.mainCategory === 'Expense' &&
                                        transaction.subCategory === category
                                )
                                .reduce((acc, transaction) => acc + transaction.amount, 0);
                            return (
                                amount > 0 && (
                                    <div className='category-card' key={index}>
                                        <h5>{category}</h5>
                                        <Progress
                                            strokeColor='#0B5AD9'
                                            percent={((amount / totalExpense) * 100).toFixed(0
                                            )}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Analytics;