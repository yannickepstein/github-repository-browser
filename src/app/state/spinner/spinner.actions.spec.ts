import { startSpinner, stopSpinner } from './spinner.actions';

describe('Spinner Actions', () => {
  it('Creates start action with correct type', () => {
    const action = startSpinner();
    const expectedType = '[Spinner] Start';

    expect(action.type).toEqual(expectedType);
  });

  it('Creates stop action with correct type', () => {
    const action = stopSpinner();
    const expectedType = '[Spinner] Stop';

    expect(action.type).toEqual(expectedType);
  });
});