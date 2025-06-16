import { useState,useEffect } from "react";
import "./style.css"
import OfferSlider from '../OfferSlider/OfferSlider'
import { useSelector } from 'react-redux';
import { calculaterApi } from "../../Apis/calculatorApi";
const Calculator = () => {
     const data = useSelector((state) => state.allData.data);
     const [calculatorDataFromApi,setCalculatorDataFromApi] = useState({
       jd : "",
         fees : "",
         recon : "",
         recon_percent: "",
         transportation : "",
         fluctuation : "",
         adjust_offer : 0,
         calculation_id : 1
     })
     const [calculatorData,setCalculatorData] = useState({
         jd : "",
         fees : "",
         recon : "",
         recon_percent: "",
         transportation : "",
         fluctuation : "",
         adjust_offer : 0,
         calculation_id : 1
     })
     const [calculation,setCalculation] = useState({});
     const areAllFieldsFilled = (obj) => {
  return Object.values(obj).every(val => val !== "" && val !== null && val !== undefined);
};
    const handleChange = async (e) => {
  const { name, value } = e.target;

  const updatedData = {
    ...calculatorData,
    [name]: value
  };

  setCalculatorData(updatedData);
 console.log(updatedData);
  if (areAllFieldsFilled(updatedData)) {
    try {
      const response = await calculaterApi(updatedData);
      setCalculation(response.data[0]);
      console.log("API response:", response);
  
    } catch (error) {
      console.error("API call failed:", error);
    }
  }
};


  useEffect(() => {
    if (!data) return;

    setCalculatorData((prev) => {
      const updated = { ...prev };

      for (const key in updated) {
        console.log(key)
        switch (key) {
          case "jd":
            updated[key] = data?.wholesale_jd?.value;
            break;
          case "fees":
            updated[key] = data?.fees?.value ;
            break;
          case "recon":
            updated[key] = data?.recon?.value ;
            break;
          case "recon_percent":
            updated[key] = data?.recon_percent?.value ;
            break;
          case "projectedBookChange":
            updated[key] = data?.projected_book_change?.value;
            break;
          case "transportation":
            updated[key] = data?.transportation_cost?.value;
            break;
          case "fluctuation":
            updated[key] = data?.fluctuation?.value;
            break;
          case "adjust_offer":
            updated[key] = data?.adjusted_offer?.value;
            break;
          default:
            break;
        }
      }

      return updated;
    });
  }, [data]);
  return (
   <div className="calculator-container">

  <div className="mmr-adjustments">
    <div className="mmr-header">
        <div className="mmr-title">
           <h4>MMR Adjustments</h4>
           <p>Enter the value accordingly</p>
        </div>

        <div className="mmr-action">
            <p>Clear</p>
        </div>
    </div>

    <div className="mmr-fields">
        
        
         <div className= "mmr-inputs">

            <div className="mmr-data-input">
                <label htmlFor="wholesale-jd">Wholesale JD</label>
                <input type="number" id="wholesale-jd" name="jd" value={calculatorData.jd} onChange={handleChange}  />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="fees">Fees</label>
                <input type="number" id="fees" name="fees" value={calculatorData.fees} onChange={handleChange} />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="recon-amount">Recon Amount</label>
                <input type="number" id="recon-amount" name="recon" value={calculatorData.recon} onChange={handleChange} />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="precon_percent">Projected Book Change %</label>
                <input type="number" id="recon_percent" name="recon_percent" value={calculatorData.recon_percent} onChange={handleChange} />
            </div>
            <div className="mmr-data-input">
                <label htmlFor="transportation-cost">Transportation Cost</label>
                <input type="number" id="transportation-cost" name="transportation" value={calculatorData.transportation} onChange={handleChange} />
            </div>
            <div className="mmr-data-input">
                <label htmlFor="risk-factor-fluctuation">Risk Factor Fluctuation</label>
                <input type="number" id="risk-factor-fluctuation"  name="fluctuation" value={calculatorData.fluctuation} onChange={handleChange}  />
            </div>
         </div>

        <OfferSlider calculatorData={calculatorData} setCalculatorData={setCalculatorData} handleChange={handleChange} />

         <div className="divider"></div>

         <div className="mmr-inputs">
             <div className="mmr-data-input">
                <label htmlFor="back-of-jd">Back of JD</label>
                <input type="number" id="back-of-jd"  />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="error-gap">Error Gap: Market Adjustment</label>
                <input type="number" id="error-gap" />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="sold-auction">Sold at Auction</label>
                <input type="number" id="sold-auction" />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="percentage-of-jd">Customer getting % of JD</label>
                <input type="number" id="percentage-of-jd" />
            </div>
         </div>


    </div>
  </div>


     <div className="results-container">
          <div className="results-header">
              <h4>Results</h4>
              <p>Here are the Results based on your inputs</p>
          </div>

          <div className="result-calculations">
              
              <div className="result">
                  <h4>Offer Range</h4>
                  <p>{calculation?.offer_after_recon || "-"}</p>
              </div>

              <div className="result">
                  <h4>Target Range</h4>
                  <p>$11,000</p>
              </div>
              <div className="result">
                  <h4>Projected Sale at Auction</h4>
                  <p>$13,320</p>
              </div>
              <div className="result">
                  <h4>Unit Cost</h4>
                  <p>{calculation?.total_cost || "-"}</p>
              </div>
              <div className="result">
                  <h4>ROI</h4>
                  <p>{calculation?.roi || "-"}</p>
              </div>
              <div className="result">
                  <h4>Back of JD</h4>
                  <p>{calculation?.adjusted_offer_back_of_jd || "-"}</p>
              </div>
              <div className="result">
                  <h4>Projected Profit</h4>
                  <p>{calculation?.offer_auction_gap || "-"}</p>
              </div>

          </div>
    </div>
  <div className="msrp-calculation-container">
    
        <div className="msrp-header">
            <h4>MSRP Calculation</h4>
        </div>

        <div className= "mmr-inputs">
            <div className="mmr-data-input">
                <label htmlFor="msrp-list-price">MSRP/Suggested List Price</label>
                <input type="number" id="msrp-list-price"  />
            </div>

            <div className="mmr-data-input">
                <label htmlFor="adjustment">Adjustment</label>
                <input type="number" id="adjustment" />
            </div>
        </div>
  </div>
</div>
  )
}

export default Calculator
