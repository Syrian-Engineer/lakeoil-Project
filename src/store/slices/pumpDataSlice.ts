// store/slices/pumpDataSlice.ts

import { Pump } from "@/components/PumpCard";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Pump {
//   id: number;
//   name: string;
//   code: number;
//   approval: number;
//   virtual_totalizer: number;
//   mechanical_totalizer: number;
//   is_connected: number;
//   is_disconnected: number;
// }

interface PumpDataState {
  pumps: Pump[];
}

const initialState: PumpDataState = {
  pumps: [],
};

const pumpDataSlice = createSlice({
  name: 'pumpData',
  initialState,
  reducers: {
    setPumps(state, action: PayloadAction<Pump[]>) {
      state.pumps = action.payload;
    },
  },
});

export const { setPumps } = pumpDataSlice.actions;
export default pumpDataSlice.reducer;
