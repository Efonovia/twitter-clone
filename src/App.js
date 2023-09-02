import React from 'react';
import './App.css';
import FeedPage from './FeedPage';
import ViewTweetPage from './ViewTweetPage';
import pfp from "./avatars/image-amyrobson.png"
import { nanoid } from "nanoid"
// import { tweets } from './data';
function App() {
  const [ page, setPage ] = React.useState("feed")
  const [ mainTweet, setMainTweet ] = React.useState(null)
  const [ currentUser, setCurrentUser ] = React.useState("user1")
  const storedUserMap = localStorage.getItem('usersMap');
  const userList = new Map(JSON.parse(storedUserMap));

  const userAreaElements = Array.from(userList.values()).map(user => {
    return <React.Fragment key={nanoid()}>
      <div onClick={() => changeUser(user.userName)} className="user-account" style={{background: user.userName === currentUser ? "red" : ""}}>
        <img height="50" width="50" src={pfp} alt="" className="pfp"></img>
        <div className="user">
            <div className="display-name">{user.displayName}</div>
            <div className="username">@{user.userName}</div>
        </div>
      </div>
    </React.Fragment>
    
  })

  function changeUser(newUser) {
    setCurrentUser(newUser)
  }

  function changePage(newPage, event) {
    event.stopPropagation()
    setPage(newPage)
  }

  function viewTweet(id) {
    setMainTweet(id)
  }
  // return <ViewTweetPage />

  if (page === "feed") {
    return <div className='main-holder'>
      <div className='user-list'>{userAreaElements}</div>

      <main>
        <FeedPage currentUser={currentUser} viewTweet={viewTweet} changePage={(newPage, event) => changePage(newPage, event)}/>
      </main>
    </div>
  } else if(page === "view") {
    return <div className='main-holder'>
      <div className='user-list'>{userAreaElements}</div>
      <ViewTweetPage currentUser={currentUser} targetTweet={mainTweet} changePage={(newPage, event) => changePage(newPage, event)} />
    </div>
  }
  
}

export default App;
