import React, { useState, useEffect } from 'react';
import Comments from './Comments'
import Tracks from './Tracks'
import { useHistory } from 'react-router-dom';

const ReviewPage = (props) => {
  const [comments, setComments] = useState();
  const [commentForm, setCommentForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState();
  const history = useHistory();
  const url = "http://localhost:3000";
  const review = JSON.parse(localStorage.getItem("currentReview")).currentReview;

  useEffect(() => {
    if (loading) {
      const id = review.id;
      fetch(`${url}/getcomments/${id}`)
        .then(res => res.json())
        .then(comments => setComments(comments))

      fetch(`${url}/getuserinfo/${id}`)
      .then(res => res.json())
      .then(author => setAuthor(author))
    }
    setLoading(false);
  }, [loading, setLoading, review.id])

  const handleClick = () => {
    const artist = review.artist.split(" ").join("").toLowerCase();
    history.push(`/artist/${artist}`);
    props.setCurrentArtist(review.artist);
  }

  const handleComment = () => {
    setCommentForm(!commentForm);
  }

  const handlePostComment = (e) => {
    e.preventDefault()
    fetch(`${url}/comment`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        user_id: props.user.id,
        review_id: review.id,
        username: props.user.username,
        comment: e.target.comment.value
      })
    })
    setLoading(true);
  }

  const handleEdit = () => {
    history.push(`/review/${review.id}`)
  }

  const handleDelete = () => {
    fetch(`${url}/review/${review.id}`, {
      method: 'DELETE'
    })
    history.push(`username/${props.user.username}`)
  }

  const handleUserProfile = () => {
    props.authorProfile(author)
    history.push(`/username/${author.username}`)
  }

  return (
    <div>
    {props.user.id === review.user_id ? (
      <div>
      <button onClick={handleEdit}
        className="edit-btn">edit</button>
        <button onClick={handleDelete}
        className="edit-btn">Delete</button>
      </div>
    ) : ""}
    <div className="review-page-container">
    <div className="review-page-header">
    <div className="center">
      <img alt="cover-art" src={review.img} />
      </div>
      <div className="review-header-contents">
      <h2>{review.title}</h2>
      <h3 className="artist-name"
      onClick={handleClick}>{review.artist}</h3>
      <h3>{review.rating}/10</h3>
      <h3 className="author"
      onClick={handleUserProfile}>
      {author !== undefined ? (
        author.username
      ) : ""}</h3>
      </div>
      <p className="full-review">
      {review.review}
      </p>
    </div>
    </div>
    <button className="comment-button"
    onClick={handleComment}>Comment</button>
    {commentForm ? (
      <div className="write-comment-container">
      <form className="comment-form" onSubmit={handlePostComment}>
      <input placeholder="comment.." name="comment" />
      <button type="submit">Submit</button>
      </form>
      </div>
    ) : (
      ""
    )}
    <div className="test">
    <h3 className="comments-header">Comments:</h3>
    <h3 className="tracks">Tracks:</h3>
    </div>
    {review.songs.map(s => <Tracks track={s} key={s} />)}
    {Array.isArray(comments) ? (
      comments.map(c => <Comments comment={c} key={c.id} />)
    ) : (
      ""
    )}
    </div>
  )
}
export default ReviewPage;
