import React, { useState, useEffect } from 'react';
import AllReviews from './AllReviews'

const Profile = (props) => {
  const [reviews, setReviews] = useState(false)
  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState(false)
  const url = "http://localhost:3000";
  const user = props.user;

  useEffect(() => {
    if (loading && user.id) {
      fetch(`${url}/userreviews/${user.id}`)
        .then(res => res.json())
        .then(res => {
          setReviews(res)
          setLoading(false)
      })
    }
  })

  const handleFollow = () => {
    fetch(`${url}/followuser/${user.id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        follower_id: props.currentViewer.id
      })
    })
  }

  return (
    <div className="profile-container">
      <h2>{user.username}</h2>
      {props.currentViewer !== undefined &&
        props.user.id !== props.currentViewer.id ? (
        <div className="follow-buttons">
          <button onClick={handleFollow}>Follow</button>
        </div>
      ) : ""}

        <div className="user-reviews">
            <h3>Reviews:</h3>
            {reviews !== false ? (
              reviews.map(r => <AllReviews
                review={r} key={r.id} user={user}
                getFullReview={props.getFullReview} />)
            ) : "" }
          </div>
    </div>
  )
}
export default Profile
