import { useState ,useEffect} from 'react'
import './stylesheet/Userlist.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import Bin from '../assets/bin.png'
import Pen from '../assets/pen.png'


const ExpenseList = () => {

    const [expense, setExpenses] = useState([
        
    ])

    useEffect(()=>{
      const fetchData=async()=>{
        try{
        const response=await axios.get("https://expense-server-sdvy.onrender.com/get")
        setExpenses(response.data)
      }
      catch (error){
        console.error(error)
      }
    
    }
    fetchData()
    },[])
  
     

    // State variable 
    const [isedit, setIsedit] = useState(false)
    const [editid, setEditid] = useState("")
    const [category, setcategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [ind, setInd] = useState('');
    const [date, setDate] = useState('')

    // Delete operation
    const handleDelete = async(index) => {
        var v = expense[index]
        var itemid = v._id
        const response = await axios.delete(`https://expense-server-sdvy.onrender.com/del/${itemid}`)
        let deletedArray = expense.filter((exp, i) => index != i)
        setExpenses(deletedArray);
       
        
    }

    // Submit Button
    const handleSubmit = async() => {
        
        let temp = {
            ind: expense.length,
            date: today,
            category: category,
            amount: amount,
        }
        if (temp.category != ('') && temp.amount != ('')) {
            const response= await axios.post("https://expense-server-sdvy.onrender.com/api/",{category: category,amount: amount,})
            setExpenses([...expense,response.data])
            setcategory('');
            setAmount(0);
            toast.success('Submited');
        }
        else {
            toast.error("Enter Valid Details")
        }

    }
    // input Update button
    const handleUpdate = (index) => {
        let t = expense[index]
        setEditid(t._id);
        setInd(t.ind);
        setDate(today)
        setcategory(t.category);
        setAmount(t.amount);

    };
    // Update button
    const handleUpdateBtn = async() => {
        const response= await axios.put(`https://expense-server-sdvy.onrender.com/api/${editid}`,{category: category, amount: amount })
        const uparr=expense.map((item)=>{
            return item._id===editid? {...item,category,amount} : item;
        })
        setExpenses(uparr);
        setAmount(0)
        setcategory('')
        setEditid('')
        if (editid != -1) {
            toast.success("Updated")
        }

    }
   
    // Sum
    var sum = 0;
    var balance = expense.map((i) => {
        if (i.category == 'Salary'){
        sum = Number(sum) + Number(i.amount)}
        else{
            sum -=Number(i.amount)
        }
    })

    // Date
    var today = new Date().toLocaleDateString();



    return (
        <div className='tot'>
            <>
                <div className='glowing-border'>
                    <div className='inputbox'>
                        
                        <h3>Expenses</h3>
                        <select className="cat" value={category} onChange={(e) => setcategory(e.target.value)}>
                            <option value="" disabled selected> Category</option>
                            <option value="Salary">Salary</option>
                            <option value="Rent">Rent</option>
                            <option value="Food">Food</option>
                            <option value="Electricity">Electricity</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Other">Other</option>
                        </select>
                        <input type="number" className='number' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <div className='buttons'>
                            <button className='inputbtn' type='submit' onClick={() => handleSubmit(category, amount)}>Submit</button>
                            <button className='inputbtn' type="submit" onClick={() => handleUpdateBtn()}>Update</button>
                        </div>
                    </div></div>
                <div className='tbl'>
                    <h3 className='userh1'>Expense List</h3>
                    <table className="table">
                        <thead className="thead"><tr>
                            <th>Serial No</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th colSpan={2}>Action</th>
                        </tr></thead>
                        <tbody>
                            {expense.map((exp, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{exp.date}</td>
                                    <td>{exp.category}</td>
                                    <td>{exp.amount}</td>
                                    <td><button className='delete'onClick={() => handleDelete(index)}><img src={Bin}  height={30} width={30} alt='Delete'></img></button></td>
                                    <td><button className="update" onClick={() => handleUpdate(index)}><img src={Pen} height={30} width={30} alt='Edit'></img></button></td>
                                </tr>

                            )
                            )}
                            <tr>
                                <td colSpan={3}>Total Expenses</td>
                                <td className={sum>0? 'green':'red'} >{sum}</td>
                                <td cl colSpan={2}></td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </>
                            
        </div>

    )
}

export default ExpenseList


