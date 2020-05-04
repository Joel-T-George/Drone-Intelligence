/**
 * @file Slice of the state object that handles the state of the user's session.
 * This slice is used to implement time-limited sessions in the web demo.
 */

import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'session',

  initialState: {
    expiresAt: null
  },

  reducers: {
    // Note that there is no reducer to update the session expiry. This is
    // intentional; the session duration is set up once when the web demo
    // starts, and there is no way to extend that programmatically.
  }
});

/*
export const {
} = actions;
*/

export default reducer;
