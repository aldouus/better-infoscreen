import { useState, useEffect } from "react";
import { useUrlState } from "./useUrlState";

export function useDialogState(identifier: string) {
  const { setUrlState, getUrlState } = useUrlState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentDialog = getUrlState("dialog");
    if (currentDialog === identifier && !isOpen) {
      setIsOpen(true);
    } else if (!currentDialog && isOpen) {
      setIsOpen(false);
    }
  }, [getUrlState, identifier, isOpen]);

  const onOpen = () => {
    setUrlState({ dialog: identifier });
    setIsOpen(true);
  };

  const onClose = () => {
    setUrlState({ dialog: null });
    setIsOpen(false);
  };

  return {
    isOpen,
    onOpen,
    onClose,
  };
}