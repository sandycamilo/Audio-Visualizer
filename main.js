
// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
// these are funtions that we pass in the values to and draws on the canvas one time - then the renderers are called over and over again 
// calling them over and over again creates the animation
import circleRenderer from './radialRayMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'
// import flowerRenderer from './flowerRenderer.js'


// --------------------------------------------------------
// Canvas

// Draw on the canvas
// Get reference to the canvas context with its id name 'canvas' on html file for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// ----------------------------------------------------------
// Buttons 
// referenced these two elements by id name 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')
// added evenlisteners ~ when user clicks button it starts and stops audio
playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Audio setup

// Defime some variables - use these to store information about the audio
let analyser
let frequencyArray
let audio

// Starts playing the audio
// start audio function 
function startAudio() {
	// make a new Audio Object
	// creates new instance of the audio object 
	audio = new Audio()
	// Get a context 
	// audio context manipulates audio data
	// older browsers use webkit extension
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// Define a source sound file 
	// You can replace this with your own file
	// set the source on audio object to the name of the adio file we want to play
	audio.src = 'bird-whistling-a.wav'
	// sweep used for testing visualization on canvas
	// audio.src = 'log-sine-sweep.wav'

	// Make a new analyser
	// we create an audio analyzer with CreateAnalyser() along with the audio context
	// returns an array of frequency values
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	// create a source audio element and conncet the source to the analyser
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	// set analyser and get the audio context destination - this connects to the audio source and provide data 
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	// Uint8Array - creates an array that holds only unsigned integers that are 8 bits - it can only store numbers between 0 to 255 
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// check values it provides 
	// console.log(frequencyArray.length)
	
	// Start playing the audio
	// call audio.play to start playing audio 
	audio.play()

	// call request animation frame(built in) with the call back function 'render'
	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {
	// generate width and height of animation
	const centerX = 800 / 2
	const centerY = 800 / 2
	const radius = 800 / 5
	analyser.getByteFrequencyData(frequencyArray)
	
	// Use one of the renderers below 
	// radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx, 800, 800)
	// circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	// circleGridRenderer(frequencyArray, ctx, 300, 300)
	// takes in the frequency data, canvas and thr center and radius to draw
	circleRenderer(frequencyArray, ctx, centerX, centerY, radius)

	// Set up the next animation frame
	requestAnimationFrame(render)
}

