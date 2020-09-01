type spriteObject= {size:Array<number>, rotation:number, translation:Array<number>}


export const moveSprite = (SpriteArray:spriteObject, Key: string) => {
  const spriteArray = SpriteArray;
  const key: string = Key;
  const xAxis: number = spriteArray.size[0];
  const yAxis: number = spriteArray.size[1];
  const difference: number = Math.abs(xAxis - yAxis);
  const smallerNumber: number = Math.min(xAxis, yAxis);
  let xTranslate: number;
  let yTranslate: number;
  if (key === "I" || key === "i") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 180;
      yTranslate = (100 * (yAxis - 1)) / yAxis;
      xTranslate = (100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 90;
      yTranslate = (50 * difference + 100 * (yAxis - 1)) / yAxis;
      xTranslate = -(50 * difference + 100 * (yAxis - 1)) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "K" || key === "k") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 0;
      yTranslate = 0;
      xTranslate = 0;
    } else {
      spriteArray.rotation = -90;
      yTranslate = -(50 * difference) / yAxis;
      xTranslate = -50 + (50 * yAxis) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "J" || key === "j") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = 90;
      yTranslate = (50 * difference + 100 * (xAxis - 1)) / yAxis;
      xTranslate = -(50 * difference + 100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 180;
      yTranslate = (100 * (yAxis - 1)) / yAxis;
      xTranslate = (100 * (xAxis - 1)) / xAxis;
    }

    spriteArray.translation = [xTranslate, yTranslate];
  } else if (key === "L" || key === "l") {
    if (xAxis === smallerNumber) {
      spriteArray.rotation = -90;
      yTranslate = (50 * difference) / yAxis;
      xTranslate = (50 * difference + 100 * (xAxis - 1)) / xAxis;
    } else {
      spriteArray.rotation = 0;
      xTranslate = 0;
      yTranslate = 0;
    }
    spriteArray.translation = [xTranslate, yTranslate];
  } else {
    return false;
  }
  return spriteArray;
};
