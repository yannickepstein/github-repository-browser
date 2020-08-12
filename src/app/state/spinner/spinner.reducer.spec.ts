import { startSpinner, stopSpinner } from './spinner.actions';
import { spinnerReducer } from './spinner.reducer';

describe('Spinner Reducer', () => {
  it('Reduce the state to start the spinner, if startSpinner is given', () => {
    const initialState = { isOn: false };

    const state = spinnerReducer(initialState, startSpinner());
    const expectedState = { isOn: true };

    expect(state).toEqual(expectedState);
  });

  it('Reduces the state to stop the spinner, if stopSpinner is given', () => {
    const initialState = { isOn: true };

    const state = spinnerReducer(initialState, stopSpinner());
    const expectedState = { isOn: false };

    expect(state).toEqual(expectedState);
  });
});