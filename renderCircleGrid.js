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
	const step = width / 32           
	const colorStep = 360 / bars   
	const pi2 = Math.PI * 2

	frequencyArray.forEach((f, i) => {
		const radius = f / 255 * 30
		const x = i % 32 * step             
		const y = Math.floor(i / 32) * step 
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, pi2)
		ctx.strokeStyle = 'blue'
		ctx.fillStyle = `hsla(${colorStep * i}, 100%, 50%, 0.15)`
		ctx.fill()
	})
}


export default render;