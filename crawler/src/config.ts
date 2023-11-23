import { cosmiconfig } from "cosmiconfig";

const explorer = cosmiconfig("pxc");

async function config() {
  const result = (await explorer.search()) ?? { config: {} };

  return result?.config;
}

export default config();
