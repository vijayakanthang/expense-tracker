import { useState, useEffect } from 'react';
import './stylesheet/ExpenseList.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Bin from '../assets/bin.png';
import Pen from '../assets/pen.png';

const ExpenseList = () => {
    const [expense, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://expense-server-sdvy.onrender.com/get");
                setExpenses(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [isedit, setIsedit] = useState(false);
    const [editid, setEditid] = useState("");
    const [category, setcategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [ind, setInd] = useState('');
    const [date, setDate] = useState('');

    const handleDelete = async (index) => {
        var v = expense[index];
        var itemid = v._id;
        const response = await axios.delete(`https://expense-server-sdvy.onrender.com/del/${itemid}`);
        let deletedArray = expense.filter((exp, i) => index !== i);
        setExpenses(deletedArray);
    };

    const handleSubmit = async () => {
        let temp = {
            ind: expense.length,
            date: today,
            category: category,
            amount: amount,
        };
        if (temp.category !== '' && temp.amount !== '') {
            const response = await axios.post("https://expense-server-sdvy.onrender.com/api/", { category: category, amount: amount });
            setExpenses([...expense, response.data]);
            setcategory('');
            setAmount(0);
            toast.success('Submitted');
        } else {
            toast.error("Enter Valid Details");
        }
    };

    const handleUpdate = (index) => {
        let t = expense[index];
        setEditid(t._id);
        setInd(t.ind);
        setDate(today);
        setcategory(t.category);
        setAmount(t.amount);
    };

    const handleUpdateBtn = async () => {
        const response = await axios.put(`https://expense-server-sdvy.onrender.com/api/${editid}`, { category: category, amount: amount });
        const uparr = expense.map((item) => {
            return item._id === editid ? { ...item, category, amount } : item;
        });
        setExpenses(uparr);
        setAmount(0);
        setcategory('');
        if (editid !== "") {
            toast.success("Updated");
        }
        setEditid('');
    };

    var sum = 0;
    expense.map((i) => {
        if (i.category === 'Salary') {
            sum = Number(sum) + Number(i.amount);
        } else {
            sum -= Number(i.amount);
        }
    });

    var today = new Date().toLocaleDateString('en-GB');

    return (
        <div className="container">
            <div className="table-container">
                <h3 className="userh1">Expense List</h3>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>Serial No</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense.map((exp, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{exp.date}</td>
                                <td>{exp.category}</td>
                                <td>{exp.amount}</td>
                                <td>
                                    <button className="delete" onClick={() => handleDelete(index)}>
                                        <img src={Bin} height={30} width={30} alt="Delete" />
                                    </button>
                                </td>
                                <td>
                                    <button className="update" onClick={() => handleUpdate(index)}>
                                        <img src={Pen} height={30} width={30} alt="Edit" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3}>Total Expenses</td>
                            <td className={sum > 0 ? 'green' : 'red'}>{sum}</td>
                            <td colSpan={2}></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="input-container">
                <div className="inputbox">
                    <h3>Expenses</h3>
                    <select className="cat" value={category} onChange={(e) => setcategory(e.target.value)}>
                        <option value="" disabled selected>Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Rent">Rent</option>
                        <option value="Food">Food</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="number" className="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <div className="buttons">
                        <button className="inputbtn" type="submit" onClick={handleSubmit}>Submit</button>
                        <button className="inputbtn" type="submit" onClick={handleUpdateBtn}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseList;
