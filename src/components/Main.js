import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login'
import Review from './Album'
import ReviewPage from './ReviewPage'
import AllReviews from './AllReviews'
import WriteAReview from './WriteAReview'
import Search from './Search'
import ArtistPage from './ArtistPage'
import { FaSearch } from 'react-icons/fa';
import Profile from './Profile'
import EditReview from './EditReview'

const url = "http://localhost:3000";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      artists: [],
      currentArtist: {},
      currentReview: {},
      showResults: false,
      searchWords: "",
      searchReseults: [],
      showMore: 10,
      searchBar: false,
      showDropDowm: false,
      sortType: "rating",
      authorPage: false,
      author: {}
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
  }

  componentDidMount = () => {
    fetch(`${url}/review`)
    .then(res => res.json())
    .then(reviews => this.setState({ reviews }))

    fetch(`${url}/artist`)
    .then(res => res.json())
    .then(artists => this.setState({ artists }))
  }

  getFullReview = (review) => {
    this.state.reviews.forEach(r => {
      if (r.id === review.id) {
        this.setState({ currentReview: r });
        localStorage.setItem("currentReview",
        JSON.stringify({ currentReview: r }));
      }
    })
    this.setState({ showResults: false })
  }

  handleSearchBar = (e) => {
    e.preventDefault()
    this.setState({ showResults: true });
    this.handleSearchResults(e)
  }

  handleSearchResults = (e) => {
    let search = e.target.value;
    const searched = this.state.artists.filter(a => a.name.includes(search))
    this.setState({ searchReseults: searched })
  }

  setCurrentArtist = (artistName) => {
    this.state.artists.forEach(a => {
      if (artistName === a.name) {
        this.setState({ currentArtist: a, showResults: false })
      }
    })
  }

  handleShowMore = () => {
    this.setState({ showMore: this.state.showMore + 10 })
  }

  showSearchBar = () => {
    this.setState({ searchBar: !this.state.searchBar })
  }

  sortingReviews = (e) => {
    e.preventDefault()
    this.setState({ sortType: e.target.value })
  }

  authorProfile = (author) => {
    this.setState({ authorPage: true, author: author })
  }

  render() {
    const type = this.state.sortType
    const sortedReviews = this.state.reviews.sort(function(a, b) {
      return b[type] - a[type];
    })
    return (
      <div className="nav-bar">
      <Router>
      <div className="topnav">
      <a href="/">Home</a>
      <a href="/reviews" className="sub-menu">Reviews</a>
        <a href="/write">Write A Review</a>
      {this.props.loggedInStatus ? (
        <div>
        <a href={`/username/${this.props.user.username}`}>Profile</a>
        <a onClick={this.props.handleLogout} href="/">Logout</a>
        </div>
      ) : (
        <a href="/login">Login</a>
      )}
      <div>
      <div onClick={this.showSearchBar} className="search-icon">
      <FaSearch />
      </div>
        {this.state.searchBar ? (
          <input onChange={this.handleSearchBar}
          className="search-bar" type="text" placeholder="Search.." />
        ) : ""}
        {this.state.showResults ? (
          <div className="search-table">
            {this.state.searchReseults.map(r => <Search artist={r} key={r.id} setCurrentArtist={this.setCurrentArtist} />)}
          </div>
        ) : (
          ""
        )}
      </div>
      </div>

      <Switch>
      <Route exact path="/reviews">
      <div>
      <select onChange={this.sortingReviews} className="sort-select">
      <option>rating</option>
      <option value="release_date">Release</option>
      </select>
      </div>
        {this.state.reviews.slice(0, this.state.showMore).map(r => <AllReviews review={r} key={r.id} getFullReview={this.getFullReview}/>)}
        <button className="show-more"
        onClick={this.handleShowMore}>Show More</button>
      </Route>
      <Route exact path="/login">
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </Route>
      <Route exact path="/">
        <div className="reviews">
          <h3 className="top-charts">Top Charts:</h3>
          {sortedReviews.slice(0, 5).map(r => <Review review={r} key={r.id} getFullReview={this.getFullReview} />)}
          <div className="description">
            <h3>Gabe's Music Reviews</h3>
            <p>A place to review your favorite music and discover new music.</p>
            <p>You can search for artists, look at reviews, comment on reviews,</p>
            <p>and write your own reviews. Just login or create an account.</p>
        </div>
      </div>
      </Route>
      <Route exect path="/write">
        <WriteAReview user={this.props.user}/>
      </Route>
      <Route path="/review/:id">
        <EditReview
        currentReview={
          this.state.currentReview
        } />
      </Route>
      <Route path="/artist/:name">
        <ArtistPage
        currentArtist={this.state.currentArtist}
        getFullReview={this.getFullReview}/>
      </Route>
      <Route path="/username/:username">
      {this.state.authorPage ? (
        <Profile user={this.state.author}
        currentViewer={this.props.user}
        getFullReview={this.getFullReview}/>
      ) : (
        <Profile user={this.props.user}
        getFullReview={this.getFullReview}/>
      )}
      </Route>
      <Route path="/:id">
        <ReviewPage
        setCurrentArtist={this.setCurrentArtist}
        user={this.props.user}
        authorProfile={this.authorProfile}/>
      </Route>
      </Switch>
      </Router>
      </div>
    )
  }
}
export default Main;
