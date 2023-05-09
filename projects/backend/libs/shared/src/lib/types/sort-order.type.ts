export type SortDirection =
  | -1
  | 1
  | "asc"
  | "ascending"
  | "desc"
  | "descending";

export type SortOrder =
  | string
  | { [key: string]: SortDirection | { $meta: "textScore" } }
  | undefined
  | null;
