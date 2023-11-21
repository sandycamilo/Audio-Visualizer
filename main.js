
import circleRenderer from './radialRayMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'
import flowerRenderer from './flowerRenderer.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'

// Canvas
const canvas = document.getElementById('canvas')
const canvas2 = document.getElementById('canvas2')
const canvas3 = document.getElementById('canvas3')
const canvas4 = document.getElementById('canvas4')
const ctx = canvas.getContext('2d')
const ctx2 = canvas2.getContext('2d')
const ctx3 = canvas3.getContext('2d')
const ctx4 = canvas4.getContext('2d')

const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')
playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})

let analyser
let frequencyArray
let audio

function startAudio() {
	audio = new Audio()
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

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + 'px';
    element.style.left = (element.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

	const canvasElements = [canvas, canvas2, canvas3, canvas4];

	canvasElements.forEach((canvas) => {
		makeDraggable(canvas);
});


function render() {
	const centerX = 800 / 2
	const centerY = 800 / 2
	const radius = 800 / 5
	analyser.getByteFrequencyData(frequencyArray)
	
	radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	circleRenderer(frequencyArray, ctx, centerX, centerY, radius)
	flowerRenderer(frequencyArray, ctx, centerX, centerY)
	
	radialRayRenderer(frequencyArray, ctx2, centerX, centerY, radius)
	// circleCenterRenderer(frequencyArray, ctx2, centerX, centerY)
	// circleRenderer(frequencyArray, ctx2, centerX, centerY, radius)
	flowerRenderer(frequencyArray, ctx2, centerX, centerY)

	radialRayRenderer(frequencyArray, ctx3, centerX, centerY, radius)
	circleCenterRenderer(frequencyArray, ctx3, centerX, centerY)
	// circleRenderer(frequencyArray, ctx3, centerX, centerY, radius)
	flowerRenderer(frequencyArray, ctx3, centerX, centerY)

	radialRayRenderer(frequencyArray, ctx4, centerX, centerY, radius)
	// circleCenterRenderer(frequencyArray, ctx4, centerX, centerY)
	// circleRenderer(frequencyArray, ctx4, centerX, centerY, radius)
	// flowerRenderer(frequencyArray, ctx4, centerX, centerY)

	// verticalBarsMonoRenderer(frequencyArray, ctx2, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx4, 800, 200)
	circleGridRenderer(frequencyArray, ctx, 300, 300)

	requestAnimationFrame(render)
}

