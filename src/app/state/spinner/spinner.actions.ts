import { createAction } from "@ngrx/store";

export const startSpinner = createAction(
  '[Spinner] Start'
);

export const stopSpinner = createAction(
  '[Spinner] Stop'
);