import * as environmentDev from "./environment";

export const environment = {
  production: true,
  ...(environmentDev.environment.URLS)
};
