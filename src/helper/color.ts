export const hsvToHex = (h: number, s: number, v: number) => {
  s /= 100;
  v /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) =>
    v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return (
    "#" +
    (
      (1 << 24) +
      (Math.round(255 * f(5)) << 16) +
      (Math.round(255 * f(3)) << 8) +
      Math.round(255 * f(1))
    )
      .toString(16)
      .slice(1)
  );
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
