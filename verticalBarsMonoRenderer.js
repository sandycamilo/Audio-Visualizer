/**
 * @param {UINT8 Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} width 
 * @param {number} height 
 */

function render(frequencyArray, ctx, count, width, height) {
	const bars = frequencyArray.length
	const step = width / bars
	const lineWidth = (width / count) - 2
	const int = Math.floor(frequencyArray.length / count)

	ctx.beginPath()
	ctx.fillStyle = 'rgba(255, 255, 255, 0.21)'
	ctx.lineWidth = lineWidth
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

	let fsum = 0

	for (let i = 0; i < bars; i += int) {
		const f = frequencyArray[i]
		fsum = Math.max(fsum, f)
		
		if (i % int === 0) {
			const fval = fsum
		
			const barLength = fval / 255 * height
			const x1 = step * i
			const y1 = height
			const x2 = x1 
			const y2 = height - barLength

			ctx.moveTo(x1, y1)
			ctx.lineTo(x2, y2)
			fsum = 0
		}
	}
	
	ctx.strokeStyle = 'red'
	ctx.stroke()
}

export default render;