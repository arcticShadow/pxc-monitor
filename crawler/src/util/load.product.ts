import { Database } from "../../types.db";
import { getClient } from "../supabase";

const product = {
  url: "https://www.bunnings.co.nz/ozito-pxc-18v-2-x-4-0ah-batteries-and-charger-pack-pxbc-800c_p0375443",
  sku: 375443,
  brand: "Ozito",
  collection: "PXC",
  name: "2x 4ah Batteries and Charger Pack",
};

const insert = async () => {
  const supabase = await getClient<Database>();

  const r = await supabase.from("product").insert(product);
  console.log(r);
};

insert();
