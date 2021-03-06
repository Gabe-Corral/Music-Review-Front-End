import React, { useState, useEffect } from 'react';
import AllReviews from './AllReviews'

const Profile = (props) => {
  const [reviews, setReviews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followErrer, setFollowError] = useState(false);
  const url = "https://gabes-music-reviews.herokuapp.com";
  const user = props.user;

  useEffect(() => {
    if (loading && user.id) {
      fetch(`${url}/userreviews/${user.id}`)
        .then(res => res.json())
        .then(res => {
          setReviews(res)
          setLoading(false)
      })
      const viewer = props.currentViewer
      if (viewer !== undefined) {
        fetch(`${url}/followers/${viewer.id}`)
        .then(res => res.json())
        .then(followers => {
          followers.forEach(f => {
            if (f.id === user.id) {
              setFollowing(true)
            }
          })
        })
      }
    }
  })

  const handleFollow = () => {
    if (props.currentViewer.id !== undefined) {
      console.log(user.id)
      fetch(`${url}/followuser/${user.id}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          follower_id: props.currentViewer.id
        })
      })
      setFollowing(true);
    } else if (props.currentViewer.id === undefined) {
      setFollowError(true);
    }
  }

  return (
    <div className="profile-container">
      <h2 className="username">{user.username}</h2>

        {(() => {
          if (props.currentViewer !== undefined &&
            props.user.id !== props.currentViewer.id
          && following !== true) {
              return (
                <div className="follow-buttons">
                <button onClick={handleFollow}>Follow</button>
                {followErrer ? (
                  <p className="followerror">You must be logged in to do that</p>) : ""}
                </div>)
            } else if (following === true) {
              return (
                <div className="follow-buttons">
                <button>Following</button>
                </div>
              )
            }
        })()
      }

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
