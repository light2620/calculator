// ResultModal.js

import "./style.css"

export default function ResultModal({formatNumber, renderOfferRange,formatCurrency,calculation,initialResult}){
    return (
      // The class has been changed to better reflect its new role
      <div className="mobile-results-modal">
        {/* This header will be our drag handle */}
        <div className="mobile-results-header drag-handle">
          <h4>Results</h4>
          <p>Here are the Results based on your inputs</p>
        </div>

        <div className="mobile-result-calculations">
          <div className="result">
            <h4>Offer Range</h4>
            <p>{renderOfferRange()}</p>
          </div>
          <div className="result">
            <h4>Target Range</h4>
            <p>{formatCurrency(calculation?.offer_after_recon || initialResult.offer_after_recon)}</p>
          </div>
          <div className="result">
            <h4>Projected Sale at Auction</h4>
            <p>{formatCurrency(calculation?.sold_at_auction || initialResult.sold_at_auction)}</p>
          </div>
          <div className="result">
            <h4>Unit Cost</h4>
            <p>{formatCurrency(calculation?.total_cost || initialResult.total_cost)}</p>
          </div>
          <div className="result">
            <h4>ROI</h4>
            <p>{formatNumber(calculation?.roi || initialResult.roi)}</p>
          </div>
          <div className="result">
            <h4>Projected Profit</h4>
            <p>{formatCurrency(calculation?.offer_auction_gap || initialResult.offer_auction_gap)}</p>
          </div>
        </div>
      </div>
    )
}