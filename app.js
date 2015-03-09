$(document).ready(function() {
  $('#display').slideDown('slow');

var deck = [];
var score = 0;
var i = 0;
var deckLimit = 5;
var choicesLimit = 3;
var princesses = {name:"Princesses", decoration:"#princess-hat", backgroundColor: "plum",
            questions:
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

var villains = {name: "Villains", decoration:"#evil-crown", backgroundColor: "mediumpurple",
             questions:
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

var princes = {name: "Princes", decoration:"#prince-crown", backgroundColor: "powderblue",
              questions:
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
var games = [princesses, villains, princes];

var ranNum = function(min,max) {
  return Math.floor((Math.random() * max) + min);
}

var buildChoices = function(correctAnswer, gameChoice) {
  var choices = [];
  choices.push(correctAnswer);
  while (choices.length < choicesLimit) {
    var index = ranNum(0, gameChoice.questions.length-1);
    if ((choices.indexOf(gameChoice.questions[index][1]) === -1)) {
      if (index % 2 === 0) {
        choices.push(gameChoice.questions[index][1]);
      }
      else {
        choices.unshift(gameChoice.questions[index][1]);
      }
    }
  }
  return choices;
};

var addQuestion = function(questionPrompt,answer, gameChoice) {
  deck.push({
    questionPrompt: questionPrompt,
    answer: answer,
    choices: buildChoices(answer, gameChoice)
  });
};

var buildQuestions = function(gameChoice) {
  var questions = [];
  while (questions.length < deckLimit) {
    var index = ranNum(0, gameChoice.questions.length-1);
    if (questions.indexOf(gameChoice.questions[index][0]) === -1) {
    questions.push(gameChoice.questions[index][0]);
    }
  }
  return questions
}

var clearDeck = function() {
    while(deck.length > 0) {
          deck.pop();
    }
};

var buildDeck = function(gameChoice) {
  var questions = buildQuestions(gameChoice);
  clearDeck();
  for (var i = 0; i < deckLimit; i++){
    addQuestion(gameChoice.questions[i][0], gameChoice.questions[i][1], gameChoice);
  }
};

var fillChoices = function() {
  $('p', '#prompt').text(deck[i].questionPrompt);
  $('#choice-one').text(deck[i].choices[0]);
  $('#choice-two').text(deck[i].choices[1]);
  $('#choice-three').text(deck[i].choices[2]);
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

var displayGame = function(gameChoice) {
  $('.game-option').slideUp( 200 );
  $('.main-container').css("background-color", gameChoice.backgroundColor);
  $(gameChoice.decoration).slideDown(200);
  $('#status').slideDown( 200 );
  $('#game').slideDown( 200 );
  $('#title').text(" " + gameChoice.name);
  $('#total').text(deckLimit);
  $('#index').text(i+1);
};


var playGame = function(gameChoice) {
  i = 0;
  score = 0;
  displayGame(gameChoice);
  buildDeck(gameChoice);
  fillChoices(gameChoice);

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

var selectGame = function(gameChoice) {
  var choice = $('h2', gameChoice).text();
  for (var i = 0; i< games.length; i++) {
    if (choice === games[i].name) {
      playGame(games[i]);
    }
    else {
      console.log('hoo');
    }
  }
};

  $('.game-option').click(function() {
    selectGame($(this));
  });
});
