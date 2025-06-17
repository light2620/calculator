import React from 'react'
import "./style.css"
import { useEffect } from 'react'
import AddDataSection from '../../Components/AddDataSection/AddDataSection'
import CustomerVehicleForm from '../../Components/CustomerVehicleForm/CustomerVehicleForm'
import Calculator from '../../Components/Calculator/Calculator'
import TransactionsTable from '../../Components/Tranaction/Transaction'
import JDTrendChart from '../../Components/Graph/Graph'
import axiosInstance from '../../AxiosInstance/AxiosInstance'
import { useSelector } from 'react-redux'
const Homes = () => {
     const { user } = useSelector((state) => state.user);
const cr = {
  value: {
    "JD 23": "$41,400",
    "JD 2020": "$32,300",
    "JD 2019": "$29,000",
    "JD 2018": "$27,000",
    "JD 2017": "$25,000",
    "JD 2016": "$23,000",
    "JD 2015": "$21,000",
    "JD 2014": "$19,000",
    "JD 2013": "$17,000",
    "JD 2012": "$15,000",
    "JD 2011": "$12,000",
    // Add more JD entries as needed
  },
};
   useEffect(() => {
     
    console.log(user)
    console.log();

   },[user])
  return (
     <div className="main-content">
        <h1>RV Modeling App</h1>
        <AddDataSection  />
        <CustomerVehicleForm />
        <Calculator />
        <TransactionsTable />
        <div className="graph">
        <JDTrendChart crData={cr.value} />
        </div>

      </div>
  )
}

export default Homes
