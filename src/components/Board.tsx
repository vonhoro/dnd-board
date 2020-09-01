import React, { useState, useEffect, useRef, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { moveSprite } from "../utils/moveSprite";

type BoardProps = {
  NumberColumns: number;
  NumberRows: number;
  SquareSize: number;
};

const colors = {
  ally: "#137CBD",
  neutral: "#30404d",
  enemy: "#DB3737",
  boardDefault: "#202b33",
  spritePlace: "#0F9960",
  spriteFocus: "#A7B6C2",
};

const Board = ({ NumberColumns, NumberRows, SquareSize }: BoardProps) => {
  // context
  const { sprite, setSprite } = useContext(SpriteContext);

  // states
  const [spriteCondition, setSpriteCondition] = useState({
    clicked: false,
    position: 0,
  });

  const [prevSquare, setPrevSquare] = useState(null);
  const [squareWasClicked, setSquareWasClicked] = useState(false);
  const [numberArray, setNumberArray] = useState<null | Array<any>>(null);
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

  //this setps Up the board size on number of squares
  useEffect(() => {
    let row: number = 0;
    let column: number = 0;
    let array = Array.from(Array(NumberColumns * NumberRows)).map(() => {
      column = column === NumberColumns ? 0 : column;
      column += 1;

      row = column === 1 ? row + 1 : row;

      return {
        content: "",
        coordinate: [row, column],
        size: [0, 0],
        color: colors.boardDefault,
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

  // this one sets ups the scale of each square

  useEffect(() => {
    const squareSize = SquareSize + "em";

    setSquareSize({ height: squareSize, width: squareSize });
  }, [SquareSize]);

  // functions

  // for setting and putting sprites on the baord

  const putSprite = (e: any, index: number, type: string) => {
    // this conditios puts a new sprite on the board

    if (!sprite.preview) {
      const modifyArray = numberArray;

      const colorType: string =
        sprite.type === "neutral"
          ? colors.neutral
          : sprite.type === "enemy"
          ? colors.enemy
          : colors.ally;

      modifyArray[index].content = sprite.content;
      modifyArray[index] = {
        ...modifyArray[index],
        size: [sprite.horizontalMultiplier, sprite.verticalMultiplier],
        rotation: 0,
        translation: [0, 0],
        ofSet: [0, 1],
        order: orderSprites,
        spriteColor: colorType,
        color: colors.boardDefault,
        type: sprite.type,
      };
      setOrderSprites(orderSprites + 1);
      setNumberArray(modifyArray);
      setSquareWasClicked(false);
      setSprite({ ...sprite, preview: true });
      return;
    }

    // this prepares the sprite to move

    if (type === "sprite") {
      spriteRef.current[index].focus();
      setSpriteCondition({ clicked: true, position: index });
      setPrevSquare(index);
      setSquareWasClicked(true);
    } else {
      setSpriteCondition({ clicked: false, position: index });
    }
    if (squareWasClicked) {
      const acomodateBoard = numberArray;

      const temp = acomodateBoard[prevSquare].coordinate;
      acomodateBoard[prevSquare].coordinate = acomodateBoard[index].coordinate;
      acomodateBoard[index].coordinate = temp;

      setNumberArray(acomodateBoard);
      setSquareWasClicked(false);
    }
  };

  // to delete the sprite

  const removeSprite = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const modifyArray = numberArray;
    setOrderSprites(orderSprites - 1);
    modifyArray[index].content = "";
    setNumberArray(modifyArray);
    setRotatingSprite(!rotatingSprite);
    setSquareWasClicked(false);
  };

  // key bindings on the sprite

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
  };

  // esto da un preview del area que ocupara el sprite

  const squaresPreview = (e: any, coordinates: Array<number>) => {
    if (spriteCondition.clicked) {
      const spriteWidth = numberArray[spriteCondition.position].size[0];
      const spriteHeigth = numberArray[spriteCondition.position].size[1];

      let xCoordinates = [];
      let yCoordinates = [];
      let coordinatesToChange = [];
      let j = 0;
      for (let m = 0; m < spriteHeigth; m += 1) {
        for (let i = 0; i < spriteWidth; i += 1) {
          yCoordinates.push(m + coordinates[0]);
        }
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        if (j === spriteWidth) {
          j = 0;
        }

        xCoordinates.push(j + coordinates[1]);
        j += 1;
      }

      for (let i = 0; i < spriteWidth * spriteHeigth; i += 1) {
        coordinatesToChange.push([xCoordinates[i], yCoordinates[i]]);
      }

      for (const square of numberArray) {
        for (const coordinate of coordinatesToChange) {
          if (
            square.coordinate[0] === coordinate[1] &&
            square.coordinate[1] === coordinate[0]
          ) {
            square.color = colors.spritePlace;
          }
        }
      }
      setNumberArray(numberArray);
      setRotatingSprite(!rotatingSprite);
      setTimeout(() => {
        for (const square of numberArray) {
          square.color = colors.boardDefault;
        }
        setNumberArray(numberArray);

        setRotatingSprite(!rotatingSprite);
      }, 0);
    }

    // Just as separation t not loose my self on this mess for this momnet

    if (sprite.preview) return;
    let xCoordinates = [];
    let yCoordinates = [];
    let coordinatesToChange = [];

    let j = 0;
    for (let m = 0; m < sprite.verticalMultiplier; m += 1) {
      for (let i = 0; i < sprite.horizontalMultiplier; i += 1) {
        yCoordinates.push(m + coordinates[0]);
      }
    }

    for (
      let i = 0;
      i < sprite.horizontalMultiplier * sprite.verticalMultiplier;
      i += 1
    ) {
      if (j === sprite.horizontalMultiplier) {
        j = 0;
      }

      xCoordinates.push(j + coordinates[1]);
      j += 1;
    }

    for (
      let i = 0;
      i < sprite.horizontalMultiplier * sprite.verticalMultiplier;
      i += 1
    ) {
      coordinatesToChange.push([xCoordinates[i], yCoordinates[i]]);
    }

    for (const square of numberArray) {
      for (const coordinate of coordinatesToChange) {
        if (
          square.coordinate[0] === coordinate[1] &&
          square.coordinate[1] === coordinate[0]
        ) {
          square.color = colors.spritePlace;
        }
      }
    }
    setNumberArray(numberArray);
    setRotatingSprite(!rotatingSprite);
    setTimeout(() => {
      for (const square of numberArray) {
        square.color = colors.boardDefault;
      }
      setNumberArray(numberArray);

      setRotatingSprite(!rotatingSprite);
    }, 0);
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
                      onFocus={(e) => (square.spriteColor = colors.spriteFocus)}
                      tabIndex={index}
                      style={{
                        width: `${SquareSize * square.size[0]}em`,
                        height: `${SquareSize * square.size[1]}em`,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]} /span ${NumberRows} / span ${NumberColumns}`,
                        transform: `rotate(${square.rotation}deg) translate(${square.translation[0]}%,${square.translation[1]}%)`,
                        boxShadow: `${square.ofSet[0]}em ${square.ofSet[1]}em 0 0 #106BA3 inset`,
                        backgroundColor: `${square.spriteColor}`,
                        zIndex: 2 + square.order,
                      }}
                      onKeyUp={(e) => {
                        rotateSprite(e, index);
                      }}
                      onBlur={(e) => {
                        square.spriteColor =
                          square.type === "neutral"
                            ? colors.neutral
                            : sprite.type === "enemy"
                            ? colors.enemy
                            : colors.ally;
                      }}
                      onClick={(e) => putSprite(e, index, "sprite")}
                      onContextMenu={(e) => removeSprite(e, index)}
                    />
                  ) : (
                    <div
                      key={index}
                      ref={spriteRefUse(index)}
                      className="square"
                      style={{
                        ...squareSize,
                        gridArea: `${square.coordinate[0]} / ${square.coordinate[1]}`,
                        backgroundColor: `${square.color}`,
                      }}
                      onClick={(e) => putSprite(e, index, "square")}
                      onMouseEnter={(e: any) => {
                        squaresPreview(e, square.coordinate);
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
