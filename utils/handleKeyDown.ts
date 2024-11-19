type KeyDownHandlerParams = {
  event: React.KeyboardEvent;
  onOpen: () => void;
};

export const handleKeyDown = ({ event, onOpen }: KeyDownHandlerParams) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onOpen();
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    const nextElement = event.currentTarget.nextElementSibling;
    if (nextElement instanceof HTMLElement) {
      nextElement.focus();
    }
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    const previousElement = event.currentTarget.previousElementSibling;
    if (previousElement instanceof HTMLElement) {
      previousElement.focus();
    }
  }
};
