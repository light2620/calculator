import React, { useState,useEffect} from 'react';
import './style.css';
import { useSelector } from 'react-redux';
const VehicleHistory = () => {
  const [vehicleHistoryData,setVehicleHistoryData] = useState([
    { label: "Lead Date", value: "-" },
    { label: "CS Date", value: "-" },
    { label: "Appraisal Date", value: "-" },
    { label: "Vehicle Type", value: "-" },
    { label: "Category", value: "-" },
    { label: "Source", value: "-" },
    { label: "Customer Info", value: "-" },
    { label: "Year", value: "-" },
    { label: "Make", value: "-" },
    { label: "Series", value: "-" },
    { label: "Model", value: "-" },
    { label: "Length in Feet", value: "-" },
    { label: "Width in Feet", value: "-" },
    { label: "Number of Slides", value: "-" },
    { label: "Miles", value: "-" },
    { label: "Book Range", value: "-" },
    { label: "MSRP", value: "-" },
    { label: "Reconditioning Notes", value: "" }
  ]);
   const data = useSelector((state) => state.allData.data);

  // Field labels used for categorizing layout
  const leftFields = ["Lead Date", "CS Date", "Appraisal Date"];
  const bottomFields = ["Book Range", "MSRP"];
  const notesField = "Reconditioning Notes";

  // Filter helpers
  const getFields = (labels) => vehicleHistoryData.filter(item => labels.includes(item.label));
  const getNotes = (label) => vehicleHistoryData.find(item => item.label === label);
  const getRemaining = () => {
    const excluded = [...leftFields, ...bottomFields, notesField];
    return vehicleHistoryData.filter(item => !excluded.includes(item.label));
  };

  const leftColumn = getFields(leftFields);
  const bottomRow = getFields(bottomFields);
  const notes = getNotes(notesField);
  const gridFields = getRemaining();

   useEffect(() => {
  
    setVehicleHistoryData(prev =>
      prev.map(field => {
        switch (field.label) {
          case "Lead Date":
            return { ...field, value: data?.vehicle_type?.value  };
          case "Vehicle Type":
            return { ...field, value: data?.vehicle_type?.value  };
          case "Vehicle Type":
            return { ...field, value: data?.vehicle_type?.value  };
          case 'Year':
             return {...field, value : data?.vehicle_year?.value };
          case 'Book Range':
             return {...field, value : data?.our_book_range?.value };
          case 'Make':
             return {...field, value : data?.make?.value };
           case 'Series':
             return {...field, value : data?.series?.value };
           case 'Model':
             return {...field, value : data?.trim_model_number?.value };
           case 'Customer Info':
             return {...field, value : data?.name?.value };
           case 'Source':
             return {...field, value : data?.utm_source?.value };
          default:
            return field;
        }
      })
    );
  }, [data]);

  return (
    <div className="vehicle-history-card">
      <h3 className="section-title">Vehicle History</h3>

      <div className="vehicle-history-container">
        <div className="left-column">
          {leftColumn.map((item, i) => (
            <div className="form-group" key={i}>
              <label>{item.label}</label>
              <p>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="right-grid">
          {gridFields.map((item, i) => (
            <div className="form-group" key={i}>
              <label>{item.label}</label>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-row">
        {bottomRow.map((item, i) => (
          <div className="form-group" key={i}>
            <label>{item.label}</label>
            <p>{item.value}</p>
          </div>
        ))}
        {notes && (
          <div className="form-group full-width">
            <label>{notes.label}</label>
            <textarea readOnly>{notes.value}</textarea>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleHistory;
