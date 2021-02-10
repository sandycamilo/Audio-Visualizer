// -------------------------------------------------

/**
 * 
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 */

function render(frequencyArray, ctx, width, height) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fillRect(90, 90, 0, 0)
    ctx.fill()

    const circles = frequencyArray.length 
    const colorStep = 90 / circles

    ctx.lineWidth = 3

    frequencyArray.forEach((f, i) => {
        // normalize value 
        const w = f / 255 * width
        const h = f /  255 * height
        // starts a new drawing
        ctx.beginPath()
        // draw a rectangle 
        ctx.rect(0, 0, w, h)
        ctx.rect(40, 40, w, h)
        ctx.rect(150, 150, w, h)
        ctx.rect(150, 150, w, h)
        ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.1)`
        ctx.stroke()
    })
}

export default render


