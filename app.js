$(document).ready(function() {
var questionOne = {question:"Who wore glass slippers?",  answerOne:["Belle", 0], answerTwo:["Cinderella", 1], answerThree:["Pochahontas",0]},
    questionTwo = {question:"Who lived in the Ocean?", answerOne:["Ariel", 1], answerTwo:["Merida",0], answerThree:["Mulan",0]},
    questionThree = {question:"Who was from New Orleans?", answerOne:["Tiana", 1], answerTwo:["Elsa", 0], answerThree:["Rapunzel", 0]},
    questionFour = {question:"Who had a pet tiger?", answerOne:["Snow White", 0], answerTwo:["Jasmine", 1], answerThree:["Aurora", 0]},
    questions = [questionOne, questionTwo, questionThree, questionFour];
var i = 0;
var counter = [];


  $('.answer').click(function() {
    $(this).toggleClass('selected');
    if (i === questions.length-1) {
      $('#quiz').slideUp( 1200 );
      $('#status').slideUp( 1200 );
      $('.key-container').fadeIn( 1200 );
    }
    else {
      i+=1;
      $('p', '#prompt').text((questions[i]).question);
      $('#choice-one').text((questions[i]).answerOne[0]);
      $('#choice-two').text((questions[i]).answerTwo[0]);
      $('#choice-three').text((questions[i]).answerThree[0]);
      $(this).toggleClass('selected');
    }
  });

  $('.key-container').click(function() {
    $(this).fadeOut( 500 );
    $('p', '#prompt').text(questionOne.question);
    $('#choice-one').text(questionOne.answerOne[0]);
    $('#choice-two').text(questionOne.answerTwo[0]);
    $('#choice-three').text(questionOne.answerThree[0]);
    $('#quiz').slideDown( 1200 );
    $('#status').slideDown( 1200 );
  });
});
