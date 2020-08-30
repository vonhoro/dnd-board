import React, { useState} from "react";
import { SpriteContext } from "./context/SpriteContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { InputGroup, Slider } from "@blueprintjs/core";
import "./index.css";
import Board from "./components/Board";
import SpritesHandler from "./components/SpritesHandler";
console.log({ DndProvider });


function App() {
   const [sprite,setSprite]= useState([1])
  const [numberS, setNumberS] = useState(10);
  const [squareSize, setSquareSize] = useState(4);

  return (
    <div className="App">
      <div className="Inputs">
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
        <InputGroup
          type="number"
          defaultValue="10"
          min="1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumberS(e.target.valueAsNumber)
          }
          placeholder="IDK LOL"
        />
      </div>
      <DndProvider backend={HTML5Backend}>
        <SpriteContext.Provider value={{sprite,setSprite}}>
          <SpritesHandler SquareSize={squareSize} />
          <Board NumberS={numberS} SquareSize={squareSize} />
        </SpriteContext.Provider>
      </DndProvider>
    </div>
  );
}

export default App;
