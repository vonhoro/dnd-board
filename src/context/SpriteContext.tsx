import * as React from "react";
const { createContext } = React;
type SpriteContextType={
  sprite: Array<number>;
  setSprite: (value:Array<number>)=> void;

}
//set an empty object as default state
export const SpriteContext = createContext<SpriteContextType | undefined>(undefined)
