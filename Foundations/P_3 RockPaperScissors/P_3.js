choices = ['Rock', 'Paper', 'Scissors']
score = {'Player':0, 'Computer':0}

document.addEventListener('DOMContentLoaded', ()=>{
    generateHtml()
    document.querySelectorAll('button').forEach(button=>{
        button.addEventListener('click', (e)=>{
            result = compare(playerSelection(e.target), computerPlay())
            generateHtml(result)
        })
    })
})


function computerPlay()
{
    return choices[Math.random()*choices.length | 0]
}

function playerSelection(button)
{
    return button.dataset.value
}

function compare(player, computer)
{
    if ((player == 'Rock' && computer == 'Scissors') || (player == 'Paper' && computer == 'Rock') || (player == 'Scissors' && computer == 'Paper')) 
    {
        score.Player++
        return [1, {playerChoice:player, computerChoice:computer}]
    }
    else if ((computer == 'Rock' && player == 'Scissors') || (computer == 'Paper' && player == 'Rock') || (computer == 'Scissors' && player == 'Paper')) 
    {
        score.Computer++
        return [2, {playerChoice:player, computerChoice:computer}]
    }
    else
    {
        return [3, {playerChoice:player, computerChoice:computer}]
    }
}

function generateHtml(results)
{
    if (!results)
    {
        document.querySelector('#playerscore').innerHTML = score['Player']
        document.querySelector('#computerscore').innerHTML = score['Computer']
        if (score.Player == 5)
        declareWinner("Player")
        else if (score.Computer == 5)
        declareWinner("Computer")
    }
    else
    {
        const result = document.querySelector('#result')
        const playerchoice = document.querySelector('#playerchoice')
        const computerchoice = document.querySelector('#computerchoice')
        if (results[0] == 1)
        {
            result.innerHTML = "Player won!"
        }
        else if (results[0] ==2)
        {
            result.innerHTML = "Computer won!"
        }
        else
        {
            result.innerHTML = "Tie!"
        }
        playerchoice.innerHTML = results[1].playerChoice
        computerchoice.innerHTML = results[1].computerChoice
        generateHtml()
    }
}


function declareWinner(winner)
{
    document.querySelector('#footer').innerHTML = `<h2>${winner} has won </h2>`
    document.querySelector('.choices-body').innerHTML = `<button onClick = "window.location.reload()">Refresh</button>`
    
}