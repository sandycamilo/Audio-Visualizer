function render(frequencyArray, ctx, centerX, centerY, radius) {
	ctx.beginPath()
	ctx.arc(centerX, centerY, radius, 1, 20 * Math.PI)
	ctx.stroke()

	const bars = frequencyArray.length
	const step = Math.PI * 100 / bars

	frequencyArray.forEach((f, i) => {
		const barLength = f / 12 * bars
		const x1 = (Math.cos(step * i) * radius) + centerX
		const y1 = (Math.sin(step * i) * radius) + centerY
		const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
		const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

		ctx.beginPath()
		// ctx.strokeStyle = `hsl(${20 / 100 * i}, 100%, 50%)`
		ctx.strokeStyle = `rgb(253, 244, 244)`
		ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
		ctx.stroke()
	})
	
}

export default render;