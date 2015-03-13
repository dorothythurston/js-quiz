$(document).ready(function() {
  var ranNum = function(max) {
    return Math.floor((Math.random() * max) + 0);
  }

  function Card(set, deck) {
    this.set = set;
    this.deck = deck
    this.limit = 3;
    this.question;
    this.answer;
    this.choices = [];
  };

  Card.prototype = {
    addPromptAndAnswer: function() {
      var ranIndex = ranNum(this.set.indexLimit);
      var setQuestions = this.set.questions;
      if (this.deck.indexOf(setQuestions[ranIndex]) === -1) {
         this.question = setQuestions[ranIndex][0];
         this.answer = setQuestions[ranIndex][1];
      }
    },
    addChoices: function() {
      this.choices.push(this.answer);
      while (this.choices.length < this.limit) {
        var ranQuestion = this.set.questions[ranNum(this.set.indexLimit)][1];
        if ((this.choices.indexOf(ranQuestion) === -1)) {
          (ranNum(2) % 2 === 0) ? this.choices.push(ranQuestion) : this.choices.unshift(ranQuestion);
        }
      }
    },
    play: function() {
      $('#prompt').text(this.question);
      $(".answer").remove();
        for (var i = 0; i < 3; i++) {
          $("#game").append("<div class='answer'><h2>"+ this.choices[i] + "</h2></div>");
        }
    }
  };

  function Set(name, decoration, backgroundColor, questions, indexLimit) {
    this.name = name;
    this.decoration = decoration;
    this.backgroundColor = backgroundColor;
    this.questions = questions;
    this.indexLimit = this.questions.length-1;
  };

  function Game() {
    this.score = 0;
    this.statusIndex = 0;
    this.cardLimit = 5;
    this.deck = [];
  };

  Game.prototype = {
    selectSet: function(selection) {
      var setName = ($('h2', selection).text());
      for (var i = 0; i < sets.length; i++) {
        if (setName === sets[i].name) {
          this.set = sets[i];
        }
      }
    },
    fillDeck: function() {
      for (var i = 0; i < this.cardLimit; i++) {
        var newCard = new Card(this.set, this.deck);
        newCard.addPromptAndAnswer();
        newCard.addChoices();
        this.deck.push(newCard);
      };
    },
    display: function() {
      $('.game-option').slideUp( 200 );
      $('.main-container').css("background-color", this.set.backgroundColor);
      $(this.set.decoration).slideDown(200);
      $('#status').slideDown( 200 );
      $('#game').slideDown( 200 );
      $('#title').text(" " + this.set.name);
      $('#total').text(this.cardLimit);
      this.deck[this.statusIndex].play();
      $('#index').text(this.statusIndex+1);
    },
    checkAnswer: function(guess) {
      if (guess.text().trim() === game.deck[game.statusIndex].answer) {
        game.score++;
      }
    },
    displayResults: function() {
      $('#game').slideUp( 200 );
      $('#results').slideDown( 200 );
      $('#status').fadeOut("fast");
        (this.score >= 3 ) ? $('p','#results').text("You got " + this.score + " correct. You rock.") : $('p','#results').text("You got " + this.score + " correct. Maybe not so much.");
    }
  };

  var princesses = new Set("Princesses", "#princess-hat", "plum",
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
  );

  var villains = new Set("Villains","#evil-crown","mediumpurple",
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
  );

  var princes = new Set("Princes","#prince-crown","powderblue",
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
  );

  var sets = [princesses, villains, princes];

  var fillGameOptions = function(sets){
    for (var i = 0; i < sets.length; i++) {
      $('.main-menu').append("<div class='game-option'><h2>"+ sets[i].name + "</h2></div>");
    }
  };

  fillGameOptions(sets);
  $('#display').slideDown('slow');
  var game;

  $('.game-option').click(function() {
    game = new Game();
    game.selectSet($(this));
    game.fillDeck();
    game.display();
  });

  $("#game").on('click','.answer', function() {
    game.checkAnswer($('h2', this));
    if (game.statusIndex < game.cardLimit-1) {
      game.statusIndex++;
      game.deck[game.statusIndex].play();
      $('#index').text(game.statusIndex+1);
    }
    else {
      game.displayResults();
    }
  });

  $('#play-again').click(function() {
    $('#results').slideUp();
    game.statusIndex = 0;
    game.score = 0;
    $('#game').slideDown( 200 );
    $('#index').text(game.statusIndex+1);
    $('#status').slideDown( 200 );
  });

  $('#play-new-game').click(function() {
    $(game.set.decoration).slideUp(200);
    $('#results').slideUp();
    $('#title').text("");
    $('.game-option').slideDown( 200 );
    $('.main-container').css('background-color',"steelBlue");
  });
});
