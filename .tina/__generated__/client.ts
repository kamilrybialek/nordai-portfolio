import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/Kamil/Projects/nordAi/nordai-portfolio/.tina/__generated__/.cache/1768655409371', url: 'http://localhost:4001/graphql', token: '206e8f533c37a114905201b8b4c916f0a72387c5', queries,  });
export default client;
  