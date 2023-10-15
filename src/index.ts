const board = document.getElementById("game") as HTMLCanvasElement;
if (board == null){
    throw new Error("Canvas not found");
}

const ctx = board.getContext("2d")
if (ctx == null){
    throw new Error("Context not found");
}

const BOARD_WIDHT = 640;
const BOARD_HEIGHT = 640;

const CELLS_X = 8;
const CELLS_Y = 8;

const CELL_WIDTH = BOARD_WIDHT / CELLS_X;
const CELL_HEIGHT = BOARD_HEIGHT / CELLS_Y;

type Color = "black" | "white";

type PieceType = "pawn" | "rock" | "knight" | "bishop" | "queen" | "king";

type Position = {
    x: number
    y: number
}

type Piece = {
    color: Color
    type: PieceType
    hasMoved: boolean
    position: Position | null
}

type GameState = {
    pieces: Piece[]
}

const gameState: GameState = {
    pieces: [
        {
            color: "black",
            type: "rock",
            hasMoved: false,
            position: { x: 0, y: 0}
        },
        {
            color: "black",
            type: "knight",
            hasMoved: false,
            position: { x: 1, y: 0}
        },
        {
            color: "black",
            type: "bishop",
            hasMoved: false,
            position: { x: 2, y: 0}
        },
        {
            color: "black",
            type: "queen",
            hasMoved: false,
            position: { x: 3, y: 0}
        },
        {
            color: "black",
            type: "king",
            hasMoved: false,
            position: { x: 4, y: 0}
        },
        {
            color: "black",
            type: "bishop",
            hasMoved: false,
            position: { x: 5, y: 0}
        },
        {
            color: "black",
            type: "knight",
            hasMoved: false,
            position: { x: 6, y: 0}
        },
        {
            color: "black",
            type: "rock",
            hasMoved: false,
            position: { x: 7, y: 0}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 0, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 1, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 2, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 3, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 4, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 5, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 6, y: 1}
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 7, y: 1}
        },
        {
            color: "white",
            type: "rock",
            hasMoved: false,
            position: { x: 0, y: 7}
        },
        {
            color: "white",
            type: "knight",
            hasMoved: false,
            position: { x: 1, y: 7}
        },
        {
            color: "white",
            type: "bishop",
            hasMoved: false,
            position: { x: 2, y: 7}
        },
        {
            color: "white",
            type: "queen",
            hasMoved: false,
            position: { x: 3, y: 7}
        },
        {
            color: "white",
            type: "king",
            hasMoved: false,
            position: { x: 4, y: 7}
        },
        {
            color: "white",
            type: "bishop",
            hasMoved: false,
            position: { x: 5, y: 7}
        },
        {
            color: "white",
            type: "knight",
            hasMoved: false,
            position: { x: 6, y: 7}
        },
        {
            color: "white",
            type: "rock",
            hasMoved: false,
            position: { x: 7, y: 7}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 0, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 1, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 2, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 3, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 4, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 5, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 6, y: 6}
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 7, y: 6}
        },
    ]
} 

board.width = BOARD_WIDHT || 640;
board.height = BOARD_HEIGHT || 640;
board.style.border = "1px solid black"

ctx.fillStyle = "red";
ctx.fillRect(0,0, BOARD_WIDHT, BOARD_HEIGHT);

renderBoard(ctx, gameState);

function renderBoard(ctx: CanvasRenderingContext2D, state: GameState){
    const colors = ["#f0eec9", "#f59900"];
    for(let x = 0; x < CELLS_X; ++x){
        for(let y = 0; y < CELLS_Y; ++y){
            ctx.fillStyle = colors[(x + y) % 2];
            ctx.fillRect(CELL_WIDTH * x, CELL_HEIGHT * y, CELL_WIDTH, CELL_HEIGHT);
        }
    }

    for(let i = 0; i < state.pieces.length; i++){
        const piece = state.pieces[i];
        if(piece.position == null){
            continue;
        }
        const image = document.createElement("img");
        image.src = pieceImageURL(piece);
        image.onload = function() {
            ctx.drawImage(image, CELL_WIDTH * piece?.position.x, CELL_HEIGHT * piece.position.y, CELL_WIDTH, CELL_HEIGHT)
        };
        console.log(piece);
    }
}

function pieceImageURL(piece: Piece){
    return `assets/${piece.color}-${piece.type}.png`;
}



