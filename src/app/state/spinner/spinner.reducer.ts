import { createReducer, on } from '@ngrx/store';

import { startSpinner, stopSpinner } from './spinner.actions';

const initialState = { isOn: false };

export const spinnerReducer = createReducer(
  initialState,
  on(startSpinner, state => ({
    ...state,
    isOn: true
  })),
  on(stopSpinner, state => ({
    ...state,
    isOn: false
  }))
);