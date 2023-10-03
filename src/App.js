import Container from 'react-bootstrap/Container'
import {Button, Stack} from 'react-bootstrap'
import AddBudgetModal from './Components/AddBudgetModal';
import AddExpenseModal from './Components/AddExpenseModal';
import ViewExpensesModal from './Components/ViewExpensesModal.js';
import BudgetCard from './Components/BudgetCard';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard.js';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetContexts';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [ViewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setaddExpenseModalBudgetId] = useState()
  const {budgets, getBudgetExpenses} = useBudgets()

 function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setaddExpenseModalBudgetId(budgetId)
    
    function openAddExpenseModal(budgetId) {
      setShowAddExpenseModal(prevState => !prevState);
      setaddExpenseModalBudgetId(budgetId);
    }
    
 }

  return  (
    <>
  <Container className= "my-4">
    <Stack direction= "horizontal" gap= "2" className="mb-4">
      <h1 className="me-auto">Budgets</h1> 
      <Button variant= "primary" onClick={() => setShowAddBudgetModal(true)}>
        Add Budget
      </Button>
      <Button variant= "outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style= {{display:"grid",
     gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
      gap: '1rem', alignItems: 'flex-start'}}>
        <TotalBudgetCard/>
          {budgets && budgets.map(budget =>{
              const amount = getBudgetExpenses(budget.id).
              reduce( (total, expense) => total + expense.amount,0)
              return(
                <BudgetCard 
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
              
          )
          })}
          
          
      <UncategorizedBudgetCard 
        onAddExpenseClick={openAddExpenseModal} 
        onViewExpensesClick={() =>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID) } /> 
    </div>
  </Container>
  <AddBudgetModal show= {showAddBudgetModal} handleClose={() => 
      setShowAddBudgetModal(false)} />

      <AddExpenseModal 
      show= {showAddExpenseModal} 
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose={() => setShowAddExpenseModal(false)}
       />
       <ViewExpensesModal 
        budgetId= {ViewExpensesModalBudgetId}
      handleClose={() => setViewExpensesModalBudgetId()}
  />
  </>
  )
    

}

export default App;

