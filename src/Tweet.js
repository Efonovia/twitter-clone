import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pfp from "./avatars/image-amyrobson.png"

library.add(solidHeart);
library.add(regularHeart);
function Tweet(props) {
    const storedUsersMap = localStorage.getItem('usersMap');
    const users = new Map(JSON.parse(storedUsersMap));
    const storedTweetMap = localStorage.getItem('tweetMap');
    const tweetMap = new Map(JSON.parse(storedTweetMap));
    const tweeter = users.get(props.data.tweeter)
    const [ isLiked, setIsLiked ] = React.useState(props.currentUser in tweetMap.get(props.data.tweetId).likes)

    function onTweetClick(event) {
        props.changePage("view", event)
        props.viewTweet(props.data.tweetId)
    }

    function handleLike(event) {
        event.stopPropagation()
        setIsLiked(prev => !prev)
        if(props.currentUser in tweetMap.get(props.data.tweetId).likes) {
            console.log("unlikig")
            delete tweetMap.get(props.data.tweetId).likes[props.currentUser]
        } else {
            console.log("liking")
            tweetMap.get(props.data.tweetId).likes[props.currentUser] = true
        }
        const updatedTweetMap = JSON.stringify(Array.from(tweetMap.entries()));
        localStorage.setItem('tweetMap', updatedTweetMap);
    }

    return <div className="tweet" onClick={event => onTweetClick(event)} style={props.isReply ? {width: "90%", justifyContent: "start", margin: "auto"} : {}}>
            <img height="50" width="50" src={pfp} alt="" className="pfp"></img>
            <div className="inner-content" style={props.isReply ? {gap: "1px"} : {}}>
                <div className="tweet-info">
                    <div className="display-name">{tweeter.displayName}</div>
                    <div className="username">@{tweeter.userName}</div>.
                    <div className="time-sent">44m</div>
                </div>
                {props.isReply && <div className="reply-info">replying to <span className="replying-to">{props.data.replyingTo}</span></div>}
                <div className="tweet-text">{props.data.tweetText}</div>
                <div className="tweet-stats">
                    <div className="comment"><FontAwesomeIcon icon={faComment} style={{color: "#8f8f8f",}}></FontAwesomeIcon> <div className="comment-amount">{props.commentCount}</div></div>
                    <div className="retweet"><FontAwesomeIcon icon={faRetweet} style={{color: "#8f8f8f",}}></FontAwesomeIcon> <div className="retweet-amount">{props.data.retweetCount}</div></div>
                    <div className="like"><FontAwesomeIcon onClick={event => handleLike(event)} icon={isLiked ? solidHeart : regularHeart} style={{color: isLiked ? "red" : "#8f8f8f"}} /> <div className="like-amount">{Object.keys(props.data.likes).length}</div></div>
                </div>
            </div>
        </div>
}


export default Tweet