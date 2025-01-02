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
    const posX = (saturation * area.width) / 100;
    const posY = area.height - (value * area.height) / 100;
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

type HSV = { h: number; s: number; v: number };

export const hexToHsv = (hex: string | undefined): HSV => {
  if (!hex) {
    return { h: 0, s: 0, v: 0 };
  } else {
    const color = new Color(hex);
    const hsv = color.to("hsv");
    return { h: hsv.h, s: hsv.s, v: hsv.v };
  }
};

export const hsvToHslString = (hsv: HSV): string => {
  const color = new Color("hsv", [hsv.h, hsv.s, hsv.v]);
  const { h, s, l } = color.to("hsl");
  return `hsl(${h}, ${s}%, ${l}%)`;
};
