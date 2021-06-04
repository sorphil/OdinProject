const htmlBody = document.querySelector('html')

let hue = 0
let isActive = false
document.addEventListener('DOMContentLoaded', ()=>{

    const dimesnsionSlider = document.querySelector('.dimensionSlider')
    let gridDimension = dimesnsionSlider.value
    gridGenerate(gridDimension)
    dimesnsionSlider.addEventListener('change', (e)=>
    {
        gridGenerate(e.target.value)
    })
    
})

function gridGenerate(gridDimension)
{
    const container = document.querySelector('.container')
    container.innerHTML = ""
    container.style.cssText = `grid-template-columns: repeat(${gridDimension},${600/gridDimension}px); 
                                grid-template-rows: repeat(${gridDimension},${600/gridDimension}px);
                                `
    const dimensionText = document.querySelector('.dimensionText')
    dimensionText.innerHTML = ""
    dimensionText.innerHTML = `${gridDimension} x ${gridDimension}`
    for(let i = 0; i<gridDimension;i++)
    {
        for (let j = 0; j<gridDimension;j++)
        {
            const div = document.createElement('div')
            div.className = "gridDiv"
            div.style.cssText= `height: ${600/gridDimension}px; width: ${600/gridDimension}px;`
            addGridEventListeners(div)
            container.appendChild(div)
        }       
    }
}


function addGridEventListeners(div)
{
    
    div.addEventListener('mousemove', rainbowStroke)
    div.addEventListener('mousedown', () => isActive = true)
    htmlBody.addEventListener('mouseup', ()=> isActive = false)
    div.ondragstart = function() { return false; };
}


function rainbowStroke(e)
{
    if(!isActive) return
    e.target.style.background = `hsl(${hue}, 100%, 50%)`
    hue++
}


