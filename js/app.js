

//console.log(quiz)

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions =[];
let availableOptions =[];
let correctAnswers = 0;
let attempt = 0;
let testQuestion = 5;  //--added


//questions into availablequestion array
function setAvailableQuestions(){
	const totalQuestion = quiz.length;  //--Orig

	for(let i=0; i<totalQuestion; i++)
	{
		availableQuestions.push(quiz[i])
		//console.log(i)
	}
	//console.log(availableQuestions)
}

//set question number, questions and options
function getNewQuestion(){

	//set question number
	//questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + quiz.length;  //--Orig
	questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + testQuestion;

	//set questiontext and get randomquestions
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	currentQuestion = questionIndex;		
	questionText.innerHTML = currentQuestion.q;

	//position of the questionIndex from the availableQuestion
	const index1 = availableQuestions.indexOf(questionIndex);
	console.log(index1)
	console.log(questionIndex)

	//remove the questionIndex from the availablequestions array so that the questions do not repeat
	availableQuestions.splice(index1,1);	
	//console.log(availableQuestions)

	//set options and the length of the options
	const optionLen = currentQuestion.options.length
	//console.log(currentQuestion.options)

	//push options into availableOptions array
	for(let i=0; i<optionLen; i++)
	{
		availableOptions.push(i)
	}

	optionContainer.innerHTML = '';
	let animationDelay = 0.2;
	//create options in html
	for(let i=0; i<optionLen; i++)
	{
		//random option
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		//position of the optionIndex from availableoptions
		const index2 = availableOptions.indexOf(optionIndex);
		//remove the optionindex from the availableOptions so that the options does not repeat
		availableOptions.splice(index2,1);
		//console.log(optionIndex)
		//console.log(availableOptions)
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.2;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick", "getResult(this)");
	}

	questionCounter++

}

//Result of current attempt
function getResult(element){
	const id = parseInt(element.id);
	//console.log(typeof id)
	//compare the selected option to the answer
	if(id === currentQuestion.answer){
		//Set Green for correct option
		element.classList.add("correct");
		//console.log("answer is correct");

		//add indicator to the correct mark
		updateAnswerIndicator("correct");
		correctAnswers++;
		//console.log("correct:" +correctAnswers);
	}
	else
	{
		element.classList.add("wrong");
		//console.log("answer is wrong");

		//add indicator to the wrong mark
		updateAnswerIndicator("wrong");

		 optionLen = optionContainer.children.length;
		 for(let i = 0; i<optionLen; i++) {
		 	if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
		 			optionContainer.children[i].classList.add("correct");
		 	}
		 }

	}
	//console.log(optionElement.innerHTML)

	attempt++;
	unclickableOptions();
}

function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0; i<optionLen; i++){
		optionContainer.children[i].classList.add("already_answered");
	}
}

function answersIndicator(){
	answersIndicatorContainer.innerHTML = '';
	//const totalQuestion = quiz.length;  //--Orig
	const totalQuestion = testQuestion; 
	for (let i=0; i<totalQuestion; i++){
		const indicator = document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}

function updateAnswerIndicator(markType){
	//console.log(markType)
	answersIndicatorContainer.children[questionCounter -1].classList.add(markType)
}




//BACK FUNCTION- WORK IN PROGRESS

function getPrevQuestion(){

	//set question number
	//questionNumber.innerHTML = "Question " + (questionCounter +1) + " of " + quiz.length;  //--Orig
	questionNumber.innerHTML = "Question " + (questionCounter -1) + " of " + testQuestion;

	//set questiontext and get randomquestions
	//const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	//currentQuestion = questionIndex;		
	//questionText.innerHTML = currentQuestion.q;



	//position of the questionIndex from the availableQuestion
	//const index1 = availableQuestions.indexOf(questionIndex);
	//console.log(index1)
	//console.log(questionIndex)

	//remove the questionIndex from the availablequestions array so that the questions do not repeat
	//availableQuestions.splice(index1,1);	
	//console.log(availableQuestions)

	//set options and the length of the options
	//const optionLen = currentQuestion.options.length
	//console.log(currentQuestion.options)

	//push options into availableOptions array
	for(let i=0; i<optionLen; i++)
	{
		availableOptions.push(i)
	}

	optionContainer.innerHTML = '';
	let animationDelay = 0.2;
	//create options in html
	for(let i=0; i<optionLen; i++)
	{
		//random option
		const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		//position of the optionIndex from availableoptions
		const index2 = availableOptions.indexOf(optionIndex);
		//remove the optionindex from the availableOptions so that the options does not repeat
		availableOptions.splice(index2,1);
		//console.log(optionIndex)
		//console.log(availableOptions)
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optionIndex];
		option.id = optionIndex;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.2;
		option.className = "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick", "getResult(this)");
	}

	questionCounter--

}


