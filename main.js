
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
import flowerRenderer from './flowerRenderer.js'


// --------------------------------------------------------
// Canvas

// Draw on the canvas
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

let analyser
let frequencyArray
let audio

function startAudio() {
	audio = new Audio()
	// audio context manipulates audio data
	// older browsers use webkit extension
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	audio.src = 'bird-whistling-a.wav'
	// audio.src = 'log-sine-sweep.wav'

	analyser = audioContext.createAnalyser()
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	
	audio.play()

	requestAnimationFrame(render)
}

function render() {
	const centerX = 800 / 2
	const centerY = 800 / 2
	const radius = 800 / 5
	analyser.getByteFrequencyData(frequencyArray)
	
	// Use one of the renderers below 
	radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx, 800, 800)
	circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	flowerRenderer(frequencyArray, ctx, centerX, centerY)
	// circleGridRenderer(frequencyArray, ctx, 300, 300)
	// takes in the frequency data, canvas and thr center and radius to draw
	circleRenderer(frequencyArray, ctx, centerX, centerY, radius)

	// Set up the next animation frame
	requestAnimationFrame(render)
}

