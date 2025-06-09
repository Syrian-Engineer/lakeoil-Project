// store/slices/pumpSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PumpData {
  [id: number]: {
    event: string;
    amount?: number;
    volume?: number;
    price?: number;
    product?: string;
    nozzle_status?: number;
    is_connected?: boolean;
    alarm_message?: string;
  };
}

const initialState: PumpData = {};

const pumpSlice = createSlice({
  name: 'pump',
  initialState,
  reducers: {
    updatePumpLiveData: (state, action: PayloadAction<any>) => {
    const { id, ...data } = action.payload;
    if (id !== undefined) {
        state[id] = { ...state[id], ...data };
    }
    },
  },
});

export const { updatePumpLiveData } = pumpSlice.actions;
export default pumpSlice.reducer;
