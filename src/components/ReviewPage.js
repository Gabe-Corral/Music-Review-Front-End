import React from 'react';

const ReviewPage = (props) => {
  return (
    <div className="review-page-container">
    <div className="review-page-header">
    <div className="center">
      <img alt="cover-art" src={props.currentReview.img} />
      </div>
      <div className="review-header-contents">
      <h2>{props.currentReview.title}</h2>
      <h3>{props.currentReview.artist}</h3>
      <h3>{props.currentReview.rating}/10</h3>
      </div>
      <div className="full-review">
      {props.currentReview.review}
      </div>
    </div>

    </div>
  )
}
export default ReviewPage;
