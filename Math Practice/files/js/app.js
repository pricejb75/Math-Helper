
let currentProblem = 0;
let currentScore = 0;
let numberOfProblems = 10;
const problemArray = [];

let chooseNumberOfProblems = () => {
  const userChoice = prompt('How many problems do you want to practice with?', numberOfProblems);
  const userNumber = parseInt(userChoice);
   if(isNaN(userNumber)){
     return chooseNumberOfProblems();
   }

   document.getElementById('numberOfProblems').innerText = userNumber;

   return userNumber;
}

  document.addEventListener('DOMContentLoaded', ()=> { 
    numberOfProblems = chooseNumberOfProblems();

    generateProblemList();
    let listItems = document.querySelectorAll('li');

    listItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        checkAnswer(event.currentTarget);
      })
    })
  })




  function checkAnswer(item) {
    /*
Below, we create a correctAnswer variable and set it equal to the value of the 
correctAnswer variable associated with the problem object at the current index 
of our ProblemArray.
*/
    let correctAnswer = problemArray[currentProblem].correctAnswer;
    /*
If the innerText of the item passed into this method equals the value of the 
correctAnswer property of our problem object's correctAnswer property then we 
increment the currentScore variable and use it's newly incremented value to change
the innerText of the currentScore HTML element that displays on the page.
Additionally, we send an alert that the user got it.
*/
    if(item.innerText == correctAnswer){
      currentScore++;
      document.querySelector('.currentScore').innerText = currentScore;
      window.alert('You got it!')
    } else {
          /*
If they get it wrong, we alert them that they got it wrong.
*/
      window.alert('You beefed it! The answer was: ' + correctAnswer);
    }
        /*
Regardless of whether they got it wrong or not, we increment our currentProblem
variable and use it's newly incremented value to change the innerText of the 
'currentProblem' HTML element that is displayed on the page. We then call the 
displayNewProblem() method.
*/

    if(currentProblem >= numberOfProblems) {
     
     window.alert('Game Over. Nice Job!');
      
    }


    currentProblem++;
    document.querySelector('.currentProblem').innerText = currentProblem + 1;
    displayNewProblem();



  }


  function displayNewProblem(){
    /*
    Current problem is a number that we declared at the top of the screen. 
    The first time we display a new problem, it's 0 (the number we assigned
      to it when we instantiated it.) However, every time we check an answer
      we increment that number. We then use that incremented number to 
      access the next index of our problemArray. We get the values from the 
      problem object at that particular index, and populate the current problem
      on the page with it's values.
*/
    let x = problemArray[currentProblem].leftNumber;
    let y = problemArray[currentProblem].rightNumber;
    let problemSet = problemArray[currentProblem].problemSet;

    let displayBox = document.querySelector('.expression');
    displayBox.innerText = x + " * " + y ;

    let listItems = document.querySelectorAll('li');
    let i = 0;
    listItems.forEach((item)=> {
      item.innerText = problemSet[i];
      i++;
    })

  }





/**
 * Utility function to generate a random number based on max
 * @param {number} max
 */
 function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }





  
 function generateProblemList() {
  //All of the operations in this method will happen ten times - for ten problems
  // on the application.
  for(let i = 0; i <numberOfProblems; i++){
      /*
Using the getRandomNumberMethod(provided) to find two random numbers
for x and y then creating "result" which is the result of multiplying
those two numbers together.
  */
  let x = getRandomNumber(10);
  let y = getRandomNumber(10);
  let result = x * y;
  /*
These three numbers will be the false answer choices on the website
  */
  let randomNumber1 = getRandomNumber(82);
  let randomNumber2 = getRandomNumber(82);
  let randomNumber3 = getRandomNumber(82);
/*
We're grabbing the html element associated with the blank box where 
the question is displayed in the browser. We're chaning the inner text
of that div to contain the current problem.
*/
  //let displayBox = document.querySelector('.expression');
  //displayBox.innerText = x + " * " + y ;
/*
Below, we're selecting all of the list items where the possible
answers are displayed on the page.
*/
  //let answers = document.getElementById('answers');
  //let listItems = answers.querySelectorAll('li');
/*
Below, we're creating a list called answerOptions and populating it
with our three random numbers as well as our result variable. We then 
use the shuffle function to shuffle the array. 
*/
  let answerOptions = [randomNumber1,randomNumber2,randomNumber3,result];
  answerOptions = shuffleArray(answerOptions);
/*
Here, we refer to the listItems variable we created and populated with 
the result of the querySelectorAll we used to grab all of the listItems
inside of the container with the id of answers. We set the text of these
HTML elements equal to the values in our shuffled answerOptions array.
*/
  //listItems[0].innerText = answerOptions[0];
  //listItems[1].innerText = answerOptions[1];
  //listItems[2].innerText = answerOptions[2];
  //listItems[3].innerText = answerOptions[3];
/*
Here, we are created a problem object to hold the different values we need
to populate the containers that display in the brower, and the variables
to hold the values necessar to perform / check the operation. So, we are creating
a problem object and populating it. 
*/
  let problem = {
    leftNumber: x,
    rightNumber: y,
    correctAnswer: result,
    problemSet: answerOptions
}
/*
Here, we add this instantiated/populate problem object and add it to the end 
of our problemArray, which we declared at the top of our page. 
*/
problemArray.push(problem);
  }
  displayNewProblem();

}





/**
 * Utility function to shuffle the items in an array
 * @param {object} arr
 */
 function shuffleArray(arr) {
  return arr.sort(function (a, b) { return Math.random() - 0.5 })

 }

