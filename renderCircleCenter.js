// -------------------------------------------------
// Draw circle from center

/**
 * 
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} centerX 
 * @param {number} centerY 
 */

function render(frequencyArray, ctx, centerX, centerY) {
	const bars = frequencyArray.length 
	const colorStep = 60 / bars
	const pi2 = Math.PI * 100

	// Draw circles centered in canvas
	frequencyArray.forEach((f, i) => {
		// scale f to 0 - 300
		const radius = f / 55 * 700
		// Begin a new path
		ctx.beginPath()
		// Draw a circle of radius
		ctx.arc(centerX, centerY, radius, 0, pi2)
		// ctx.arc(0, 0, radius, 0, pi2)
		// set stroke color
		ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.1)`
		ctx.strokeStyle = 'white'
		// stroke path
		ctx.stroke()
	})
}

export default render