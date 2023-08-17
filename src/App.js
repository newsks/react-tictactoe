import { useState } from "react";
import "./App.css"
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const App = () => {

  const [ charge, setCharge ] = useState("");
  const [ amount, setAmount ] = useState(0);

  const [id, setId] = useState('');
  const [edit, setEdit] = useState(false);

  const [ alert, setAlert ] = useState({ show:false });

  const [ expenses, setExpenses ] = useState([
    { id:1, charge:"렌트비", amount: 1600 },
    { id:2, charge:"교통비", amount: 400 },
    { id:3, charge:"식비", amount: 1200 }
  ])

  const clearItems = () => {
    setExpenses([]);
  }

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) =>{
    setAmount(e.target.valueAsNumber)
  }

  const handleDelete=(id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(newExpenses);
    handleAlert({ type:"danger", text:"아이템이 삭제되었습니다."})
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show:true, type, text });
    setTimeout(()=> {
      setAlert( { show: false });
    },7000);
  }

  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id );
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(charge !=="" && amount>0) {
      if(edit) {
        const newExpenses = expenses.map(item =>{
          return item.id === id? {...item, charge, amount } : item
        })
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type:"success", text:"아이템이 수정되었습니다"})
      } else {
        const newExpense = { id:crypto.randomUUID(),charge, amount}
        //불변성을 지켜주기 위해서 새로운 expenses를 생성
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type:"success", text:"아이템이 생성되었습니다"})
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log('error');
      handleAlert({ type:"danger", text:"charge는 빈값일 수 없으며 amount는 0보다 커야합니다."})
    }
  }
  
    return(
      <main className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/> : null }

        <h1>예산 계산기</h1>

        <div style={{ width:'100%', backgroundColor:'white', padding:'1rem'}}>
          {/* Expense Form */}
          <ExpenseForm 
            handleCharge={handleCharge}
            charge={charge}
            handleAmount={handleAmount}
            amount={amount}
            handleSubmit={handleSubmit}
            edit={edit}
          />
        </div>
        <div style={{ width:'100%', backgroundColor:'white', padding:'1rem'}}>
          {/* Expense List */}
          <ExpenseList 
            expenses={expenses}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            clearItems={clearItems}
          />
        </div>
        <div style={{ display:'flex', justifyContent:'end', marginTop:'1rem'}}>
          <p style={{ fontSize:'2rem', fontWeight:'bold' }}>
            총지출: 
            <span style={{ padding:'0 1rem'}}>
              {expenses.reduce((acc, curr) =>{
                return ( acc += curr.amount);
              }, 0)}
              원
            </span>
          </p>
        </div>
      </main>
    )
}

export default App;