$(document).ready(function() {
  $('.answer').click(function() {
    $(this).toggleClass('selected')
  });

  $('.key-container').click(function() {
    $(this).fadeOut( 400 );
    $('#quiz').fadeIn( 500 );
    $('#status').fadeIn( 500 );
  });


/*

var question1= {prompt: "Who is from New Orleans?", answer1:["Tiana", true], answer2:["Ariel",false], answer3:["Belle", false]};
var question2= {prompt: "text", answer1:["text", true], answer2:["text",false], answer3:["text", false]};
var question3= {prompt: "text", answer1:["text", true], answer2:["text",false], answer3:["text", false]};
var question4= {prompt: "text", answer1:["text", true], answer2:["text",false], answer3:["text", false]};

var correct = 0;
var totalQuestions = questions.length;

var questions = [question1, question2, question3, question4]
*/

});
