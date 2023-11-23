import { cosmiconfig } from "cosmiconfig";

const explorer = cosmiconfig("pxc");

async function config() {
  const result = await explorer.search();

  return result?.config;
}

export default config();
