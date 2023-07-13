import { StateStatus } from "../enums";

export interface IArrayState<T> {
  data: T[];
  error: string | null;
  status: StateStatus;
}
