
'use client';

import PumpData from '@/components/PumpData';
import { Modal } from 'rizzui';

interface PumpDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  pump: {
    mechanical_totalizer: number;
    virtual_totalizer: number;
  };
  difference: number;
  title: string;
}

export default function PumpDataModal({
  isOpen,
  onClose,
  pump,
  difference,
  title,
}: PumpDataModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} containerClassName="w-[500px] h-[300px]">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>
        <PumpData
          ElectronicTotalizer={Number(pump?.mechanical_totalizer)}
          VirtualTotalizer={Number(pump.virtual_totalizer)}
          Difference={Number(difference)}
        />
        <div className="mt-6 text-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 hover:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
