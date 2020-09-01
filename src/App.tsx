import React, { useState } from "react";
import { SpriteContext } from "./context/SpriteContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { InputGroup, Slider, FormGroup } from "@blueprintjs/core";
import "./index.css";
import Board from "./components/Board";
import SpritesHandler from "./components/SpritesHandler";
import SpritePreview from "./components/SpritePreview";
function App() {
  const [sprite, setSprite] = useState([1]);

  const [numberRows, setNumberRows] = useState(10);
  const [numberColumns, setNumberColums] = useState(10);

  const [squareSize, setSquareSize] = useState(4);

  return (
    <div className="Main">
      <div className="Inputs">
        <h1>Adjust the size of each square</h1>

        <Slider
          min={1}
          max={5}
          stepSize={0.2}
          labelStepSize={10}
          onChange={(value: number) => setSquareSize(value)}
          value={squareSize}
          vertical={false}
          intent={"primary"}
        />
        <h1>Adjust the size of the board based on number of squares</h1>
        <div className="Number-Inputs">
          <FormGroup label="Number of Columns">
            <InputGroup
              className="number-input"
              intent={"primary"}
              type="number"
              defaultValue="10"
              min="1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumberColums(e.target.valueAsNumber)
              }
            />
          </FormGroup>
          <FormGroup label="Number of Rows">
            <InputGroup
              className="number-input"
              intent={"primary"}
              type="number"
              defaultValue="10"
              min="1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNumberRows(e.target.valueAsNumber)
              }
            />
          </FormGroup>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <SpriteContext.Provider value={{ sprite, setSprite }}>
          <div className="Order">
            <SpritesHandler
              NumberColumns={numberColumns}
              NumberRows={numberRows}
              SquareSize={squareSize}
            />
            <div className="board-sprite">
              <SpritePreview SquareSize={squareSize} />
              <Board
                NumberColumns={numberColumns}
                NumberRows={numberRows}
                SquareSize={squareSize}
              />
            </div>
          </div>
        </SpriteContext.Provider>
      </DndProvider>
    </div>
  );
}

export default App;
