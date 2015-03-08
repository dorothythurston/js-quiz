$(document).ready(function() {
  $('#display').slideDown('slow');

var deck = [];
var score = 0;
var i = 0;
var deckLimit = 5;
var choicesLimit = 3;
var Princesses = {backgroundImage: "linear-gradient(190deg, magenta, pink 300px)",
            data:
            [["Who wore glass slippers?", "Cinderella"],
            ["Who lived in the Ocean?","Ariel"],
            ["Who was from New Orleans?", "Tiana"],
            ["Who had a pet Tiger?", "Jasmine"],
            ["Who knew seven dwarves?","Snow White"],
            ["Who had three little brothers?","Merida"],
            ["Who had a father that was an inventor?","Belle"],
            ["Who fought the Hun army?","Mulan"],
            ["Who had a chameleon?","Rapunzel"],
            ["Who was called Sleeping Beauty?", "Aurora"],
            ["Who loved John Smith?","Pochahontas"]]
};

var Villains = {backgroundImage: "linear-gradient(190deg, purple, mediumpurple 300px)",
             data:
             [["Who had a hook for a hand?", "Captain Hook"],
             ["Who wanted to marry Belle?","Gaston"],
             ["Who is a Lion?","Scar"],
             ["Who lives in the ocean?","Ursula"],
             ["Who has a dog named Percy?","Governor Ratcliff"],
             ["Who is from London?","Cruella de Vil"],
             ["Who had a parrot named Iago?","Jafar"],
             ["Who cast a spell on Sleeping Beauty?","Maleficent"],
             ["Who is a greek god?","Hades"],
             ["Who is known as the shadow man?","Doctor Facilier"],
             ["Who lives in Wonderland?","The Queen of Hearts"]]
};

var Princes = {backgroundImage: "linear-gradient(190deg, blue, powderblue 300px)",
              data:
              [["Who is also known as The Beast?","Adam"],
              ["Who heard Snow White singing?", "Florian"],
              ["Who danced with Cinderella?","Henry"],
              ["Who kissed Sleeping Beauty?","Phillip"],
              ["Who was saved by Ariel?","Eric"],
              ["Who was called a street rat?","Aladdin"],
              ["Who sailed to the New World?","John Smith"],
              ["Who fought the Hun army?","Li Shang"],
              ["Who was from Maldonia?","Naveen"],
              ["Whose real name is Eugene?","Flynn Rider"],
              ["Who is from Africa?","Simba"]]

};

var ranNum = function(min,max) {
  return Math.floor((Math.random() * max) + min);
}

var buildQuestions = function() {
  var questions = [];
  while (questions.length < deckLimit) {
    var index = ranNum(0, data.length-1);
    if (questions.indexOf(data[index]) === -1) {
    questions.push(data[index]);
    }
  }
  return questions
}

var buildChoices = function(correctAnswer) {
  var choices = [];
  choices.push(correctAnswer);
  while (choices.length < choicesLimit) {
    var index = ranNum(0, data.length-1);
    if ((choices.indexOf(data[index][1]) === -1)) {
      if (index % 2 === 0) {
        choices.push(data[index][1]);
      }
      else {
        choices.unshift(data[index][1]);
      }
    }
  }
  return choices;
};

var addQuestion = function(questionPrompt,answer) {
  deck.push({
    questionPrompt: questionPrompt,
    answer: answer,
    choices: buildChoices(answer)
  });
};

var clearDeck = function() {
    while(deck.length > 0) {
          deck.pop();
    }
    console.log(deck);
};

var buildDeck = function() {
  var questions = buildQuestions();
  console.log(questions);
  clearDeck();
  for (var i = 0; i < deckLimit; i++){
    addQuestion(questions[i][0],questions[i][1]);
  }
};

var fillChoices = function() {
  $('p', '#prompt').text(deck[i].questionPrompt);
  $('#choice-one').text(deck[i].choices[0]);
  $('#choice-two').text(deck[i].choices[1]);
  $('#choice-three').text(deck[i].choices[2]);
};


var displayGame = function() {
  if ($('#results').is(':hidden')) {
    $('#new-game').fadeOut( 500 );
    $('#status').slideDown( 1200 );
    $('#game').slideDown( 1200 );
    $('#title').text("Princesses");
  }
  else {
    $('#results').fadeToggle("fast", "linear", $('#game').fadeIn( 500 ));
    $('#new-game').fadeToggle("fast", "linear", $('#status').fadeIn( 500 ));
  }
  $('#total').text(deckLimit);
  $('#index').text(i+1);
};

var checkAnswer = function(guess) {
  if (guess.text().trim() === deck[i].answer) {
    score++;
  }
};

var displayResults = function() {
  $('#game').fadeToggle("fast", "linear", $('#results').show());
  $('#status').fadeToggle("fast", "linear", $('#new-game').toggle());
  if (score >= 3 ) {
    $('p','#results').text("You got " + score + " correct. You rock.");
  }
  else {
    $('p','#results').text("You got " + score + " correct. Maybe not so much.");
  }
};


var playGame = function() {
  i = 0;
  score = 0;
  buildDeck();
  fillChoices();
  displayGame();


  $('.answer').unbind('click').click(function() {
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
};

  $('#new-game').unbind('click').click(function() {
    playGame();
  });
});
