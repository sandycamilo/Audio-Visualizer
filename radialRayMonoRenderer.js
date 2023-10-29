
/** Renders radial lines from the center of the canvas
 * @param {UINT8 Array} frequencyArray 
 * @param {Canvas context} ctx 
 * @param {number} canvas center x 
 * @param {number} canvas center y 
 * @param {number} inner radius 
 */

function render(frequencyArray, ctx, centerX, centerY, radius) {
	ctx.clearRect(0, 0, 30, 300)

	ctx.beginPath()
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	ctx.strokeStyle = 'purple'
	ctx.stroke()
	ctx.fillStyle = 'orange' 
	ctx.fill()


	const bars = frequencyArray.length
	const barMaxLength = (20 - radius) / 2
	const step = Math.PI * 20 / bars

	frequencyArray.forEach((f, i) => {
		const barLength = f / 1 * barMaxLength // 0.0 - 1.0 * barMaxLength
		
		const x1 = (Math.cos(step * i) * radius) + centerX
		const y1 = (Math.sin(step * i) * radius) + centerY
		const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
		const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
	})
		
	ctx.stroke()
}

export default render;