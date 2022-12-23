import * as environmentDev from "./environment";

export const environment = {
  ...{ ...(environmentDev.environment), production: true }
};
