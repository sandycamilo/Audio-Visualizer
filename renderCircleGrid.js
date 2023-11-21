/**
 * @param {UINT8 Array} frequencyArray 
 * @param {canvas context} ctx 
 * @param {number} canvas width 
 * @param {number} canvas height 
 */

function render(frequencyArray, ctx, width, height) {
	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)' 
	ctx.fillRect(0, 0, width, height) 
	ctx.fill()

	const bars = frequencyArray.length 
	const step = width / 300           
	const colorStep = 100 / bars   
	const pi2 = Math.PI * 200

	frequencyArray.forEach((f, i) => {
		const radius = f / 5 * 300
		const x = i % 300 * step             
		const y = Math.floor(i / 3) * step 
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, pi2)
		ctx.strokeStyle = 'blue'
		ctx.fillStyle = `hsla(${colorStep * i}, 100%, 50%, 0.15)`
		ctx.fill()
	})
}

export default render;