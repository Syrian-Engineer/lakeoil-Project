"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/modal";
import { useModal } from "./use-modal";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size } = useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={closeModal}
      customSize={customSize}
      containerClassName="dark:bg-gray-100"
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      {view}
    </Modal>
  );
}
