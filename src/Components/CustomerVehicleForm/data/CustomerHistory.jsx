import React, { useEffect,useState } from 'react';
import './style.css';
import { useSelector } from 'react-redux';

const CustomerHistory = () => {
    const data = useSelector((state) => state.allData.data);
    const [customerHistoryData ,setCustomerHistoryData] = useState([
  { label: "fullName", value: "" },
  { label: "email", value: "email" },
  { label: "phoneNumber #", value: "" },
  { label: "city", value: "" },
  { label: "state", value: "" },
  { label: "makingPayment", value: "" },
  { label: "utm_campaign", value: "" },
  { label: "utm_keyword", value: "" },
  { label: "utm_source", value: "" },
  { label: "utm_medium", value: "" },
  { label: "utm_content", value: "" }
])
    useEffect(() => {
  if (!data) return;

  setCustomerHistoryData(prev =>
    prev.map(field => {
      switch (field.label) {
        case "fullName":
          return { ...field, value: data?.name?.value || "" };
        case 'email':
           return {...field, value : data?.email?.value || ""};
        case 'phoneNumber':
           return {...field, value : data?.phone?.value || ""};
        case 'city':
           return {...field, value : data?.lead_city?.value || ""};
         case 'state':
           return {...field, value : data?.lead_state?.value || ""};
         case 'makingPayment':
           return {...field, value : data?.paid_or_payments?.value || ""};
         case 'utm_campaign':
           return {...field, value : data?.utm_campaign?.value || ""};
         case 'utm_keyword':
           return {...field, value : data?.utm_keyword?.value || ""};
         case 'utm_source':
           return {...field, value : data?.utm_source?.value || ""};
         case 'utm_medium':
           return {...field, value : data?.utm_medium?.value || ""};
         case 'utm_content':
           return {...field, value : data?.utm_content?.value || ""};
        default:
          return field;
      }
    })
  );
}, [data]);
    
  return (
    <div className="customer-history-card">
      {customerHistoryData.map((field, index) => (
        <div className="fields" key={index}>
          <label>
            {field.label
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())}
          </label>
          <p>{field.value || ""}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerHistory;
