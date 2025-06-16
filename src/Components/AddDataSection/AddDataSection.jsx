import { useState,useEffect } from "react";
import axiosInstance from "../../AxiosInstance/AxiosInstance";
import "./style.css";
import { useDispatch } from "react-redux";
import { setAllData } from "../../Redux/allDataSlice";
import { useSelector } from 'react-redux';
const AddDataSection = () => {
  const [email, setEmail] = useState("opa.gee@gmail.com");
  const dispatch = useDispatch();
  const [dataFields,setDataFields] = useState([
    { label: "Year", value: "" },
    { label: "Make", value: "" },
    { label: "Series", value: "" },
    { label: "Trim/Model", value: "" },
    { label: "Retail JD", value: "" },
    { label: "Wholesale JD", value: "" },
    { label: "MSRP/Suggested Retail Price", value: "" },
  ]);
   const data = useSelector((state) => state.allData.data);

  const handleFileUpload = async (selectedFile) => {
  if (!selectedFile) return;


  const formData = new FormData();
  formData.append("jd", selectedFile);

  try {
    const response = await axiosInstance.post("process-document/", formData);
    dispatch(setAllData(response.data));
     
  } catch (err) {
    console.error("Upload failed (file):", err.response?.data || err.message);
  }
};


  const handleSubmit = async () => {
    if (!email) {
      alert("Please provide either email OR file.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axiosInstance.post("process-document/", formData);
       dispatch(setAllData(response.data));

    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    console.log(data);
    setDataFields(prev => 
      prev.map(field => {
        switch(field.label){
          case "Year": 
          return {...field,value : data?.vehicle_year?.value}
          case "Make" : 
          return {...field,value : data?.make?.value}
          case "Series" : 
          return {...field,value: data?.series?.value}
          case "Trim/Model" : 
          return {...field,value: data?.trim_model_number?.value}
          case "Retail JD" : 
          return {...field,value: data?.retail_jd?.value}
          case "Wholesale JD" : 
          return {...field,value: data?.wholesale_jd?.value}
          case "MSRP/Suggested Retail Price" : 
          return {...field,value: data?.msrp?.value}
          default : 
        return field;
        }
        
      })
    )
  },[data])

  return (
    <div className="add-data-container">
      <div className="data-input-section">
        <div className="input-container">
          <p>Pick your data point</p>
          <div className="action-container">
            <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button 
          disabled={email === ""}
          onClick={handleSubmit}>Submit</button>
          </div>
          
        </div>
        
        <hr />

        <div className="upload-section">
          <label htmlFor="jd-upload" className="upload-label">Upload JD</label>
          <input
            type="file"
            id="jd-upload"
            accept="application/pdf"
            className="upload-input"
           onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </div>
      </div>

      <div className="data">
        {dataFields.map((field, id) => (
          <div className="data-item" key={id}>
            <p>{field.label}</p>
            <div className="info">
              <p>{field.value ? field.value : "-"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDataSection;
