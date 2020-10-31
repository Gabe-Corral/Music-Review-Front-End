import React from 'react';
import { withRouter } from 'react-router-dom';
const url = "http://localhost:3000";

class EditReview extends React.Component {

  constructor() {
    super();
    this.state = {
      review: "",
      submitted: false,
      subReview: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    this.setState({ review: this.props.currentReview.review })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      rating: e.target.rating.value,
      artist: e.target.artist.value,
      title: e.target.title.value,
      img: e.target.artwork.value,
      release_date: e.target.release_date.value,
      review: this.state.review
    }

    fetch(`${url}/review/${this.props.currentReview.id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(newReview)
    })
    this.props.history.push('/reviews');
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ review: e.target.value })
  }

  render() {
    const review = this.props.currentReview;
    return (
      <div className="write-container">
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="artist" defaultValue={review.artist}/>
        <input type="text" name="title" defaultValue={review.title}/>
        <input type="number" name="rating" defaultValue={review.rating}/>
        <input type="text" name="artwork" defaultValue={review.img}/>
        <input type="number" name="release_date" defaultValue={review.release_date}/>
        <textarea value={this.state.value} onChange={this.handleChange}
        defaultValue={review.review}/>
        <button type="submit">Submit</button>
      </form>

      </div>
    )
  }
}

export default withRouter(EditReview);
