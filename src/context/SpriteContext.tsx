import * as React from "react";
const { createContext } = React;

type spriteInformation = {
  content: string;
  horizontalMultiplier: number;
  verticalMultiplier: number;
  preview: boolean;
  type: string;
};

type SpriteContextType = {
  sprite: spriteInformation;
  setSprite: (value: spriteInformation) => void;
};
//set an empty object as default state
export const SpriteContext = createContext<SpriteContextType | undefined>(
  undefined
);
