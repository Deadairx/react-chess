import React, { useEffect, useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { ChessClient } from "./api/client";
import { io } from "socket.io-client";
import { StartGameRequest } from "./api/start-game.request";
import { request } from "https";
// chess types aren't playing nice right now
const Chess = require("chess.js");

const DEFAULT_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const App: React.FC = () => {
  const [chess] = useState<ChessInstance>(
    new Chess(DEFAULT_FEN)
  );

  const [socket] = useState(io('http://localhost:3001', { auth: { username: 'test' } }));

  const [chessClient] = useState(
    new ChessClient(socket)
  );

  useEffect(() => {
    const startGameRequest = new StartGameRequest({});
    startGameRequest.gameId = "test";

    chessClient.startGame(startGameRequest);
  }, []);

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move: ShortMove) => {
    if (chess.move(move)) {
      chessClient.makeMove(move);

      setTimeout(() => {
        const moves = chess.moves();

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);
          setFen(chess.fen());
        }
      }, 300);

      setFen(chess.fen());
    }
  };

  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
    </div>
  );
};

export default App;