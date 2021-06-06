const htmlBody = document.querySelector('html')
let toggle = 0
let hexColor = ""
let hue = 0
let isActive = false
document.addEventListener('DOMContentLoaded', ()=>{

    const dimesnsionSlider = document.querySelector('#dimensionSlider')
    const colorPicker = document.querySelector('#colorPicker')
    const toggleButtons = document.querySelectorAll('.toggle')
    const clearbtn = document.querySelector('#clearbtn')
    hexColor = colorPicker.value
    toggleButtons.forEach((button)=>{
        button.addEventListener('click', ()=>
        {
            button.classList.toggle('activebtn')
            toggleButtons.forEach(btn => {
                if(btn.id != button.id)
                {
                    btn.classList.remove('activebtn')
                }
            })
            if (button.id=="rainbowToggle") toggle = 0
            else if (button.id=="eraserToggle") toggle = 1
            else if (button.id =="solidToggle") toggle = -1
        })
    })
    colorPicker.addEventListener('change', (e)=>hexColor=e.target.value)
    clearbtn.addEventListener('click', ()=>gridGenerate(gridDimension))
    dimesnsionSlider.addEventListener('change', (e)=>
    {
        gridDimension = e.target.value
        gridGenerate(gridDimension)
    })


    let gridDimension = dimesnsionSlider.value
    gridGenerate(gridDimension)
})



function gridGenerate(gridDimension)
{
    const container = document.querySelector('.container')
    container.innerHTML = ""
    container.style.cssText = `grid-template-columns: repeat(${gridDimension},${600/gridDimension}px); 
                                grid-template-rows: repeat(${gridDimension},${600/gridDimension}px);
                                `
    const dimensionText = document.querySelector('#dimensionText')
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
    
    div.addEventListener('mousemove', (e)=>{

        if(toggle==-1) solidStroke(e)
        else if (toggle==0) rainbowStroke(e)
        else eraserStroke(e)
    })
    div.addEventListener('mousedown', () => isActive = true)
    htmlBody.addEventListener('mouseup', ()=> isActive = false)
    div.ondragstart = function() { return false; };
}


function rainbowStroke(e)
{
    if(!isActive) return
    e.target.style.background = `hsl(${hue}, 100%, 50%)`
    hue+=3
}

function solidStroke(e)
{
    if(!isActive) return
    e.target.style.background = hexColor
}

function eraserStroke(e)
{
    if(!isActive) return
    e.target.style.background = "white"
}
