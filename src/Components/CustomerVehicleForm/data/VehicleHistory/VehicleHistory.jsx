import React, { useState,useEffect} from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import useIsMobile from '../../../../CustomHook/isMobile';
const VehicleHistory = () => {
  const [vehicleHistoryData,setVehicleHistoryData] = useState([
    { label: "Lead Date", value: "" },
    { label: "CS Date", value: "" },
    { label: "Appraisal Date", value: "" },
    { label: "Vehicle Type", value: "" },
    { label: "Category", value: "" },
    { label: "Source", value: "" },
    { label: "Customer Info", value: "" },
    { label: "Year", value: "" },
    { label: "Make", value: "" },
    { label: "Series", value: "" },
    { label: "Model", value: "" },
    { label: "Length in Feet", value: "" },
    { label: "Width in Feet", value: "" },
    { label: "Number of Slides", value: "" },
    { label: "Miles", value: "" },
    { label: "Book Range", value: "" },
    { label: "MSRP", value: "" },
    { label: "Reconditioning Notes", value: "" }
  ]);
   const data = useSelector((state) => state.allData.data);
    const isMobile = useIsMobile()
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
            return { ...field, value: data?.cr?.value["Deal Date"]  };
          case "Vehicle Type":
            return { ...field, value: data?.cr?.value["Type"]  };
          case "Category":
            return { ...field, value: data?.cr?.value["Category"]  };
          case 'Source':
             return {...field, value : data?.cr?.value["Source"] };
          case 'Customer Info':
             return {...field, value : data?.cr?.value["Customer"]  };
          case 'CS Date':
             return {...field, value : data?.cr?.value["CR Date"] };
           case 'Year':
             return {...field, value : data?.cr?.value["Year"] };
           case 'Make':
             return {...field, value : data?.cr?.value["Make"] };
           case 'Series':
             return {...field, value : data?.cr?.value["Series"] };
           case 'Model':
             return {...field, value : data?.cr?.value["Model"] };
           case 'Appraisal Date':
             return {...field, value : data?.cr?.value["Appraisal Date"]};
             case 'Length in Feet':
             return {...field, value : data?.cr?.value["Length in Feet"] }
             case 'Length in Feet':
             return {...field, value : data?.cr?.value["Appraisal Date"] }
             case 'Width in Feet':
             return {...field, value : data?.cr?.value["Width in Feet"] }
             case 'Number of Slides':
             return {...field, value : data?.cr?.value["Number of Slides"] }
             case 'Miles':
             return {...field, value : data?.cr?.value["Miles"] }
             case 'Book Range':
             return {...field, value : data?.cr?.value["Book Range"] }
             case 'MSRP':
             return {...field, value : data?.cr?.value["MSRP"] }
             case 'Reconditioning Notes':
             return {...field, value : data?.cr?.value["Reconditioning"] }

          default:
            return field;
        }
      })
    );
  }, [data]);

  return (
    <div className="vehicle-history-card">


      <h3 className="section-title">Vehicle History</h3>
  { !isMobile ? <div>
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
            <textarea readOnly value={notes.value}>{notes.value}</textarea>
          </div>
        )}
      </div>

  </div> : (
       
         <div className="fields-container">
          {vehicleHistoryData.map((field, index) => (
         
            <div className="fields" key={index}>
              <label>
                {field.label}
              </label>
              <p>{field.value ? field.value : ""}</p>
            </div>
           
          ))}
           </div>
      
      )}
      

    </div>
  );
};

export default VehicleHistory;
