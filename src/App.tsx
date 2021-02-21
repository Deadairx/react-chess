import React from "react";
import "./App.css";
import Chessboard from "chessboardjsx";

const App: React.FC = () => {
  return (
    <div className="flex-center">
      <h1>Random Chess</h1>
      <Chessboard
        width={400}
        position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      />
    </div>
  );
};

export default App;