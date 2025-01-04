import Color from "colorjs.io";

export const calculateHueSliderPositionInPx = (
  barElement: HTMLDivElement | undefined | null,
  sliderElement: HTMLDivElement | undefined | null,
  hue: number
): number => {
  const bar = barElement;
  const slider = sliderElement?.getBoundingClientRect();
  if (bar && slider) {
    const sliderWidth = slider.width / 2;
    return ((bar.clientLeft + bar.clientWidth) * hue) / 360 - sliderWidth;
  } else {
    console.error("no bar found!");
    return 0;
  }
};

export const calculateHueFromElements = (
  barElement: HTMLDivElement,
  sliderElement: HTMLDivElement
) => {
  const bar = barElement.getBoundingClientRect();
  const slider = sliderElement.getBoundingClientRect();
  const posX = slider.left - bar.left + slider.width / 2;
  return (360 * posX) / bar.width;
};

export const calculateSaturationAndValueFromElements = (
  areaElement: HTMLDivElement,
  sliderElement: HTMLDivElement
) => {
  const area = areaElement.getBoundingClientRect();
  const slider = sliderElement.getBoundingClientRect();

  const posX = slider.left - area.left + slider.width / 2;
  const posY = area.bottom - slider.bottom + slider.height / 2;

  const saturation = (100 * posX) / area.width;
  const value = (100 * posY) / area.height;
  return { saturation, value };
};

export type Position = {
  x: number;
  y: number;
};

export const calculateSaturationSliderPositionInPx = (
  saturation: number,
  value: number,
  areaElement: HTMLDivElement | null,
  sliderElement: HTMLDivElement | null
): Position => {
  const area = areaElement?.getBoundingClientRect();
  const slider = sliderElement?.getBoundingClientRect();

  if (area && slider) {
    const posX = (saturation * area.width) / 100 - slider.width / 2;
    const posY = area.height - (value * area.height) / 100 - slider.height / 2;
    return { x: posX, y: posY };
  } else {
    return { x: 0, y: 0 };
  }
};

export const hsvToHex = (h: number, s: number, v: number): string => {
  const color = new Color("hsv", [h, s, v]);
  const hex = color.to("srgb").toString({ format: "hex" });
  return hex;
};

export type HSV = { hue: number; saturation: number; value: number };

export const hexToHsv = (hex: string | undefined): HSV => {
  if (!hex) {
    return { hue: 0, saturation: 0, value: 0 };
  } else {
    const color = new Color(hex);
    const hsv = color.to("hsv");
    return { hue: hsv.h, saturation: hsv.s, value: hsv.v };
  }
};
