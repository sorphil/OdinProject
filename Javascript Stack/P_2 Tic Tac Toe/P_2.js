




const gameBoard = (()=>{
    // Public variable
    let board = {markers: [], positions: []};
    // to generate intial value of board
    for (let i=0; i<9; i++)
    {
        let prefix = (i>=3)?(Math.floor(i/3)):(0)
        let postfix = (i>=3)?(i-3*prefix):(i)
        board.positions.push(`${prefix}-${postfix}`);
        board.markers.push("")
    }
    
    //create divs inside container
    document.addEventListener('DOMContentLoaded', ()=>{
        let container = document.querySelector('.container')
        board.positions.forEach((posValue)=>{
            const tile = document.createElement('div');
            tile.className = "tile";
            [tile.dataset.positionY, tile.dataset.positionX] = [posValue.split("-")[0], posValue.split("-")[1]];
            tile.addEventListener('click', _addTileEvents);
            container.appendChild(tile);
        })
    })
    
  

    const _addTileEvents = function(){
        const index = board.positions.indexOf(`${this.dataset.positionY}-${this.dataset.positionX}`)
        if(board.markers[index]!=""){return}
        board.markers[index] = game.currentPlayer.marker
        this.innerHTML = `<h1>${game.currentPlayer.marker}</h1>`
        game.currentPlayerChange()
      
    }
    
    return {board: board}
})();



// const playerControl = (()=>{
//     const createPlayer = (name, marker, type) => {return {name:name, marker:marker, type:type}}
//     return {createPlayer}
// })();

const createPlayer = (name, marker, type) => {return {name:name, marker:marker, type:type}}

 

const game = (()=>{
    let _players = [{name:'Philip', marker:"X", type:"Human"}, {name:'Greg', marker:"O", type:"Human"}]
    let currentPlayer = _players[0]
    let currentPlayerChange =  function() {
        _watchBoard()
        this.currentPlayer = (this.currentPlayer===_players[0]?_players[1]:_players[0])
        
    }
    
    let _watchBoard = ()=>{
        // remove empty array elements
        let trimArray = (arr)=>arr.filter((ele)=>ele!="")

        let _currentBoard = gameBoard.board
        let xTiles = []
        let oTiles = []
        _currentBoard.markers.forEach((tile, index)=>{
            if(tile!="")
            {
                // returns integer for y-x position and pushes it as an object for X and O respectively
                const tilePositionInteger = () => { return {y: parseInt(_currentBoard.positions[index].split("-")[0]),  x: parseInt(_currentBoard.positions[index].split("-")[1])}}
                if(tile=="X"){xTiles[index]=tilePositionInteger()}
                else if(tile=="O"){oTiles[index]=tilePositionInteger()}
            }
        })
        _checkWinner( trimArray(xTiles), trimArray(oTiles))
    }

    let _checkWinner = (xTiles, oTiles) =>{
        const _checkVertical = (arr)=>{
            let total = {zeroX:0, oneX:0, twoX:0}
            for(let i=0;i<arr.length;i++)
            {
                if(arr[i].x==0){total.zeroX++}
                else if(arr[i].x==1){total.oneX++} 
                else if(arr[i].x==2){total.twoX++} 
            }
            // console.log(total)
            for (let key in total) {
                
                if (total.hasOwnProperty(key)) {
                    if(total[key]==3)
                    {
                        return true
                    }

                }
            }
            
        }

        const _checkHorizontal = (arr)=>{
            let total = {zeroY:0, oneY:0, twoY:0}
            for(let i=0;i<arr.length;i++)
            {
                if(arr[i].y==0){total.zeroY++}
                else if(arr[i].y==1){total.oneY++} 
                else if(arr[i].y==2){total.twoY++} 
            }
            // console.log(total)
            for (let key in total) {
                // console.log(key)
                if (total.hasOwnProperty(key)) {
                    if(total[key]==3)
                    {
                        return true
                    }
                }
            }
        }
        
        if(game.currentPlayer==_players[0])
        {if(_checkVertical(xTiles)){alert("WINNER")}
        if(_checkHorizontal(xTiles)){alert("WINNER")}
        }
        else if(game.currentPlayer==_players[1])
        {console.log(oTiles)
            if(_checkVertical(oTiles)){alert("WINNER")}
        if(_checkHorizontal(oTiles)){alert("WINNER")}
        }

    }

    return {currentPlayer, currentPlayerChange}
})();

// document.querySelector('html').addEventListener('click', ()=>{console.log(game.currentPlayer); game.currentPlayerChange})



