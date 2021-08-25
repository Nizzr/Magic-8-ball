// Variables declaration
const adviceList = [
	'"If you’re good at something, never do it for free."',
	'"Do, or do not. There is no try."',
	'"It’s what you do right now that makes a difference."',
	'"Until you start believing in yourself, you ain\'t gonna have a life!"',
	'"Life does not stop and start at your convenience."',
	'"You know what the trouble about real life is? There\'s no danger music."',
	'"Take time to know yourself"',
	'"A narrow focus brings big results"',
	'"Show up fully"',
	'"Don\'t make assumptions"',
	'"Be patient and persistent"',
	'"In order to get, you have to give"',
	'"Luck comes from hard work"',
	'"Be your best at all times"',
	'"Don\'t try to impress everyone"',
	'"Don\'t be afraid of being afraid"',
	'"Life\'s good, but it\'s not fair"',
	'"No task is beneath you"',
	'"You can\'t always get what you want"',
	'"Don\'t make decisions when you are angry or ecstatic"',
	'"Don\'t worry what other people think"',
	'"Use adversity as an opportunity"',
	'"Do what is right, not what is easy"',
	'"Dreams remain dreams until you take action"',
	'"Treat others the way you want to be treated"',
	'"When you quit, you fail"',
	'"Trust your instincts"',
	'"Learn something new every day"',
	'"Make what is valuable important"',
	'"Believe in yourself"',
	'"Success is not final; failure is not fatal: It is the courage to continue that counts"',
	'“ Work to become, not to acquire."',
];
let customAdvice = [];
let question = '';

const eightBall = document.querySelector('.eight-ball');
const advice = document.querySelector('.advice');
const container = document.querySelector('.container');
const underline = document.querySelector('.underline');

// Form

const form = document.querySelector('.question-form');
const input = document.querySelector('.question-input');
const button = document.querySelector('.question-button');
const message = document.querySelector('.message');
const statusMessage = document.querySelector('.status-message');

// Event listeners
// Stores the user question upon input
input.addEventListener('input', collectQuestion);

// Start on click or submit
form.addEventListener('submit', start);
button.addEventListener('click', start);

// Functions
function shake() {
	let a = 0;
	let t = 0;
	const shaking = setInterval(() => {
		a = a + Math.cos(t) * 10;
		eightBall.style.left = `calc(50% - 12.5rem + ${a}px)`;
		t++;
	}, 100);
	setTimeout(() => {
		clearInterval(shaking);
	}, 3000);
	setTimeout(() => {
		eightBall.classList.add('disappear');
		form.classList.add('disappear');
	}, 7000);
}
function showAdvice(adv) {
	advice.textContent = adv;
	let randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate random color
	underline.style.backgroundColor = '#' + randomColor;
	container.classList.add('appear');
}
function collectQuestion(e) {
	e.preventDefault();
	question = e.target.value;
	return question;
}

// Extract keywords from the question stored then compare it with the advice list array
function chooseAdvice(e) {
	let keyWords = question.split(' ');
	// Add words given into an array
	outer: for (let i = 0; i < adviceList.length; i++) {
		for (let j = 0; j < keyWords.length; j++) {
			if (adviceList[i].toUpperCase().includes(keyWords[j].toUpperCase())) {
				customAdvice.push(adviceList[i]);
				if (customAdvice.length > 1) {
					message.innerHTML = `<p>I've got <span class='advice-num'>${customAdvice.length}</span> advices for you,\r\n here's one!</p>`;
				} else {
					message.textContent = `I've got one advice for you`;
				}
			}
		}
	}
	// Array -> Set -> Array to remove duplicate elements
	let uniqueAdvice = [...new Set(customAdvice)]; // Create a set from chosen advices in customAdvice
	customAdvice = Array.from(uniqueAdvice); // Convert the set back into an array
	console.log(customAdvice);
	if (customAdvice.length == 0) {
		// No advice matching the user input
		message.textContent =
			"I didn't find what you asked for,\r\n here's a random advice instead!";
		let i = Math.floor(Math.random() * 25); // Generate random number between 0 & 23
		customAdvice.push(adviceList[i]); // Then add a random advice to customAdvice
		console.log(customAdvice[0]); // customAdvice contains only one string
	}
	return customAdvice;
}

// Main function
function start(e) {
	e.preventDefault();
	chooseAdvice();
	shake();
	setTimeout(() => {
		statusMessage.classList.add('appear');
	}, 4000);
	setTimeout(() => {
		statusMessage.classList.add('disappear');
		statusMessage.classList.remove('appear');
	}, 7000);
	setTimeout(() => {
		showAdvice(customAdvice[Math.floor(Math.random() * customAdvice.length)]); // Select a random advice from the ones that are picked
	}, 9000);
	setTimeout(() => {
		container.classList.remove('appear');
		container.classList.add('disappear');
		location.reload();
	}, 13000);
}
