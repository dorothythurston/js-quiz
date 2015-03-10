$(document).ready(function() {
  var ranNum = function(max) {
    return Math.floor((Math.random() * max) + 0);
  }

  function Card(questionFromSet) {
    this.limit = 3;
    this.question = questionFromSet[0];
    this.answer = questionFromSet[1];
    this.choices = [];
    this.addChoices = function(gameSet) {
      this.choices.push(this.answer);
      while (this.choices.length < this.limit) {
        var ranIndex = ranNum(gameSet.indexLimit);
        if ((this.choices.indexOf(gameSet.questions[ranIndex][1]) === -1)) {
          if (ranIndex % 2 === 0) {
            this.choices.push(gameSet.questions[ranIndex][1]);
          }
          else {
            this.choices.unshift(gameSet.questions[ranIndex][1]);
          }
        }
      }
    };
    this.play = function() {
      $('#prompt').text(this.question);
      $(".answer").remove();
      for (var i = 0; i < 3; i++) {
        $("#game").append("<div class='answer'><h2>"+ this.choices[i] + "</h2></div>");
      };
    };
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
    this.selectSet = function(selection) {
      var setName = ($('h2', selection).text());
      for (var i = 0; i < sets.length; i++) {
        if (setName === sets[i].name) {
          this.set = sets[i];
        }
      }
    };
    this.fillDeck = function() {
      for (var i = 0; i < this.cardLimit; i++) {
        var ranIndex = ranNum(this.set.indexLimit);
        if (this.deck.indexOf(this.set.questions[ranIndex]) === -1) {
          var newCard = new Card((this.set.questions[ranIndex]));
          newCard.addChoices(this.set);
          this.deck.push(newCard);
        }
        else {
          console.log('already in');
        }
      };
    };
    this.display = function() {
      $('.game-option').slideUp( 200 );
      $('.main-container').css("background-color", this.set.backgroundColor);
      $(this.set.decoration).slideDown(200);
      $('#status').slideDown( 200 );
      $('#game').slideDown( 200 );
      $('#title').text(" " + this.set.name);
      $('#total').text(this.cardLimit);
      this.deck[this.statusIndex].play();
      $('#index').text(this.statusIndex+1);
    }
    this.checkAnswer = function(guess) {
      if (guess.text().trim() === game.deck[game.statusIndex].answer) {
        game.score++;
      }
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


  var displayResults = function() {
  $('#game').slideUp( 200 );
  $('#results').slideDown( 200 );
  $('#status').fadeOut("fast");
  if (game.score >= 3 ) {
    $('p','#results').text("You got " + game.score + " correct. You rock.");
  }
  else {
    $('p','#results').text("You got " + game.score + " correct. Maybe not so much.");
  }
  };

  var fillGameOptions = function(sets){
  for (var i = 0; i < sets.length; i++) {
    $('.main-menu').append("<div class='game-option'><h2>"+ sets[i].name + "</h2></div>");
  }
  };

  fillGameOptions(sets);
  $('#display').slideDown('slow');
  var game = undefined;

  $('.game-option').click(function() {
  game = new Game();
  game.selectSet($(this));
  game.fillDeck();
  game.display();
  });

  $("#game").on('click','.answer', function() {
    if (game.statusIndex < game.cardLimit-1) {
      game.checkAnswer($('h2', this));
      game.statusIndex++;
      game.deck[game.statusIndex].play();
      $('#index').text(game.statusIndex+1);
    }
    else {
      displayResults();
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
