import React from 'react';
import Tweet from "./Tweet"
import { nanoid } from "nanoid"

function FeedPage(props) {
    const storedTweetMap = localStorage.getItem('tweetMap');
    const tweets = new Map(JSON.parse(storedTweetMap));
    const tweetElements = Array.from(tweets.values()).map(tweet => {
      const commentCount = Array.from(tweets.values()).filter(replyTweet => replyTweet.parentTweet === tweet.tweetId).length
        return (
          <React.Fragment key={nanoid()}>
            <Tweet
              viewTweet={props.viewTweet}
              changePage={(newPage, event) => props.changePage(newPage, event)}
              data={tweet}
              isReply={false}
              commentCount={commentCount}
              currentUser={props.currentUser}
            />
            <hr />
          </React.Fragment>
        )
      })

    return <>
        <main style={{display: "block", height: "100vh"}}>
            {tweetElements}
        </main>
    </>
}


export default FeedPage