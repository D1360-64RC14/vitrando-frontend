export const useMousePosition = () => {
  const mouse = reactive({ x: 0, y: 0 });

  document.addEventListener("mousemove", (ev: MouseEvent) => {
    mouse.x = ev.x;
    mouse.y = ev.y;
  });

  return mouse;
};
