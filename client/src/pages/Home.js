import { Table, message, Select, DatePicker, } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddEditTransaction from '../components/AddEditTransaction';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transaction.css';
import Spinner from '../components/Spinner';
import Analytics from '../components/Analytics';
import moment from 'moment';

const Home = () => {
    const { RangePicker } = DatePicker;
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectRange, setSelectRange] = useState([]);
    const [type, setType] = useState('All');
    const [viewType, setViewType] = useState('table');
    const [selectItemForEdit, setSelectItemForEdit] = useState(null);

    const getTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('expense-tracker-user'));
            setLoading(true);
            const response = await axios.post(
                '/api/transactions/get-all-transactions',
                {
                    userid: user._id,
                    frequency,
                    ...(frequency === 'custom' && { selectRange }),
                    type,
                }
            );
            setTransactions(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Response wrong. Please try again later.');
        }
    };

    const delectTransaction = async (record) => {
        try {
            setLoading(true);
            await axios.post('/api/transactions/delete-transaction', {
                transactionId: record._id,
            });
            message.success('Transaction deleted successfully');
            getTransactions();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error('Transaction deleted wrongly.');
        }
    }

    // Get all previous transactions
    useEffect(() => {
        getTransactions();
    }, [frequency, selectRange, type]);

    // Define columns
    const columns = [
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
        },
        {
            title: 'Amount',
            key: 'amount',
            dataIndex: 'amount',
        },
        {
            title: 'Main Category',
            key: 'mainCategory',
            dataIndex: 'mainCategory',
        },
        {
            title: 'Sub Category',
            key: 'subCategory',
            dataIndex: 'subCategory',
        },
        {
            title: 'Reference',
            key: 'reference',
            dataIndex: 'reference',
        },
        {
            title: 'Edit',
            key: 'edit',
            dataIndex: 'edit',
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setSelectItemForEdit(record);
                        setShowAddEditTransactionModal(true)
                    }} />
                    <DeleteOutlined className='mx-3'
                        onClick={() => {
                            delectTransaction(record);
                        }} />
                </div>
            },
        },
    ];

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            {/* Filter , Type, add transaction*/}
            <div className='filter d-flex justify-content-between align-items-center'>
                {/* Filter */}
                <div className='d-flex'>
                    <div className='d-flex flex-column'>
                        <h6>Select Date</h6>
                        <Select
                            value={frequency}
                            onChange={(value) => setFrequency(value)}
                            options={[
                                {
                                    value: '7',
                                    label: 'Last Week',
                                },
                                {
                                    value: '30',
                                    label: 'Last Month',
                                },
                                {
                                    value: '365',
                                    label: 'Last Year',
                                },
                                {
                                    value: 'custom',
                                    label: 'Custom',
                                },
                            ]}
                        />

                        {frequency === 'custom' && (
                            <RangePicker
                                value={selectRange}
                                onChange={(value) => setSelectRange(value)}
                            />
                        )}
                    </div>
                    <div className='d-flex flex-column mx-5'>
                        <h6>Select Main Category</h6>
                        <Select
                            value={type}
                            onChange={(value) => setType(value)}
                            options={[
                                {
                                    value: 'All',
                                    label: 'All',
                                },
                                {
                                    value: 'Income',
                                    label: 'Income',
                                },
                                {
                                    value: 'Expense',
                                    label: 'Expense',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className='d-flex'>
                    <div>
                        <div className='view-switch mx-5'>
                            <UnorderedListOutlined
                                className={`mx-2 ${viewType === 'table' ? 'action-icon' : 'inactive-icon'
                                    }`}
                                onClick={() => setViewType('table')}
                            />
                            <AreaChartOutlined
                                className={`mx-2 ${viewType === 'analytics' ? 'action-icon' : 'inactive-icon'
                                    }`}
                                onClick={() => setViewType('analytics')}
                            />
                        </div>
                    </div>
                    <button
                        className='primary'
                        onClick={() => setShowAddEditTransactionModal(true)}
                    >
                        Add Transaction
                    </button>
                </div>
            </div>

            {/* Transaction*/}
            <div className='table-analtics'>
                {viewType === 'table' ? (
                    <div className='table'>
                        <Table columns={columns} dataSource={transactions} />
                    </div>
                ) : (
                    <Analytics transactions={transactions} />
                )}
            </div>
            {/* Transaction Modal*/}
            {showAddEditTransactionModal && (
                <AddEditTransaction
                    showAddEditTransactionModal={showAddEditTransactionModal}
                    setShowAddEditTransactionModal={setShowAddEditTransactionModal}
                    selectItemForEdit={selectItemForEdit}
                    setSelectItemForEdit={setSelectItemForEdit}
                    getTransactions={getTransactions}
                />
            )}
        </DefaultLayout >
    );
};

export default Home;