function goBack() {

getPrevQuestion();

}



//BACK FUNCTION- WORK IN PROGRESS LOOK UP

function next(){
	//if(questionCounter === quiz.length)  //--Orig
	if(questionCounter === testQuestion)
	{
		//console.log("quiz over");
		quizOver();
	}
	else
	{
		getNewQuestion();
	}	
}

function quizOver(){

	quizBox.classList.add("hide");
	//show resultbox
	resultBox.classList.remove("hide");
	quizResult();
}

function quizResult(){
	//resultBox.querySelector(".total-question").innerHTML = quiz.length;  //--Orig
	resultBox.querySelector(".total-question").innerHTML = testQuestion;
	resultBox.querySelector(".total-attempt").innerHTML = attempt;
	resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
	//const percentage = (correctAnswers/quiz.length) * 100;   //--Orig
	const percentage = (correctAnswers/testQuestion) * 100;
	resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed() + "%"; 
	//resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;  //--Orig
	resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + testQuestion; 

}

function resetQuiz(){
	questionCounter = 0;
	correctAnswers = 0;
	attempt = 0;

	// 45 minutes from now
	var time_in_minutes = .30;
	var current_time = Date.parse(new Date());
	var deadline = new Date(current_time + time_in_minutes*60*1000);


	function time_remaining(endtime){
		var t = Date.parse(endtime) - Date.parse(new Date());
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		var hours = Math.floor( (t/(1000*60*60)) % 24 );
		var days = Math.floor( t/(1000*60*60*24) );
		return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
	}
	function run_clock(id,endtime)
	{
		var clock = document.getElementById(id);
		function update_clock()
		{
			var t = time_remaining(endtime);
			//clock.innerHTML = 'minutes: '+t.minutes+'<br>seconds: '+t.seconds;
			clock.innerHTML = 'Time left: '+t.minutes+': '+t.seconds;

			if(t.total<=0)
			{ 
				clearInterval(timeinterval);
				quizOver();
			}
		}
		update_clock(); // run function once at first to avoid delay
		var timeinterval = setInterval(update_clock,1000);
	}
	run_clock('clockdiv',deadline);

}

function tryAgain(){
	//hide the resultbox
	resultBox.classList.add("hide");
	//show the quizbox
	quizBox.classList.remove("hide");
	resetQuiz();
	startQuiz();
}


function goHome(){
	//hide the resultbox
	resultBox.classList.add("hide");
	//show the HomeBox
	homeBox.classList.add("hide");
	//hide the quizbox
	quizBox.classList.add("hide");
	resetQuiz();
}


function toTest(){
	//hide the resultbox
	resultBox.classList.add("hide");
	//show the HomeBox
	//hide the quizbox
	quizBox.classList.add("hide");
	resetQuiz();
	homeBox.classList.remove("hide");

}


function toAbout(){ 
	//hide the resultbox
	resultBox.classList.add("hide");
	//hide the HomeBox
	homeBox.classList.add("hide");
	//hide the quizbox
	quizBox.classList.add("hide");
	resetQuiz();
}

/*
function openCity(cityName, elmnt, color) 
{
	{
	  // Hide all elements with class="tabcontent" by default
	  var i, tabcontent, tablinks;
	  tabcontent = document.getElementsByClassName("header-right");
	  for (i = 0; i < tabcontent.length; i++) {
	    tabcontent[i].style.display = "none";
	  }

	  // Remove the background color of all tablinks/buttons
	  tablinks = document.getElementsByClassName("tablink");
	  for (i = 0; i < tablinks.length; i++) {
	    tablinks[i].style.backgroundColor = "";
	  }

	  // Show the specific tab content
	  document.getElementById(cityName).style.display = "block";

	  // Add the specific color to the button used to open the tab content
	  elmnt.style.backgroundColor = color;
	}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
}

*/

//START OF THE PAGE

function startQuiz(){
	//window.onload = function(){

	//hide homebox
	homeBox.classList.add("hide");
	//show quizBox
	quizBox.classList.remove("hide");
	//load questions into setAvailableQuestions array
	setAvailableQuestions();
	//load new questions
	getNewQuestion();
	//Answer indicators
	answersIndicator();
}

//Total number of questions in the MainPage
window.onload = function(){
	//homeBox.querySelector(".total-question").innerHTML = quiz.length;  --Orig
	homeBox.querySelector(".total-question").innerHTML = testQuestion;
}