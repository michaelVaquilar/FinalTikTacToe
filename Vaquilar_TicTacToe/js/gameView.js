export default class GameView {

    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
            <div class="header">
                <div class="headerTurn">
                </div>
                <div class="headerStatus">
                </div>
                <button type = "button" class="headerRestart">
                    <i class="material-icons">refresh</i>
                </button>

            </div>
            <div class="board">
                <div class="boardTile" data-index="0"></div>
                <div class="boardTile" data-index="1"></div>
                <div class="boardTile" data-index="2"></div>
                <div class="boardTile" data-index="3"></div>
                <div class="boardTile" data-index="4"></div>
                <div class="boardTile" data-index="5"></div>
                <div class="boardTile" data-index="6"></div>
                <div class="boardTile" data-index="7"></div>
                <div class="boardTile" data-index="8"></div>

            </div>
        `;

            this.onTileClick = undefined;
            this.onRestartClick = undefined;


            this.root.querySelectorAll(".boardTile").forEach(tile => {
                tile.addEventListener("click", () => {
                    if(this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                    }
                })
            });

            this.root.querySelector(".headerRestart").addEventListener("click", () =>{
                if(this.onRestartClick){
                    this.onRestartClick();
                }
                
            });
    }

    update(game) {
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    updateTurn(game) {
        this.root.querySelector(".headerTurn").textContent = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = "In progress";

        if(game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;
        } 
        else if(!game.isInProgress()) {
            status = `Its a tie!`;
        }

        this.root.querySelector(".headerStatus").textContent = status;

        this.root.querySelector
    }

    updateBoard(game) {
        const winningCombination = game.findWinningCombination();

        for(let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.boardTile[data-index="${i}"]`);


            tile.classList.remove("boardTileWinner");
            tile.textContent = game.board[i];

            if(winningCombination && winningCombination.includes(i)) {
                tile.classList.add("boardTileWinner");
                
            }
        }
    }


}