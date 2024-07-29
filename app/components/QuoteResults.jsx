// components/QuoteResult.jsx
import React from "react";

const QuoteResult = ({ totalCost }) => {
  return (
    <div className="quote-result">
      <h2>Costo Total</h2>
      <p>${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default QuoteResult;
