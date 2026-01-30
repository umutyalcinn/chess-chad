"use strict";
const board = document.getElementById("game");
if (board == null) {
    throw new Error("Canvas not found");
}
const ctx = board.getContext("2d");
if (ctx == null) {
    throw new Error("Context not found");
}
board.addEventListener("click", (e) => {
    const x = Math.floor(e.offsetX / CELL_WIDTH);
    const y = Math.floor(e.offsetY / CELL_HEIGHT);
    const piece = getPieceByPosition(gameState, { x: x, y: y });
    if (piece == null) {
        return;
    }
    if (piece.position == null) {
        throw new Error("Moving captured piece!");
    }
    if (piece != null) {
        const moves = validMoves(gameState, piece);
        for (let i = 0; i < moves.length; ++i) {
            const move = moves[i];
            const moveX = move.xOffset + piece.position.x;
            const moveY = move.yOffset + piece.position.y;
            const oldFillStyle = ctx.fillStyle;
            ctx.beginPath();
            ctx.arc(moveX * CELL_WIDTH + CELL_WIDTH / 2, moveY * CELL_HEIGHT + CELL_HEIGHT / 2, 10, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.fillStyle = oldFillStyle;
        }
    }
});
const BOARD_WIDHT = 640;
const BOARD_HEIGHT = 640;
const CELL_COUNT_X = 8;
const CELL_COUNT_Y = 8;
const CELL_WIDTH = BOARD_WIDHT / CELL_COUNT_X;
const CELL_HEIGHT = BOARD_HEIGHT / CELL_COUNT_Y;
const gameState = {
    pieces: [
        {
            color: "black",
            type: "rock",
            hasMoved: false,
            position: { x: 0, y: 0 }
        },
        {
            color: "black",
            type: "knight",
            hasMoved: false,
            position: { x: 1, y: 0 }
        },
        {
            color: "black",
            type: "bishop",
            hasMoved: false,
            position: { x: 2, y: 0 }
        },
        {
            color: "black",
            type: "queen",
            hasMoved: false,
            position: { x: 3, y: 0 }
        },
        {
            color: "black",
            type: "king",
            hasMoved: false,
            position: { x: 4, y: 0 }
        },
        {
            color: "black",
            type: "bishop",
            hasMoved: false,
            position: { x: 5, y: 0 }
        },
        {
            color: "black",
            type: "knight",
            hasMoved: false,
            position: { x: 6, y: 0 }
        },
        {
            color: "black",
            type: "rock",
            hasMoved: false,
            position: { x: 7, y: 0 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 0, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 1, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 2, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 3, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 4, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 5, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 6, y: 1 }
        },
        {
            color: "black",
            type: "pawn",
            hasMoved: false,
            position: { x: 7, y: 1 }
        },
        {
            color: "white",
            type: "rock",
            hasMoved: false,
            position: { x: 0, y: 7 }
        },
        {
            color: "white",
            type: "knight",
            hasMoved: false,
            position: { x: 1, y: 7 }
        },
        {
            color: "white",
            type: "bishop",
            hasMoved: false,
            position: { x: 2, y: 7 }
        },
        {
            color: "white",
            type: "queen",
            hasMoved: false,
            position: { x: 3, y: 7 }
        },
        {
            color: "white",
            type: "king",
            hasMoved: false,
            position: { x: 4, y: 7 }
        },
        {
            color: "white",
            type: "bishop",
            hasMoved: false,
            position: { x: 5, y: 7 }
        },
        {
            color: "white",
            type: "knight",
            hasMoved: false,
            position: { x: 6, y: 7 }
        },
        {
            color: "white",
            type: "rock",
            hasMoved: false,
            position: { x: 7, y: 7 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 0, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 1, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 2, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 3, y: 4 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 4, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 5, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 6, y: 6 }
        },
        {
            color: "white",
            type: "pawn",
            hasMoved: false,
            position: { x: 7, y: 6 }
        },
    ]
};
board.width = BOARD_WIDHT || 640;
board.height = BOARD_HEIGHT || 640;
board.style.border = "1px solid black";
ctx.fillStyle = "red";
ctx.fillRect(0, 0, BOARD_WIDHT, BOARD_HEIGHT);
renderBoard(ctx, gameState);
function renderBoard(ctx, state) {
    const colors = ["#f0eec9", "#f59900"];
    for (let x = 0; x < CELL_COUNT_X; ++x) {
        for (let y = 0; y < CELL_COUNT_Y; ++y) {
            ctx.fillStyle = colors[(x + y) % 2];
            ctx.fillRect(CELL_WIDTH * x, CELL_HEIGHT * y, CELL_WIDTH, CELL_HEIGHT);
        }
    }
    for (let i = 0; i < state.pieces.length; i++) {
        const piece = state.pieces[i];
        if (piece.position == null) {
            continue;
        }
        const image = document.createElement("img");
        image.src = pieceImageURL(piece);
        image.onload = function () {
            var _a;
            if (((_a = piece.position) === null || _a === void 0 ? void 0 : _a.y) === undefined)
                return;
            ctx.drawImage(image, CELL_WIDTH * (piece === null || piece === void 0 ? void 0 : piece.position.x), CELL_HEIGHT * (piece === null || piece === void 0 ? void 0 : piece.position.y), CELL_WIDTH, CELL_HEIGHT);
        };
    }
}
function getPieceByPosition(state, position) {
    for (let i = 0; i < state.pieces.length; i++) {
        let piece = state.pieces[i];
        if (piece.position == null) {
            continue;
        }
        if (piece.position.x === position.x && piece.position.y === position.y) {
            return piece;
        }
    }
    return null;
}
function pieceImageURL(piece) {
    return `assets/${piece.color}-${piece.type}.png`;
}
function validMoves(state, piece) {
    if (piece.position == null) {
        throw new Error("Moving captured piece!");
    }
    let moves = [];
    switch (piece.type) {
        case "pawn":
            {
                let colorFactor = piece.color == "black" ? 1 : -1;
                let moveList = [
                    { xOffset: 0, yOffset: 1 * colorFactor },
                    { xOffset: 0, yOffset: 2 * colorFactor },
                    { xOffset: 1, yOffset: 1 * colorFactor },
                    { xOffset: -1, yOffset: 1 * colorFactor },
                ];
                for (let i = 0; i < 2; ++i) {
                    let move = moveList[i];
                    if (!isMoveInBorders(piece, move)) {
                        continue;
                    }
                    if (getPieceByPosition(state, positionAfterMove(piece, move)) != null) {
                        break;
                    }
                    moves.push(move);
                }
                for (let i = 2; i < 4; ++i) {
                    let move = moveList[i];
                    if (!isMoveInBorders(piece, move)) {
                        continue;
                    }
                    if (getPieceByPosition(state, positionAfterMove(piece, move)) != null) {
                        moves.push(move);
                    }
                }
                break;
            }
            ;
        case "knight":
            {
                let moveList = [
                    { xOffset: 1, yOffset: 2 },
                    { xOffset: 1, yOffset: -2 },
                    { xOffset: -1, yOffset: 2 },
                    { xOffset: -1, yOffset: -2 },
                    { xOffset: 2, yOffset: 1 },
                    { xOffset: -2, yOffset: 1 },
                    { xOffset: 2, yOffset: -1 },
                    { xOffset: -2, yOffset: -1 },
                ];
                for (let i = 0; i < moveList.length; ++i) {
                    let move = moveList[i];
                    if (!isMoveInBorders(piece, move)) {
                        continue;
                    }
                    let pieceInMovePos = getPieceByPosition(state, positionAfterMove(piece, move));
                    if (pieceInMovePos == null || pieceInMovePos.color != piece.color) {
                        moves.push(move);
                    }
                }
                break;
            }
            ;
        case "bishop":
            {
                let aBlock = false;
                let bBlock = false;
                let cBlock = false;
                let dBlock = false;
                for (let i = 1; i < max(CELL_COUNT_X, CELL_COUNT_Y); ++i) {
                    let moveA = { xOffset: i, yOffset: i };
                    let moveB = { xOffset: -i, yOffset: i };
                    let moveC = { xOffset: i, yOffset: -i };
                    let moveD = { xOffset: -i, yOffset: -i };
                    if (!aBlock && getPieceByPosition(state, positionAfterMove(piece, moveA)) != null) {
                        aBlock = true;
                    }
                    if (!bBlock && getPieceByPosition(state, positionAfterMove(piece, moveB)) != null) {
                        bBlock = true;
                    }
                    if (!cBlock && getPieceByPosition(state, positionAfterMove(piece, moveC)) != null) {
                        cBlock = true;
                    }
                    if (!dBlock && getPieceByPosition(state, positionAfterMove(piece, moveD)) != null) {
                        dBlock = true;
                    }
                    if (isMoveInBorders(piece, moveA) && !aBlock) {
                        moves.push(moveA);
                    }
                    if (isMoveInBorders(piece, moveB) && !bBlock) {
                        moves.push(moveB);
                    }
                    if (isMoveInBorders(piece, moveC) && !cBlock) {
                        moves.push(moveC);
                    }
                    if (isMoveInBorders(piece, moveD) && !dBlock) {
                        moves.push(moveD);
                    }
                }
                break;
            }
            ;
        case "queen":
            {
                let aBlock = false;
                let bBlock = false;
                let cBlock = false;
                let dBlock = false;
                let eBlock = false;
                let fBlock = false;
                let gBlock = false;
                let hBlock = false;
                let possibleMoves = [];
                for (let i = 0; i < max(CELL_COUNT_X, CELL_COUNT_Y); ++i) {
                    possibleMoves.push({ xOffset: 0, yOffset: i });
                    possibleMoves.push({ xOffset: 0, yOffset: -i });
                    possibleMoves.push({ xOffset: i, yOffset: 0 });
                    possibleMoves.push({ xOffset: -i, yOffset: 0 });
                    possibleMoves.push({ xOffset: i, yOffset: i });
                    possibleMoves.push({ xOffset: -i, yOffset: i });
                    possibleMoves.push({ xOffset: i, yOffset: -i });
                    possibleMoves.push({ xOffset: -i, yOffset: -i });
                }
                break;
            }
            ;
    }
    return moves;
}
function positionAfterMove(piece, move) {
    if (piece.position == null) {
        throw new Error("Moving captured piece!");
    }
    let newPosition = { x: piece.position.x + move.xOffset, y: piece.position.y + move.yOffset };
    return newPosition;
}
function max(a, b) {
    return a > b ? a : b;
}
function isMoveInBorders(piece, move) {
    if (piece.position == null) {
        throw new Error("Moving captured piece!");
    }
    return !(piece.position.x + move.xOffset < 0
        || piece.position.x + move.xOffset >= CELL_COUNT_X
        || piece.position.y + move.yOffset < 0
        || piece.position.y + move.yOffset >= CELL_COUNT_Y);
}
for (let i = 0; i < gameState.pieces.length; ++i) {
    console.log(validMoves(gameState, gameState.pieces[i]));
}
