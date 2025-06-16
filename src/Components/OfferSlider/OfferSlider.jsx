import React, { useEffect, useRef, useState } from 'react';
import './Style.css';

const OfferSlider = ({calculatorData,setCalculatorData,handleChange}) => {
  const rangeRef = useRef(null);
  

  useEffect(() => {
    const range = rangeRef.current;
    const greyColor = '#A7A7A7'; 
    const blueColor = '#001B4C';   
    const percent = (calculatorData.adjust_offer/ 100) * 100;

    range.style.background = `linear-gradient(
      to right,
      ${greyColor} ${percent}%,
      ${blueColor} ${percent}%
    )`;
  }, [calculatorData.adjust_offer]);

  return (
    <div className="slider-container">
      <label htmlFor="offerRange">Adjust Offer</label>
      <input
        type="range"
        id="offerRange"
        name='adjust_offer'
        min="0"
        max="100"
        value={calculatorData.adjust_offer }
        onChange={handleChange}
        ref={rangeRef}
      />
      <div id="rangeValue">{calculatorData.adjust_offer || 0}%</div>
    </div>
  );
};

export default OfferSlider;