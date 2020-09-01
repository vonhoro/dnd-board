import React, { useState, useEffect, useContext, useRef } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { InputGroup, FormGroup } from "@blueprintjs/core";
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
type SpritesHandlerProps = {
  SquareSize: number;
  NumberColumns: number;
  NumberRows: number;
};

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
const SpritesHandler = ({
  SquareSize,
  NumberColumns,
  NumberRows,
}: SpritesHandlerProps) => {
  const { setSprite } = useContext(SpriteContext);

  const [reRender, setReRender] = useState(true);
  const [sprites, setSprites] = useState([]);

  // ref

  const arr: Array<number> = [...new Array(imageArray.length)].map(
    (_, index) => index
  );
  const spriteRef = useRef<any>(arr);
  const spriteRefUse = (index: number) => (element: HTMLElement) => {
    spriteRef.current[index] = element;
  };

  useEffect(() => {
    let preparingSprites = [];
    for (const image of imageArray) {
      preparingSprites.push({
        content: image,
        height: SquareSize,
        width: SquareSize,
        verticalMultiplier: 1,
        horizontalMultiplier: 1,
      });
    }
    setSprites(preparingSprites);
  }, [SquareSize]);

  const spriteCliked = (index: number) => {
    spriteRef.current[index].focus();
  };

  return (
    <div className="Sprites-container">
      {sprites.length === 0 ? (
        <></>
      ) : (
        <>
          {" "}
          {sprites.map((sprite, index) => (
            <>
              <div
                className="Sprite-details"
                tabIndex={index}
                ref={spriteRefUse(index)}
                onClick={(e) => spriteCliked(index)}
                onFocus={(e) => (e.target.style.backgroundColor = "white")}
                onBlur={(e) => (e.target.style.backgroundColor = "auto")}
              >
                <img
                  style={{
                    height: `${sprite.height}em`,
                    width: `${sprite.width}em`,
                  }}
                  key={89 + 1 * index}
                  className="sprite"
                  src={sprite.content}
                  alt="sprite"
                />
                <div className="sprite-inputs">
                  <FormGroup label="Rows">
                    <InputGroup
                      className="sprite-size"
                      intent={"primary"}
                      type="number"
                      defaultValue="1"
                      min="1"
                      max={NumberRows}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.valueAsNumber < 1) return;
                        sprites[index].horizontalMultiplier =
                          e.target.valueAsNumber;
                        setReRender(!reRender);
                        setSprite([
                          index,
                          sprites[index].horizontalMultiplier,
                          sprites[index].verticalMultiplier,
                        ]);
                      }}
                    />
                  </FormGroup>

                  <FormGroup label="Columns">
                    <InputGroup
                      className="sprite-size"
                      intent={"primary"}
                      type="number"
                      defaultValue="1"
                      min="1"
                      max={NumberColumns}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.valueAsNumber < 1) return;
                        sprites[index].verticalMultiplier =
                          e.target.valueAsNumber;
                        setReRender(!reRender);
                        setSprite([
                          index,
                          sprites[index].horizontalMultiplier,
                          sprites[index].verticalMultiplier,
                        ]);
                      }}
                    />
                  </FormGroup>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};
export default SpritesHandler;
