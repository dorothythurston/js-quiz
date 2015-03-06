$(document).ready(function() {
var questionOne = {question:"Who wore glass slippers?", answer:"Cinderella", choices:["Cinderella","Belle","Pochahontas"]},
    questionTwo = {question:"Who lived in the Ocean?", answer:"Ariel", choices:["Ariel","Merida","Mulan"]},
    questionThree = {question:"Who was from New Orleans?", answer:"Tiana", choices:["Tiana","Elsa","Rapunzel"]},
    questionFour = {question:"Who had a pet tiger?", answer:"Jasmine", choices:["Jasmine","Snow White","Aurora"]},
    questionFive = {question:"Who lived in France?", answer:"Belle", choices:["Rapunzel","Cinderella","Belle"]},
    questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];
    $('#total').text(questions.length);

var i = 0;
var score = 0;

var displayResults = function() {
  $('.answer').fadeOut( 1000 );
  $('#game').replaceWith($('#results').toggle()).fadeIn('slow');
  $('#status').fadeOut( 1000 );
  if (score >= 3 ) {
    $('p','#results').text("You got " + score + " correct. You rock.");
  }
  else {
    $('p','#results').text("You got " + score + " correct. Maybe not so much.");
  }
};

var checkAnswer = function(guess) {
  if (guess.text().trim() === questions[i].answer) {
    score++;
  }
};

var ranChoice = function() {
  var ranNum = Math.floor((Math.random() * 2) + 1);
  if (ranNum === 1) {
    return (questions[i].choices).pop();
  }
  else {
    return (questions[i].choices).shift();
  }
};

var fillChoices = function() {
  $('p', '#prompt').text(questions[i].question);
  $('#choice-one').text(ranChoice());
  $('#choice-two').text(ranChoice());
  $('#choice-three').text(ranChoice());
}

  $('.answer').click(function() {
    checkAnswer($(this));
    if (i === questions.length-1) {
      displayResults();
    }
    else {
      i++;
      fillChoices();
      $('#index').text(i+1);
    }
  });

  $('.key-container').click(function() {
    $(this).fadeOut( 500 );
    fillChoices();
    $('#quiz-container').slideDown( 1200 );
    $('#status').slideDown( 1200 );
    $('#index').text(i+1);
  });
});
