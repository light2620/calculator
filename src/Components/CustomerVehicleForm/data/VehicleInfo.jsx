import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';

const VehicleInfo = () => {
  const [vehicleData,setVehicleData] = useState([
  { label: 'year', value: '' },
  { label: 'make', value: '' },
  { label: 'series', value: '' },
  { label: 'trimModel', value: '' },
  { label: 'miles', value: '' },
  { label: 'csMiles', value: '' },
  { label: 'engine', value: '' },
  { label: 'engineLightsOn', value: '' },
  { label: 'bookRange', value: '' },
  { label: 'wholesaleJD', value: '' },
  { label: 'retailJD', value: '' },
  { label: 'msrp', value: '' },
  { label: 'transportationCost', value: '' },
  { label: 'distance', value: '' },
  { label: 'estimatedPayoff', value: '' },
  { label: 'csEstimatedPayoff', value: '' }
]);
const data = useSelector((state) => state.allData.data);
useEffect(() => {
   
  setVehicleData(prev =>
    prev.map((field) => {
      switch (field.label) {
        case "year": 
          return {...field,value : data?.vehicle_year?.value}
          case "make" : 
          return {...field,value : data?.make?.value}
            case "series" : 
          return {...field,value: data?.series?.value}
          case "trimModel" : 
          return {...field,value: data?.trim_model_number?.value}
          case "miles" : 
          return {...field,value: data?.current_mileage_motorhome?.value}
          case "csMiles" : 
          return {...field,value: data?.motorhome_current_mileage_cs?.value}
          case "engine" : 
          return {...field,value: data?.motorhome_engine_type_cs?.value}
          case "engineLightsOn" : 
          return {...field,value: data?.motorhome_engine_issues_cs?.value}
          case "bookRange" : 
          return {...field,value: data?.our_book_range?.value}
          case "retailJD" : 
          return {...field,value: data?.retail_jd?.value}
          case "wholesaleJD" : 
          return {...field,value: data?.wholesale_jd?.value}
          case "msrp" : 
          return {...field,value: data?.msrp?.value}
          case "transportationCost" : 
          return {...field,value: data?.transportation_cost?.value}
          case "distance" : 
          return {...field,value: data?.distance?.value}
          case "estimatedPayoff" : 
          return {...field,value: data?.estimated_payoff?.value}
          case "csEstimatedPayoff" : 
          return {...field,value: data?.rv_estimated_payoff_cs?.value}
        default:
          return field;
      }
    })
  );

},[data])
  return (
    <div className="card">
      {vehicleData.map((field, index) => (
        <div className="fields" key={index}>
          <label>
            {field.label
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())}
          </label>
          <p>{field.value ? field.value : ""}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleInfo;
