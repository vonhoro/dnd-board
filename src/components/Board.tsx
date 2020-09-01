import React, { useState, useEffect, useRef, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { moveSprite } from "../utils/moveSprite";
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
type BoardProps = {
  NumberColumns: number;
  NumberRows: number;
  SquareSize: number;
};

const Board = ({ NumberColumns, NumberRows, SquareSize }: BoardProps) => {
  // context
  const { sprite, setSprite } = useContext(SpriteContext);

  // states

  const [prevSquare, setPrevSquare] = useState(null);
  const [squareWasClicked, setSquareWasClicked] = useState(false);
  const [numberArray, setNumberArray] = useState<null | Array<any>>(null);
  const [squareHightLight, setSquareHightLight] = useState(false);
  const [orderSprites, setOrderSprites] = useState<number>(0);
  const [numberColumns, setNumberColumns] = useState({
    gridTemplateColumns: "auto",
  });
  const [rotatingSprite, setRotatingSprite] = useState(false);

  const [squareSize, setSquareSize] = useState({ height: "4em", width: "4em" });

  // ref
  const arr: Array<number> = [...new Array(NumberColumns * NumberRows)].map(
    (_, index) => index
  );
  const spriteRef = useRef<any>(arr);
  const spriteRefUse = (index: number) => (element: HTMLElement) => {
    spriteRef.current[index] = element;
  };

  // effects

  useEffect(() => {
    let row: number = 1;
    let column: number = 0;
    let array = Array.from(Array(NumberColumns * NumberRows)).map(() => {
      column = column === NumberColumns ? 0 : column;
      column += 1;

      row = column === 1 ? row + 1 : row;

      return {
        content: "",
        coordinate: [row, column],
        size: [0, 0],
      };
    });
    setNumberArray(array);
    let numberOfColumns = "";

    for (let i = 0; i < NumberColumns; i++) {
      numberOfColumns += `auto `;
    }
    console.log(numberOfColumns);
    setNumberColumns({ gridTemplateColumns: numberOfColumns });
  }, [NumberColumns, NumberRows]);

  useEffect(() => {
    const squareSize = SquareSize + "em";

    setSquareSize({ height: squareSize, width: squareSize });
  }, [SquareSize]);

  // functions

  const putSprite = (e: any, index: number, type: string) => {
    if (sprite.length === 3) {
      const modifyArray = numberArray;

      modifyArray[index].content = imageArray[sprite[0]];
      modifyArray[index] = {
        ...modifyArray[index],
        size: [sprite[1], sprite[2]],
        rotation: 0,
        translation: [0, 0],
        ofSet: [0, 1],
        order: orderSprites,
      };
      setOrderSprites(orderSprites + 1);
      setNumberArray(modifyArray);
      setSquareWasClicked(false);
      setSprite([1]);
      return;
    }

    setSquareHightLight(true);
    if (type === "sprite") {
      spriteRef.current[index].focus();
    }
    if (squareWasClicked) {
      if (type === "sprite") {
        spriteRef.current[index].style.backgroundColor = "#30404d";
      } else {
        spriteRef.current[index].style.backgroundColor = "#202b33";
      }

      const acomodateBoard = numberArray;

      const temp = acomodateBoard[prevSquare].coordinate;
      acomodateBoard[prevSquare].coordinate = acomodateBoard[index].coordinate;
      acomodateBoard[index].coordinate = temp;

      setNumberArray(acomodateBoard);
      setSquareWasClicked(false);
    } else {
      spriteRef.current[index].style.backgroundColor = "white";
      setPrevSquare(index);
      setSquareWasClicked(true);
    }
  };
  const removeSprite = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const modifyArray = numberArray;
    setOrderSprites(orderSprites - 1);
    modifyArray[index].content = "";
    setNumberArray(modifyArray);
    setRotatingSprite(!rotatingSprite);
    setSquareWasClicked(false);
  };
  const rotateSprite = (e: React.KeyboardEvent, index: number) => {
    const modifyArray = numberArray;
    e.preventDefault();

    const check = moveSprite(numberArray[index], e.key);
    if (check) {
      modifyArray[index] = check;
      setSquareWasClicked(false);
      setRotatingSprite(!rotatingSprite);
      setNumberArray(modifyArray);
    }
    if (e.key === "a" || e.key === "A") {
      switch (modifyArray[index].rotation) {
        case 0:
          modifyArray[index].ofSet = [1, 0];
          break;
        case 90:
          modifyArray[index].ofSet = [0, -1];
          break;
        case -90:
          modifyArray[index].ofSet = [0, 1];
          break;
        case 180:
          modifyArray[index].ofSet = [-1, 0];
          break;
      }
      setRotatingSprite(!rotatingSprite);
      setNumberArray(modifyArray);
    } else if (e.key === "d" || e.key === "D") {
      switch (modifyArray[index].rotation) {
        case 0:
          modifyArray[index].ofSet = [-1, 0];
          break;
        case 90:
          modifyArray[index].ofSet = [0, 1];
          break;
        case -90:
          modifyArray[index].ofSet = [0, -1];
          break;
        case 180:
          modifyArray[index].ofSet = [1, 0];
          break;
      }
      setRotatingSprite(!rotatingSprite);
      setNumberArray(modifyArray);
    } else if (e.key === "s" || e.key === "S") {
      switch (modifyArray[index].rotation) {
        case 0:
          modifyArray[index].ofSet = [0, -1];
          break;
        case 90:
          modifyArray[index].ofSet = [-1, 0];
          break;
        case -90:
          modifyArray[index].ofSet = [1, 0];
          break;
        case 180:
          modifyArray[index].ofSet = [0, 1];
          break;
      }
      setRotatingSprite(!rotatingSprite);
      setNumberArray(modifyArray);
    } else if (e.key === "w" || e.key === "W") {
      switch (modifyArray[index].rotation) {
        case 0:
          modifyArray[index].ofSet = [0, 1];
          break;
        case 90:
          modifyArray[index].ofSet = [1, 0];
          break;
        case -90:
          modifyArray[index].ofSet = [-1, 0];
          break;
        case 180:
          modifyArray[index].ofSet = [0, -1];
          break;
      }
      setRotatingSprite(!rotatingSprite);
      setNumberArray(modifyArray);
    }
  };

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
                      onFocus={(e) => (e.target.style.backgroundColor = "blue")}
                      tabIndex={index}
                      style={{
                        width: `${SquareSize * square.size[0]}em`,
                        height: `${SquareSize * square.size[1]}em`,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]} /span ${NumberRows} / span ${NumberColumns}`,
                        transform: `rotate(${square.rotation}deg) translate(${square.translation[0]}%,${square.translation[1]}%)`,
                        boxShadow: `${square.ofSet[0]}em ${square.ofSet[1]}em 0 0 #106BA3 inset`,
                        zIndex: 2 + square.order,
                      }}
                      onKeyUp={(e) => {
                        rotateSprite(e, index);
                      }}
                      onBlur={(e) =>
                        (e.target.style.backgroundColor = "#30404d")
                      }
                      onClick={(e) => putSprite(e, index, "sprite")}
                      onContextMenu={(e) => removeSprite(e, index)}
                      onMouseLeave={(e: any) => {
                        if (squareHightLight) {
                          setSquareHightLight(false);
                          return;
                        }
                        const Sprite = e.target;

                        Sprite.style.backgroundColor = "#30404d";
                      }}
                    />
                  ) : (
                    <div
                      key={index}
                      ref={spriteRefUse(index)}
                      className="square"
                      style={{
                        ...squareSize,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]}`,
                      }}
                      onClick={(e) => putSprite(e, index, "square")}
                      onMouseLeave={(e: any) => {
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
