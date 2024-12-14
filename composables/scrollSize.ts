export const useScrollSize = (container?: Element) => {
  const scrollSize = reactive({
    top: 0,
    left: 0,
    offTop: false,
    offLeft: false,
  });

  // A variável global document não se encontra definida caso esteja sendo
  // renderizado no servidor.
  if (!container && !document) {
    return scrollSize;
  }

  const eventContainer: Document | Element = container ?? document;
  const scrollContainer: Element = container ?? document.documentElement;

  eventContainer.addEventListener("scroll", () => {
    scrollSize.top = scrollContainer.scrollTop;
    scrollSize.left = scrollContainer.scrollLeft;

    scrollSize.offTop = scrollContainer.scrollTop > 0;
    scrollSize.offLeft = scrollContainer.scrollLeft > 0;

    console.log(scrollSize);
  });

  return scrollSize;
};
