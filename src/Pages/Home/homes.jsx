import React from 'react'
import "./style.css"
import AddDataSection from '../../Components/AddDataSection/AddDataSection'
import CustomerVehicleForm from '../../Components/CustomerVehicleForm/CustomerVehicleForm'
import Calculator from '../../Components/Calculator/Calculator'
import TransactionsTable from '../../Components/Tranaction/Transaction'
const homes = () => {
  return (
     <div className="main-content">
        <h1>RV Modeling App</h1>
        <AddDataSection  />
        <CustomerVehicleForm />
        <Calculator />
        <TransactionsTable />
      </div>
  )
}

export default homes
