import { useState, useEffect, useRef } from "react";
import "./style.css";
import OfferSlider from "../OfferSlider/OfferSlider";
import { useSelector } from "react-redux";
import { calculaterApi, msrpCalculationApi } from "../../Apis/calculatorApi";
import ResultModal from "../ResultModal/ResultModal";
import useIsMobile from "../../CustomHook/isMobile";
import Draggable from "react-draggable";
import useIntersectionObserver from "../../CustomHook/useIntersectionObserver";

const Calculator = () => {
  const data = useSelector((state) => state.allData.data);
  const isMobile = useIsMobile();

  // Ref for the MMR Adjustments section to detect visibility
  const mmrAdjustmentsRef = useRef(null);
  const isMmrSectionVisible = useIntersectionObserver(mmrAdjustmentsRef, {
    threshold: 0.5,
  });

  // --- FIX: Create a ref for the draggable node to avoid findDOMNode error ---
  const nodeRef = useRef(null);

  const [calculatorData, setCalculatorData] = useState({
    jd: "",
    fees: "",
    recon: "",
    recon_percent: "",
    transportation: "",
    fluctuation: "",
    adjust_offer: "",
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

  const [additionalFields, setAdditionalFields] = useState({
    back_of_jd: "",
    error_gap: "",
    sold_at_auction: "",
    customer_getting_jd: "",
  });

  const [msrp, setMsrp] = useState({
    msrp: "",
    adjustment: "",
  });

  // Helper: format number to 2 decimals
  const formatNumber = (num) => {
    return !isNaN(num) && num !== null && num !== undefined
      ? Number(num).toFixed(0)
      : "0.00";
  };

  // Helper: format currency with $ prefix, avoiding duplicate $
  const formatCurrency = (value, hasSignFromBackend = false) => {
    if (value === "" || value === null || value === undefined) return "$0.00";

    if (hasSignFromBackend) {
      if (typeof value === "string" && value.trim().startsWith("$"))
        return value;
      return `$${formatNumber(value)}`;
    }

    const valStr = value.toString();
    if (valStr.startsWith("$")) return valStr;
    return `$${formatNumber(value)}`;
  };

  const areAllFieldsFilled = (obj) => {
    return Object.values(obj).every(
      (val) => val !== "" && val !== null && val !== undefined
    );
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

    setInitialResult((prev) => ({
      ...prev,
      offer_after_recon: data?.offer_after_recon?.value ?? "",
      sold_at_auction: data?.sold_at_auction?.value ?? "",
      total_cost: data?.total_cost?.value ?? "",
      roi: data?.roi?.value ?? "",
      adjusted_offer_back_of_jd: data?.adjusted_offer_back_of_jd?.value ?? "",
      offer_auction_gap: data?.offer_auction_gap?.value ?? "",
      offer: data?.offer?.value ?? data?.fluctuation?.value ?? "",
    }));
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setCalculatorData((prev) => ({
      ...prev,
      jd: data?.wholesale_jd?.value ?? "",
      fees: data?.fees?.value ?? "",
      recon: data?.recon?.value ?? "",
      recon_percent: data?.recon_percent?.value ?? "",
      transportation: data?.transportation_cost?.value ?? "",
      fluctuation: data?.fluctuation?.value ?? "",
      adjust_offer: data?.adjusted_offer?.value ?? 0,
    }));
  }, [data]);

  useEffect(() => {
  if (!data) return;

  let msrpValue = data?.cr?.value?.MSRP;

  if (typeof msrpValue === "string") {
    msrpValue = msrpValue.replace(/^\$/, ""); // Remove leading $
  }

  const parsedValue = isNaN(Number(msrpValue)) ? "" : Number(msrpValue);

  setMsrp((prev) => ({
    ...prev,
    msrp: parsedValue,
  }));
}, [data]);

  useEffect(() => {
    if (!data) return;

    setAdditionalFields({
      back_of_jd: data?.back_of_jd?.value ?? "",
      error_gap: data?.error_gap?.value ?? "",
      sold_at_auction: data?.sold_at_auction?.value ?? "",
      customer_getting_jd: data?.customer_getting_jd?.value ?? "",
    });
  }, [data]);

  const hanldeMsrpChange = async (e) => {
    const { name, value } = e.target;

    setMsrp((prev) => ({ ...prev, [name]: value }));

    if (msrp.msrp || msrp.adjustment) {
      const formData = new FormData();
      formData.append("msrp", msrp.msrp);
      formData.append("adjustment", msrp.adjustment);

      try {
        await msrpCalculationApi(formData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setCalculation({});
  }, [data]);

  const handleClear = () => {
    setCalculatorData({
      jd: "",
      fees: "",
      recon: "",
      recon_percent: "",
      transportation: "",
      fluctuation: "",
      adjust_offer: 0,
      calculation_id: 1,
    });
    setCalculation({});
    setInitialResult({
      offer: "",
      offer_after_recon: "",
      sold_at_auction: "",
      total_cost: "",
      roi: "",
      adjusted_offer_back_of_jd: "",
      offer_auction_gap: "",
    });
    setMsrp({ msrp: "", adjustment: "" });
    setAdditionalFields({
      back_of_jd: "",
      error_gap: "",
      sold_at_auction: "",
      customer_getting_jd: "",
    });
  };

  const renderOfferRange = () => {
    const offerStart =
      calculation?.offer ?? data?.offer?.value ?? initialResult.offer ?? "";
    const offerEnd =
      calculation?.offer_after_recon ??
      data?.offer_after_recon?.value ??
      initialResult.offer_after_recon ??
      "";
    return `${formatCurrency(offerStart)} - ${formatCurrency(offerEnd)}`;
  };

  return (
    <div className="calculator-container">
      <div className="mmr-adjustments" ref={mmrAdjustmentsRef}>
        <div className="mmr-header">
          <div className="mmr-title">
            <h4>MMR Adjustments</h4>
            <p>Enter the value accordingly</p>
          </div>
          <div className="mmr-action" onClick={handleClear}>
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
              <label htmlFor="risk-factor-fluctuation">
                Risk Factor Fluctuation
              </label>
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
          <div className="extra-mmr-inputs">
            <div className="mmr-data-input">
              <label htmlFor="error-gap">Error Gap: Market Adjustment</label>
              <input
                type="number"
                id="error-gap"
                value={formatNumber(additionalFields.error_gap)}
                readOnly
              />
            </div>
            <div className="mmr-data-input ">
              <label htmlFor="percentage-of-jd">Customer getting % of JD</label>
              <input
                type="number"
                id="percentage-of-jd"
                value={formatNumber(additionalFields.customer_getting_jd)}
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
            <p>{renderOfferRange()}</p>
          </div>
          <div className="result">
            <h4>Target Range</h4>
            <p>
              {formatCurrency(
                calculation?.offer_after_recon ||
                  initialResult.offer_after_recon
              )}
            </p>
          </div>
          <div className="result">
            <h4>Projected Sale at Auction</h4>
            <p>
              {formatCurrency(
                calculation?.sold_at_auction || initialResult.sold_at_auction
              )}
            </p>
          </div>
          <div className="result">
            <h4>Unit Cost</h4>
            <p>
              {formatCurrency(
                calculation?.total_cost || initialResult.total_cost
              )}
            </p>
          </div>
          <div className="result">
            <h4>ROI</h4>
            <p>{formatNumber(calculation?.roi || initialResult.roi)}</p>
          </div>
          <div className="result">
            <h4>Back of JD</h4>
            <p>
              {formatCurrency(
                calculation?.adjusted_offer_back_of_jd ||
                  initialResult.adjusted_offer_back_of_jd
              )}
            </p>
          </div>
          <div className="result">
            <h4>Projected Profit</h4>
            <p>
              {formatCurrency(
                calculation?.offer_auction_gap ||
                  initialResult.offer_auction_gap
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
          <div className="mmr-data-input msrp-input">
            <label htmlFor="msrp-list-price">MSRP/Suggested List Price</label>
            <div className="input-with-prefix">
              <input
                type="number"
                id="msrp-list-price"
                value={msrp.msrp || ""}
                name="msrp"
                onChange={hanldeMsrpChange}
                step="0.01"
              />
            </div>
          </div>
          <div className="mmr-data-input">
            <label htmlFor="adjustment">Adjustment</label>
            <input
              type="number"
              id="adjustment"
              onChange={hanldeMsrpChange}
              name="adjustment"
              value={msrp.adjustment ?? ""}
            />
          </div>
        </div>
      </div>

      {/* --- UPDATED DRAGGABLE MODAL IMPLEMENTATION --- */}
      {areAllFieldsFilled(calculatorData) &&
        isMobile &&
        isMmrSectionVisible && (
          <Draggable
            handle=".drag-handle"
            nodeRef={nodeRef} // Pass the ref to Draggable to prevent findDOMNode error
          >
            {/* Attach the same ref to the direct child element */}
            <div ref={nodeRef} className="draggable-modal-wrapper">
              <ResultModal
                renderOfferRange={renderOfferRange}
                formatCurrency={formatCurrency}
                calculation={calculation}
                formatNumber={formatNumber}
                initialResult={initialResult}
              />
            </div>
          </Draggable>
        )}
    </div>
  );
};

export default Calculator;
