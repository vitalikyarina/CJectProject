export type FilterDocument<T> = { [P in keyof T]?: T[P] };
