/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//database of user and tweet info:

$(document).ready(function() {
  //function to render data to render new tweet;
  function renderTweets(tweets) {
    for (const tweet of tweets) {
      let $data = createTweetElement(tweet);
      $("#tweets-container").prepend($data);
    }
  }

  //function to create new tweet;
  function createTweetElement(newTweet) {
    function escape(str) {
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(str));
      return p.innerHTML;
    }

    let tweet = `
    <article class="tweet">
      <header>
        <img class="avatar" src="${newTweet.user.avatars.small}">
        <span class="username">${newTweet.user.name}</span>
        <span class="handle">${newTweet.user.handle}</span>
      </header>
      <p>${escape(newTweet.content.text)}</p>
      <footer>
        <span class="time">${newTweet.created_at}</span>
        <span class="icons"><i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i></span>
      </footer>
    </article>`;
    // let $postTweet = $("#tweets-container").prepend($tweet);
    return $(tweet);
  }

  $("form").on("submit", function(e) {
    e.preventDefault();
    let newData = $("form").serialize();
    let validInput = newData.substr(5);
  //Test if the data is empty or too long, if so, pop up flash messages
    if (validInput === "" || validInput === null) {
      alert("There is no content made! Please re-enter!");
    } else if (validInput.length > 140) {
      alert("Exceed the maximum length! Please re-enter!");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: newData
      }).done(function(data){
          loadTweets();
      });
      $("textarea").val("");
    }
  })

  //loading the tweets that has been composed.
  function loadTweets() {
    $.ajax("/tweets", {
      method: "GET",
    }).done(function(data){
      $("#tweets-container").empty();
      renderTweets(data);
    })
  };
  loadTweets();


});


