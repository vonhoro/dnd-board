import React, { useState, useEffect, useContext, useRef } from "react";
import { SpriteContext } from "../context/SpriteContext";

import image1 from "../sprites/1.png";
import image2 from "../sprites/2.png";
import image3 from "../sprites/3.png";
import image4 from "../sprites/4.png";
import image5 from "../sprites/5.png";
import image6 from "../sprites/6.png";
import image7 from "../sprites/7.png";
import image8 from "../sprites/8.png";
import image9 from "../sprites/9.png";
import image10 from "../sprites/10.png";

const imageArray = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];
type BoardProps = { NumberS: number; SquareSize: number };

const Board = ({ NumberS, SquareSize }: BoardProps) => {
  const { sprite, setSprite } = useContext(SpriteContext);
  const [numberSprites, setNumberSprites] = useState(0);
  const [prevSquare, setPrevSquare] = useState(null);
  const [squareWasClicked, setSquareWasClicked] = useState(false);
  const [numberArray, setNumberArray] = useState<null | Array<any>>(null);
  const [squareHightLight, setSquareHightLight] = useState(false);
  const [numberColumns, setNumberColumns] = useState({
    gridTemplateColumns: "auto",
  });
  const arr = [...new Array(NumberS * NumberS)].map((_, index) => index);
  const spriteRef = useRef(arr);
  const spriteRefUse = (index) => (element) => {
    spriteRef.current[index] = element;
  };

  const [squareSize, setSquareSize] = useState({ height: "4em", width: "4em" });
  const [spriteSize, setSpriteSize] = useState({ height: "4em", width: "4em" });
  useEffect(() => {
    let array = Array.from(Array(NumberS * NumberS)).map((elemen, index) => {
      return {
        content: "",
        coordinate: [Math.trunc(index / NumberS + 1), (index % NumberS) + 1],
      };
    });
    setNumberArray(array);
    let numberOfColumns = "";

    for (let i = 0; i < NumberS; i++) {
      numberOfColumns += `auto `;
    }
    setNumberColumns({ gridTemplateColumns: numberOfColumns });
    setNumberSprites(0);
  }, [NumberS]);

  useEffect(() => {
    const squareSize = SquareSize + "em";

    setSquareSize({ height: squareSize, width: squareSize });
  }, [SquareSize]);

  const putSprite = (e, index, type) => {
    spriteRef.current[index].focus();
    setSquareHightLight(true);
    console.log(e.target.style);
    console.log(type);
    if (squareWasClicked) {
      const acomodateBoard = numberArray;

      const temp = acomodateBoard[prevSquare].coordinate;
      acomodateBoard[prevSquare].coordinate = acomodateBoard[index].coordinate;
      acomodateBoard[index].coordinate = temp;

      setNumberArray(acomodateBoard);
      setSquareWasClicked(false);
    } else {
      setPrevSquare(index);
      setSquareWasClicked(true);
    }
  };
  const removeSprite = (e, index) => {
    e.preventDefault();
    const modifyArray = numberArray;

    modifyArray[index].content = "";
    setNumberArray(modifyArray);
    setNumberSprites(numberSprites - 1);
    setSquareWasClicked(false);
  };
  const rotateSprite = () => {
    console.log("aaaaaaaaadladlkakdladkladadl");
  };
  useEffect(() => {
    const modifyArray = numberArray;
    if (numberSprites === NumberS * NumberS) return;
    if (sprite.length === 3) {
      const number = numberSprites;

      modifyArray[number].content = imageArray[sprite[0]];
      modifyArray[number] = {
        ...modifyArray[number],
        size: [sprite[1], sprite[2]],
        rotation: 0,
        translation: [0, 0],
      };
      setNumberArray(modifyArray);
      setNumberSprites(number + 1 * sprite[1]);
    }
  }, [sprite]);
  return (
    <>
      <div className="Board" style={numberColumns}>
        {numberArray ? (
          <>
            {numberArray.map((square, index) => (
              <>
                {
                  square.content !== "" ? (
                    <img
                      ref={spriteRefUse(index)}
                      className="sprite"
                      src={square.content}
                      alt="sprite"
                      key={index + 100}
                      tabIndex="0"
                      style={{
                        width: `${SquareSize * square.size[0]}em`,
                        height: `${SquareSize * square.size[1]}em`,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]} /span ${NumberS} / span ${NumberS}`,
                        transform: `rotate(${square.rotation}deg) translate(${square.translation[0]}%,${square.translation[1]}%)`,
                      }}
                      onKeyUp={(e) => {
                        rotateSprite();
                      }}
                      onFocus={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                      onClick={(e) => putSprite(e, index, "sprite")}
                      onContextMenu={(e) => removeSprite(e, index)}
                      onMouseLeave={(e) => {
                        if (squareHightLight) {
                          setSquareHightLight(false);
                          return;
                        }
                        e.target.style.backgroundColor = "#30404d";
                      }}
                    />
                  ) : (
                    <div
                      onFocus={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                      key={index}
                      ref={spriteRefUse(index)}
                      className="square"
                      style={{
                        ...squareSize,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]}`,
                      }}
                      onClick={(e) => putSprite(e, index, "square")}
                      onMouseLeave={(e) => {
                        if (squareHightLight) {
                          setSquareHightLight(false);
                          return;
                        }
                        e.target.style.backgroundColor = "#202b33";
                      }}
                    >
                      {""}
                    </div>
                  )
                  // </Droppable>
                }{" "}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Board;
