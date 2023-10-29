/**
 * @param {UINT8 0Array} frequencyArray 
 * @param {canvas context} ctx 
 */

function render(frequencyArray, ctx) {
    const circles = frequencyArray.length 
    const colorStep = 500 / circles

    ctx.lineWidth = .5

    frequencyArray.forEach((f, i) => {
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${colorStep * i}, 100%, 50%, 0.1)`
        ctx.strokeStyle = 'orange'
        ctx.stroke()
    })
}

export default render;


