/** Renders radial lines from the center of the canvas
 * @param {UINT8 Array} frequencyArray 
 * @param {Canvas context} ctx 
 * @param {number} canvas center x 
 * @param {number} canvas center y 
 * @param {number} inner radius 
 */


function renderHypnoticCircles(frequencyArray, ctx, centerX, centerY) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  const maxRadius = 200; // Maximum radius of the circles
  const circleCount = frequencyArray.length;

  for (let i = 0; i < circleCount; i++) {
    const circleRadius = maxRadius * (frequencyArray[i] / 255); // Vary radius based on frequency data
    const angle = (i / circleCount) * Math.PI * 2;

    // Calculate circle positions using polar to Cartesian coordinates
    const x = centerX + circleRadius * Math.cos(angle);
    const y = centerY + circleRadius * Math.sin(angle);

    // Set color based on frequency data
    const hue = (i / circleCount) * 360;
    ctx.fillStyle = `hsl(${hue}, 50%, 50%)`; // Use HSL for colorful variation

    // Draw circles at different positions and sizes
    ctx.beginPath();
    ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Usage in your code
function render() {
  
function render(frequencyArray, ctx, centerX, centerY, radius) {
	ctx.clearRect(0, 0, 30, 300)

	ctx.beginPath()
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
	ctx.strokeStyle = 'purple';
	ctx.stroke()
	ctx.fillStyle = 'orange';
	ctx.fill()

	const bars = frequencyArray.length
	const barMaxLength = (20 - radius) / 2
	const step = Math.PI * 3 / bars

	frequencyArray.forEach((f, i) => {
		const barLength = f / 1 * barMaxLength 
		
		const x1 = (Math.cos(step * i) * radius) + centerX
		const y1 = (Math.sin(step * i) * radius) + centerY
		const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX
		const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY

		// ctx.moveTo(x1, y1)
		ctx.lineTo(x2, y2)
	})
		
	ctx.stroke()
}

  renderHypnoticCircles(frequencyArray, ctx, canvas.width / 2, canvas.height / 2);
  requestAnimationFrame(render);
}

export default renderHypnoticCircles;