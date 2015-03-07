$(document).ready(function() {

var princesses = ["Snow White", "Aurora", "Cinderella","Mulan","Merida","Tiana","Pochahontas","Belle","Jasmine","Ariel","Rapunzel"];
var deck = [];
var score = 0;
var i = 0;
var questions = [["Who wore glass slippers?", "Cinderella"],
            ["Who lived in the Ocean?","Ariel"],
            ["Who was from New Orleans?", "Tiana"],
            ["Who had a pet Tiger?", "Jasmine"],
            ["Who knew seven dwarves?","Snow White"],
            ["Who had three little brothers?","Merida"],
            ["Who had a father that was an inventor?","Belle"],
            ["Who fought the Hun army?","Mulan"],
            ["Who had a chameleon?","Rapunzel"],
            ["Who was called Sleeping Beauty?", "Aurora"],
            ["Who loved John Smith?","Pochahontas"]];
$('#total').text(deck.length);

var buildChoices = function(correctAnswer) {
  choices = []
  answers = princesses.slice();
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswer) {
      choices.push(answers[i]);
      answers.splice(i,1);
    }
  }

  while (choices.length < 3) {
    var ranNum = Math.floor((Math.random() * answers.length-1) + 1);
    if (ranNum % 2 === 0) {
      choices.push(answers[ranNum]);
    }
    else {
      choices.unshift(answers[ranNum]);
    }
    answers.splice(ranNum,1);
  }
  return choices;
}

var addQuestion = function(questionPrompt,answer) {
  var choices = buildChoices(answer);
  deck.push({
    questionPrompt: questionPrompt,
    answer: answer,
    choices: choices
  });
};

var buildDeck = function() {
  var deckLimit = 5;
  for (var i = 0; i < deckLimit; i++){
    console.log(questions);
    console.log(questions[i][1]);
    console.log(questions[i][0]);
    addQuestion(questions[i][0],questions[i][1]);
  }
};

var fillChoices = function() {
  $('p', '#prompt').text(deck[i].questionPrompt);
  $('#choice-one').text(deck[i].choices[0]);
  $('#choice-two').text(deck[i].choices[1]);
  $('#choice-three').text(deck[i].choices[2]);
}

var ranNum = function(max) {
  return Math.floor((Math.random() * max) + 0);
}

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
  if (guess.text().trim() === deck[i].answer) {
    score++;
  }
};


  $('.answer').click(function() {
    checkAnswer($(this));
    if (i === deck.length-1) {
      displayResults();
    }
    else {
      i++;
      fillChoices();
      $('#index').text(i+1);
    }
  });

  $('.key-container').click(function() {
    buildDeck();
    console.log(deck);
    $(this).fadeOut( 500 );
    fillChoices();
    $('#quiz-container').slideDown( 1200 );
    $('#status').slideDown( 1200 );
    $('#index').text(i+1);
  });
});
