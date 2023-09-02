import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pfp from "./avatars/image-amyrobson.png"
import { nanoid } from "nanoid"
import Tweet from "./Tweet"

library.add(solidHeart)
library.add(regularHeart)

function ViewTweetPage(props) {
    const storedTweetMap = localStorage.getItem('tweetMap');
    const tweets = new Map(JSON.parse(storedTweetMap));
    const storedUserMap = localStorage.getItem('usersMap');
    const userList = new Map(JSON.parse(storedUserMap));
    const tweetStatsStyle =  {
        color: "white",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: "20px",
        padding: "10px 0"
    }

    const mainTweet = tweets.get(props.targetTweet)
    // console.log(mainTweet)
    const tweeter = userList.get(mainTweet.tweeter)

    const allReplies = Array.from(tweets.values()).filter(tweet => tweet.parentTweet === mainTweet.tweetId)

    const [ replyText, setReplyText ] = React.useState("")
    const [ replies, setReplies ] = React.useState(allReplies)

    const replyElements = replies.map(reply => {
        return (
            <React.Fragment key={nanoid()}>
              <Tweet
                // viewTweet={props.viewTweet}
                // changePage={(newPage, event) => props.changePage(newPage, event)}
                data={reply}
                isReply={true}
              />
              <hr></hr>
            </React.Fragment>
          )
        })

    function handleReplyChange(event) {
        if(event.target.value.length <= 140) {
            setReplyText(event.target.value)
            console.log(replyText)
        }
    }

    function handleReply() {
        const newTweet = {
            tweetId: nanoid(),
            tweeter: props.currentUser,
            timeSent: new Date(),
            tweetText: replyText,
            likesCount: 0,
            retweetCount: 0,
            quoteAmount: 0,
            replyingTo: mainTweet.tweeter,
            level: mainTweet.level+1,
            parentTweet: mainTweet.tweetId
          };
        
          tweets.set(newTweet.tweetId, newTweet);
          const updatedTweetMap = JSON.stringify(Array.from(tweets.entries()));
          localStorage.setItem('tweetMap', updatedTweetMap);
          
        console.log(newTweet)
        setReplies(prev => [...prev, newTweet])
        setReplyText("")
    }

    return <main>
    <div className="header"><FontAwesomeIcon onClick={event => props.changePage("feed", event)} icon={faArrowLeft} style={{color: "#ffffff", cursor: "pointer"}}></FontAwesomeIcon> Tweet</div>
    <div className="inner-main-tweet">
        <div className="main-tweet">
            <div className="tweeter-info">
                <img height="50" width="50" src={pfp} alt="" className="pfp"></img>
                <div className="user">
                    <div className="display-name">{tweeter.displayName}</div>
                    <div className="username">@{tweeter.userName}</div>
                </div>
            </div>
            <div style={{paddingBottom: "10px"}} className="tweet-text">{mainTweet.tweetText}</div>
            <div style={{paddingBottom: "10px"}} className="time-sent">8:22PM . Jun 23, 2023</div>
            <hr></hr>
            <div style={tweetStatsStyle} className="tweet-stats">
                <div className="main-tweet-retweets">{mainTweet.retweetCount} <span style={{color: "#8f8f8f"}}>Retweets</span></div>
                <div className="main-tweet-likes">{mainTweet.likesCount}  <span style={{color: "#8f8f8f"}}>Likes</span></div>
            </div>
            <hr></hr>
            <div className="tweet-actions">
                <div className="main-tweet-comment"><FontAwesomeIcon icon={faComment} style={{color: "#8f8f8f",}}></FontAwesomeIcon></div>
                <div className="main-tweet-retweet"><FontAwesomeIcon icon={faRetweet} style={{color: "#8f8f8f",}}></FontAwesomeIcon></div>
                <div className="main-tweet-like"><FontAwesomeIcon icon={regularHeart} style={{color: "#8f8f8f",}}></FontAwesomeIcon></div>
            </div>
            <hr></hr>
        </div>
        <div className="reply-area">
            <img height="50" width="50" src={pfp} alt="" className="pfp"></img>
            <textarea name="reply" onChange={event => handleReplyChange(event)} value={replyText} placeholder="Tweet your reply!" className="reply-field" type="text"></textarea>
            <div className="reply-field-options">
                <div onClick={handleReply} className="reply-button">Reply</div>
                <span className="char-limit">{replyText.length}/140</span>
            </div>
        </div>
    </div>
    <hr></hr>
    <div className='reply-section'>{replyElements}</div>
</main>
}


export default ViewTweetPage