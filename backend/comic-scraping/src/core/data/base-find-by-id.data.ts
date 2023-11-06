import { QueryFindOptions } from "@cjp-back/shared";

export const baseFindById: QueryFindOptions = {
  populate: [
    {
      path: "chapters",
      populate: [{ path: "resource", populate: [{ path: "site" }] }],
    },
    {
      path: "resources",
      populate: [
        {
          path: "site",
        },
      ],
    },
  ],
};
