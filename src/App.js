import { useEffect,useState } from 'react';
import './App.css';
import AddDataSection from './Components/AddDataSection/AddDataSection';
import Calculator from './Components/Calculator/Calculator';
import CustomerVehicleForm from './Components/CustomerVehicleForm/CustomerVehicleForm';
import Navbar from './Components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  const [data,setData] = useState(null);
  console.log(data);
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
