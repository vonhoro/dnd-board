import React, { useState, useEffect, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { ItemTypes } from "../constants/Constants";
import {
  Popover,
  PopoverInteractionKind,
  Menu,
  MenuItem,
} from "@blueprintjs/core";
import { useDrag } from "react-dnd";
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
type SpritesHandlerProps = { SquareSize: number };

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
const SpritesHandler = ({ SquareSize }: SpritesHandlerProps) => {
  const { sprite, setSprite } = useContext(SpriteContext);
  const [sizeMultiplierVertical, setSizeMultiplierVertical] = useState();
  const [sizeMultiplierHorizontal, setSizeMultiplierHorizontal] = useState(1);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.SPRITE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [reRender, setReRender] = useState(true);
  const [sprites, setSprites] = useState([]);
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

  const spriteCliked = (index) => {
    setSprite([
      index,
      sprites[index].horizontalMultiplier,
      sprites[index].verticalMultiplier,
    ]);
  };
  const verticalMeasure = (index, action) => {
    let editingSprite = sprites;
    if (action === "increase") {
      editingSprite[index].verticalMultiplier += 1;
    } else {
      editingSprite[index].verticalMultiplier -= 1;
      if (editingSprite[index].verticalMultiplier === 0) {
        editingSprite[index].verticalMultiplier += 1;
      }
    }
    setSprites(editingSprite);
    setReRender(!reRender);
  };
  const horizontalMeasure = (index, action) => {
    let editingSprite = sprites;
    if (action === "increase") {
      editingSprite[index].horizontalMultiplier += 1;
    } else {
      editingSprite[index].horizontalMultiplier -= 1;
      if (editingSprite[index].horizontalMultiplier === 0) {
        editingSprite[index].horizontalMultiplier += 1;
      }
    }
    setSprites(editingSprite);
    setReRender(!reRender);
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
              <Popover
                key={index}
                interactionKind={PopoverInteractionKind.HOVER}
              >
                <img
                  style={{
                    height: `${sprite.height * sprite.verticalMultiplier}em`,
                    width: `${sprite.width * sprite.horizontalMultiplier}em`,
                  }}
                  className="sprite"
                  src={sprite.content}
                  alt="sprite"
                  onClick={(e) => spriteCliked(index)}
                />
                <Menu>
                  <MenuItem
                    text="Vertical Increment"
                    onClick={(e) => verticalMeasure(index, "increase")}
                  />
                  <MenuItem
                    text="Vertical Decrement"
                    onClick={(e) => verticalMeasure(index, "decrease")}
                  />
                  <MenuItem
                    text="Horizontal Increment"
                    onClick={(e) => horizontalMeasure(index, "increase")}
                  />
                  <MenuItem
                    text="Horizontal Decrement"
                    onClick={(e) => horizontalMeasure(index, "decrease")}
                  />
                </Menu>
              </Popover>
            </>
          ))}
        </>
      )}
    </div>
  );
};
export default SpritesHandler;
