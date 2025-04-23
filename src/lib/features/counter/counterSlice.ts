import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // redux tookit uses immer under the hood, so we can write mutating code
    // and it will be converted to immutable code
    incremented(state) {
      state.value++;
    },


  },
});


export const {incremented} = counterSlice.actions;