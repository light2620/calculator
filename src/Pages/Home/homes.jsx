import React, { useEffect } from 'react'
import "./style.css"
import AddDataSection from '../../Components/AddDataSection/AddDataSection'
import CustomerVehicleForm from '../../Components/CustomerVehicleForm/CustomerVehicleForm'
import Calculator from '../../Components/Calculator/Calculator'
import TransactionsTable from '../../Components/Tranaction/Transaction'
import JDTrendChart from '../../Components/Graph/Graph'
import { useSelector } from 'react-redux'

const Homes = () => {
  const { user } = useSelector((state) => state.user);
  const data = useSelector((state) => state.allData.data);
  const cr2 = data?.cr?.value;

  // Extract only JD keys dynamically
  const jdData = cr2
    ? Object.keys(cr2)
        .filter((key) => key.startsWith("JD"))
        .reduce((obj, key) => {
          obj[key] = cr2[key];
          return obj;
        }, {})
    : {};



  return (
    <div className="main-content">
      <h1>RV Modeling App</h1>
      <AddDataSection />
      
      <Calculator />
      <CustomerVehicleForm />
      <TransactionsTable />
      <div className="graph">
        <JDTrendChart crData={jdData} />
      </div>
    </div>
  )
}

export default Homes;
