import React, { useState } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


const AddEditTransaction = ({
    setShowAddEditTransactionModal,
    showAddEditTransactionModal,
    setSelectItemForEdit,
    selectItemForEdit,
    getTransactions,
}) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('expense-tracker-user'));
            setLoading(true);
            // Edit or Add Transaction?
            if (selectItemForEdit) {
                // Edit Transaction
                await axios.post('/api/transactions/edit-transaction', {
                    payload: {
                        ...values,
                        userid: user._id,
                    },
                    transactionId: selectItemForEdit._id,
                });
                getTransactions();
                message.success('Transaction edited successfully');
            } else {
                // Add Transaction
                await axios.post('/api/transactions/add-transaction', {
                    ...values,
                    userid: user._id,
                    key: uuidv4(),
                });
                getTransactions();
                message.success('Transaction added successfully');
            }
            setSelectItemForEdit(null);
            setShowAddEditTransactionModal(false);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            message.error('Backend error');
        }
    };

    return (
        < Modal
            title={selectItemForEdit ? `Edit Transaction` : 'Add Transaction'}
            open={showAddEditTransactionModal}
            footer={false}
            onCancel={() => setShowAddEditTransactionModal(false)}
        >
            {loading && <Spinner />}
            <Form
                layout='vertical'
                className='transaction-form'
                onFinish={onFinish} initialValues={selectItemForEdit}
            >
                <Form.Item label='Amount' name='amount'>
                    <Input type='text' />
                </Form.Item >
                <Form.Item label='Main Category' name='mainCategory'>
                    <Select
                        initialvalue='Income'
                        options={[
                            {
                                value: 'Income',
                                label: 'Income'
                            },
                            {
                                value: 'Expense',
                                label: 'Expense'
                            }
                        ]}
                    />
                </Form.Item >
                <Form.Item label='Sub Category' name='subCategory'>
                    <Select
                        initialvalue='salary'
                        options={[
                            { value: 'Salary', label: 'Salary' },
                            { value: 'Freelance', label: 'Freelance' },
                            { value: 'Food', label: 'Food' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'Investment', label: 'Investment' },
                            { value: 'Travel', label: 'Travel' },
                            { value: 'Education', label: 'Education' },
                            { value: 'Medical', label: 'Medical' },
                            { value: 'Transportation', label: 'Transportation' },
                            { value: 'Utilities', label: 'Utilities' },
                            { value: 'Housing/Rent', label: 'Housing/Rent' },
                            { value: 'Insurance', label: 'Insurance' },
                            { value: 'Groceries', label: 'Groceries' },
                            { value: 'Clothing', label: 'Clothing' },
                            { value: 'Gifts/Donations', label: 'Gifts/Donations' },
                            { value: 'Personal Care', label: 'Personal Care' },
                            { value: 'Fitness', label: 'Fitness' },
                            { value: 'Digital Services', label: 'Digital Services' },
                            { value: 'Pets', label: 'Pets' },
                            { value: 'Taxes', label: 'Taxes' },
                            { value: 'Savings', label: 'Savings' },
                        ]}
                    />
                </Form.Item >
                <Form.Item label='Date' name='date'>
                    <Input type='date' />
                </Form.Item >
                <Form.Item label='Reference' name='reference'>
                    <Input type='text' />
                </Form.Item >
                <Form.Item label='Note' name='note'>
                    <Input type='text' />
                </Form.Item >

                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'>
                        Save
                    </button>
                </div>
            </Form>
        </Modal >
    );
};

export default AddEditTransaction;