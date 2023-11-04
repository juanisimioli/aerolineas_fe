import { useCallback, useState } from "react";

const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const toggle = useCallback(() => setIsModalOpen((prev) => !prev), []);
  const open = useCallback(() => setIsModalOpen(true), []);
  const close = useCallback(() => setIsModalOpen(false), []);

  return {
    isModalOpen,
    toggle,
    open,
    close,
  };
};

export default useModal;
