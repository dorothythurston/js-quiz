$(document).ready(function() {

var questionOne = {question:"Who wore glass slippers?", answer:"Cinderella", wrongOne: "Belle", wrongTwo: "Pochahontas"},
    questionTwo = {question:"Who lived in the Ocean?", answer:"Ariel", wrongOne:"Merida", wrongTwo:"Mulan"},
    questionThree = {question:"Who was from New Orleans?", answer:"Tiana", wrongOne:"Elsa", wrongTwo:"Rapunzel"},
    questionFour = {question:"Who had a pet tiger?", answer:"Jasmine", wrongOne:"Snow White", wrongTwo:"Aurora"},
    questions = [questionOne, questionTwo, questionThree, questionFour];
    $('#total').text(questions.length);

var i = 0;
var score = 0;

var results = function() {
  if (score >= 2 ) {
    $('#results').text("You got " + score + " correct. You rock.");
  }
  else {
    $('#results').text("You got " + score + " correct. Maybe not so much.");
  }
};

var checkAnswer = function() {

};


  $('.answer').click(function() {
    $(this).toggleClass('selected');
    if (i === questions.length-1) {
      $('.answer').slideUp( 400 );
      $('#prompt').fadeOut( 800 );
      $('#status').fadeOut( 800 );
      $('.key-container').fadeIn( 1200 );
      $('#results').fadeIn( 1200 );
      if ($(this).text().trim() === questions[i].answer) {
        score++;
      }
      results();
    }
    else {
      i++;
      $('p', '#prompt').text((questions[i]).question);
      $('#choice-one').text((questions[i]).answer);
      $('#choice-two').text((questions[i]).wrongOne);
      $('#choice-three').text((questions[i]).wrongTwo);
      $(this).toggleClass('selected');
      $('#index').text(i+1);
      if ($(this).text().trim() === questions[i].answer) {
        score++;
      }
    }
  });

  $('.key-container').click(function() {
    $(this).fadeOut( 500 );
    $('p', '#prompt').text(questionOne.question);
    $('#choice-one').html(questionOne.answer);
    $('#choice-two').html(questionOne.wrongOne);
    $('#choice-three').html(questionOne.wrongTwo);
    $('#quiz').slideDown( 1200 );
    $('#status').slideDown( 1200 );
    $('#index').text(i+1);
  });
});
