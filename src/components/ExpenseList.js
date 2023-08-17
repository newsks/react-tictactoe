import React from 'react'
import "./ExpenseList.css"
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({handleDelete,expenses,handleEdit,clearItems })=> {
    console.log(expenses);
    return (
      <>
        <ul className='list'>
         {/* Expense Item */}
         {expenses.map(expense => {
          return (
            <ExpenseItem 
              expense={expense} 
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
         })
         }
        </ul>
        {expenses.length > 0 && (
          <button className='btn' onClick={clearItems}>
            목록지우기
            <MdDelete className='btn-icon'/>
          </button>
        )}
        
      </>
    )
}

export default ExpenseList