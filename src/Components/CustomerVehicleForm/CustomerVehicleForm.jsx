import "./style.css"
import { useState } from "react";
import vehicleInfoFields from "../../utils/VehicleInfo";
import VehicleInfo from "./data/VehicleInfo";
import CustomerHistory from "./data/CustomerHistory";
import VehiclePhotos from "./data/VehiclePhotos";
import VehicleHistory from "./data/VehicleHistory/VehicleHistory";
const CustomerVehicleForm = ({data}) => {

    const [tabOptions,setTabOptions] = useState( [
        {active : true, label : "Vehicle Info"},
        {active : false, label : "Customer History"},
        {active : false, label : "Vehicle Photos"},
        {active: false, label : "Vehicle History"}
    ]);


    function switchTab(index){
        const newTabOptions = tabOptions.map((option, i) => ({
            ...option,
            active: i === index
        }));
        setTabOptions(newTabOptions);

    }
  return (
    <div className="tabs-container">
        <div className="tabs-options">
       <div className="tabs">
            {tabOptions.map((option, index) => (
                <div 
                key={index} 
                className={`tab-option  ${option.active ? 'active' : ''}`}
                onClick={() => switchTab(index)}
                >
                
                    {option.label}
                </div>
            ))}
         </div>
         <div className="tabs-bottom-border"></div>
        </div>
         
         <div className="tab-content">
           {tabOptions[0].active && <VehicleInfo data={data} />}
           {tabOptions[1].active && <CustomerHistory data={data}/>}
           {tabOptions[2].active && <VehiclePhotos data={data}/>}
           {tabOptions[3].active && <VehicleHistory data={data}/>}
        </div>
    </div>
  )
}

export default CustomerVehicleForm
