$(document).ready(function() {
  $("#new-tweet-text").on('keydown', (function() {
    let numUsed = $(this).val().length;
    let numleft = 140 - numUsed;
    $(".counter").text(numleft);
      if(numleft < 0) {
        $(".counter").addClass("counterRed");
      } else {
        $(".counter").removeClass("counterRed");
      }
  }));
});