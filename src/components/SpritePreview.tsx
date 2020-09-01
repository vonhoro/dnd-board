import React, { useState, useEffect, useContext } from "react";
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
type SpritePreviewProps = { SquareSize: number };
const SpritePreview = ({ SquareSize }: SpritePreviewProps) => {
  type Sprite = {
    content: string;
    width: number;
    height: number;
    index: number;
  };
  const [reRender, setReRender] = useState(false);
  const [spritePreview, setSpritePreview] = useState<Sprite>({
    content: "",
    width: 0,
    height: 0,
    index: 0,
  });

  const { sprite, setSprite } = useContext(SpriteContext);

  useEffect(() => {
    const creatingSprite = {
      content: imageArray[sprite[0]],
      width: sprite[1],
      height: sprite[2],
      index: sprite[0],
    };
    setReRender(!reRender);
    setSpritePreview(creatingSprite);
    console.log("aaa");
  }, [sprite, SquareSize]);

  const spriteCliked = () => {
    setSprite([spritePreview.index, spritePreview.width, spritePreview.height]);
  };
  return (
    <div>
      {spritePreview ? (
        <div className="sprite-preview">
          <img
            style={{
              height: `${spritePreview.height * SquareSize}em`,
              width: `${spritePreview.width * SquareSize}em`,
            }}
            src={spritePreview.content}
            alt="sprite"
            onClick={(e: React.MouseEvent) => {
              spriteCliked();
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default SpritePreview;
