import React, { useState, useEffect, useContext } from "react";
import { SpriteContext } from "../context/SpriteContext";
import { Radio, RadioGroup } from "@blueprintjs/core";
type SpritePreviewProps = { SquareSize: number };

const colors = {
  ally: "#137CBD",
  neutral: "#30404d",
  enemy: "#DB3737",
};

const SpritePreview = ({ SquareSize }: SpritePreviewProps) => {
  type Sprite = {
    content: string;
    horizontalMultiplier: number;
    verticalMultiplier: number;
  };
  const [reRender, setReRender] = useState(false);
  const [spritePreview, setSpritePreview] = useState<Sprite>({
    content: "",
    horizontalMultiplier: 0,
    verticalMultiplier: 0,
  });
  const [radioControl, setRadioControl] = useState("neutral");
  const { sprite, setSprite } = useContext(SpriteContext);

  useEffect(() => {
    if (sprite.preview) {
      const creatingSprite = {
        content: sprite.content,
        horizontalMultiplier: sprite.horizontalMultiplier,
        verticalMultiplier: sprite.verticalMultiplier,
        type: sprite.type,
      };
      setReRender(!reRender);
      setSpritePreview(creatingSprite);
    }
  }, [sprite, SquareSize]);

  const spriteCliked = () => {
    setSprite({
      ...spritePreview,
      type: radioControl,
      preview: false,
    });
  };
  return (
    <div>
      {spritePreview ? (
        <div className="sprite-preview">
          <RadioGroup
            className="sprite-type"
            label="Sprite type"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setRadioControl(e.currentTarget.value);
            }}
            selectedValue={radioControl}
            inline={true}
          >
            <Radio label="Neutral" value="neutral" />
            <Radio label="Enemy" value="enemy" />
            <Radio label="Ally" value="ally" />
          </RadioGroup>
          <img
            style={{
              width: `${spritePreview.horizontalMultiplier * SquareSize}em`,
              height: `${spritePreview.verticalMultiplier * SquareSize}em`,
              backgroundColor: `${
                radioControl === "neutral"
                  ? colors.neutral
                  : radioControl === "enemy"
                  ? colors.enemy
                  : colors.ally
              }`,
            }}
            src={spritePreview.content}
            alt=""
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
