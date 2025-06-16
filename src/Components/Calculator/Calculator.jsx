import { useState, useEffect } from "react";
import "./style.css";
import OfferSlider from "../OfferSlider/OfferSlider";
import { useSelector } from "react-redux";
import { calculaterApi } from "../../Apis/calculatorApi";
import { msrpCalculationApi } from "../../Apis/calculatorApi";
const Calculator = () => {
  const data = useSelector((state) => state.allData.data);

  const [calculatorData, setCalculatorData] = useState({
    jd: "",
    fees: "",
    recon: "",
    recon_percent: "",
    transportation: "",
    fluctuation: "",
    adjust_offer: 0,
    calculation_id: 1,
  });

  const [calculation, setCalculation] = useState({});
  const [initialResult, setInitialResult] = useState({
    offer: "",
    offer_after_recon: "",
    sold_at_auction: "",
    total_cost: "",
    roi: "",
    adjusted_offer_back_of_jd: "",
    offer_auction_gap: "",
  });

  const [msrp,setMsrp] = useState({
    msrp: "",
    adjustment: ""
  });

  const areAllFieldsFilled = (obj) => {
    return Object.values(obj).every(
      (val) => val !== "" && val !== null && val !== undefined
    );
  };

  const formatNumber = (num) => {
    return !isNaN(num) && num !== null && num !== undefined
      ? Number(num).toFixed(2)
      : "-";
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...calculatorData,
      [name]: value,
    };

    setCalculatorData(updatedData);

    if (areAllFieldsFilled(updatedData)) {
      try {
        const response = await calculaterApi(updatedData);
        setCalculation(response.data);
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  useEffect(() => {
    if (!data) return;

    setInitialResult((prev) => {
      const updated = { ...prev };
      updated.offer_after_recon = data?.offer_after_recon?.value;
      updated.sold_at_auction = data?.sold_at_auction?.value;
      updated.total_cost = data?.total_cost?.value;
      updated.roi = data?.roi?.value;
      updated.adjusted_offer_back_of_jd = data?.adjusted_offer_back_of_jd?.value;
      updated.offer_auction_gap = data?.offer_auction_gap?.value;
      updated.offer = data?.fluctuation?.value;
      return updated;
    });
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setCalculatorData((prev) => {
      const updated = { ...prev };
      updated.jd = data?.wholesale_jd?.value;
      updated.fees = data?.fees?.value;
      updated.recon = data?.recon?.value;
      updated.recon_percent = data?.recon_percent?.value;
      updated.transportation = data?.transportation_cost?.value;
      updated.fluctuation = data?.fluctuation?.value;
      updated.adjust_offer = data?.adjusted_offer?.value;
      return updated;
    });
  }, [data]);

    useEffect(() => {
    if (!data) return;

    setMsrp((prev) => ({
      ...prev,[msrp] : data?.msrp?.value
    }));
  }, [data]);

  const hanldeMsrpChange = async(e)=> {
       const {name,value} = e.target;

        setMsrp((prev) => {
          return {...prev,[name]: value};
        });
        const formData = new FormData();
       formData.append("msrp", msrp.msrp);
       formData.append("adjustment", msrp.adjustment);
       if(msrp.msrp || msrp.adjustment){
         try{
           const response = await msrpCalculationApi(formData);
           console.log(response);
        }catch(err){
          console.log(err);
        }
       }
       
  }
  useEffect(() => {
    setCalculation({});
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
          <div className="mmr-inputs">
            <div className="mmr-data-input">
              <label htmlFor="wholesale-jd">Wholesale JD</label>
              <input
                type="number"
                id="wholesale-jd"
                name="jd"
                value={calculatorData.jd}
                onChange={handleChange}
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="fees">Fees</label>
              <input
                type="number"
                id="fees"
                name="fees"
                value={calculatorData.fees}
                onChange={handleChange}
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="recon-amount">Recon Amount</label>
              <input
                type="number"
                id="recon-amount"
                name="recon"
                value={calculatorData.recon}
                onChange={handleChange}
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="precon_percent">Projected Book Change %</label>
              <input
                type="number"
                id="recon_percent"
                name="recon_percent"
                value={calculatorData.recon_percent}
                onChange={handleChange}
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="transportation-cost">Transportation Cost</label>
              <input
                type="number"
                id="transportation-cost"
                name="transportation"
                value={calculatorData.transportation}
                onChange={handleChange}
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="risk-factor-fluctuation">Risk Factor Fluctuation</label>
              <input
                type="number"
                id="risk-factor-fluctuation"
                name="fluctuation"
                value={calculatorData.fluctuation}
                onChange={handleChange}
              />
            </div>
          </div>

          <OfferSlider
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
            handleChange={handleChange}
          />

          <div className="divider"></div>

          <div className="mmr-inputs">
            <div className="mmr-data-input">
              <label htmlFor="back-of-jd">Back of JD</label>
              <input
                type="number"
                value={data?.back_of_jd?.value || ""}
                id="back-of-jd"
                readOnly
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="error-gap">Error Gap: Market Adjustment</label>
              <input
                type="number"
                id="error-gap"
                value={data?.error_gap?.value || ""}
                readOnly
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="sold-auction">Sold at Auction</label>
              <input
                type="number"
                id="sold-auction"
                value={data?.sold_at_auction?.value || ""}
                readOnly
              />
            </div>

            <div className="mmr-data-input">
              <label htmlFor="percentage-of-jd">Customer getting % of JD</label>
              <input
                type="number"
                id="percentage-of-jd"
                value={data?.customer_getting_jd?.value || ""}
                readOnly
              />
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
            <p>{formatNumber(calculation?.offer || initialResult.offer)}</p>
          </div>

          <div className="result">
            <h4>Target Range</h4>
            <p>
              {formatNumber(
                calculation?.offer_after_recon || initialResult.offer_after_recon
              )}
            </p>
          </div>

          <div className="result">
            <h4>Projected Sale at Auction</h4>
            <p>
              {formatNumber(
                calculation?.sold_at_auction || initialResult.sold_at_auction
              )}
            </p>
          </div>

          <div className="result">
            <h4>Unit Cost</h4>
            <p>{formatNumber(calculation?.total_cost || initialResult.total_cost)}</p>
          </div>

          <div className="result">
            <h4>ROI</h4>
            <p>{formatNumber(calculation?.roi || initialResult.roi)}</p>
          </div>

          <div className="result">
            <h4>Back of JD</h4>
            <p>
              {formatNumber(
                calculation?.adjusted_offer_back_of_jd ||
                  initialResult.adjusted_offer_back_of_jd
              )}
            </p>
          </div>

          <div className="result">
            <h4>Projected Profit</h4>
            <p>
              {formatNumber(
                calculation?.offer_auction_gap || initialResult.offer_auction_gap
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="msrp-calculation-container">
        <div className="msrp-header">
          <h4>MSRP Calculation</h4>
        </div>

        <div className="mmr-inputs">
          <div className="mmr-data-input">
            <label htmlFor="msrp-list-price">MSRP/Suggested List Price</label>
            <input type="number" id="msrp-list-price" value={msrp.msrp} name="msrp" onChange={hanldeMsrpChange} />
          </div>

          <div className="mmr-data-input">
            <label htmlFor="adjustment">Adjustment</label>
            <input type="number" id="adjustment" onChange={hanldeMsrpChange} name="adjustment" value={msrp.adjustment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
