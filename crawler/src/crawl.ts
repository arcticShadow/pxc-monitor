import { Database } from "../types.db";
import { getCrawler } from "./crawler";
import { getClient } from "./supabase";

const go = async function () {
  const supabase = await getClient<Database>();
  // load products
  // const products = [{ id: "asa", url: "" }];
  const { data: products } = await supabase.from("product").select("sku,url");
  console.log(products);

  // setup crawler
  const crawler = await getCrawler();

  if (!products) {
    throw new Error("no products");
  }

  // iterate products
  const results = await Promise.all(
    products.map((product) => {
      return new Promise((resolve) => {
        // crawl product
        crawler
          .crawl(product.url)
          .then((crawledPage) =>
            crawledPage
              .locator(
                "[data-locator=product-price-conversion-container] [data-locator=product-price]",
              )
              .first()
              .textContent(),
          )
          .then(async (price) => {
            if (!price) {
              console.error(
                `there was an error getting price: ${product.sku} (${product.url})`,
              );
              return;
            }
            return supabase.from("prices").insert({
              product: product.sku,
              price: Number.parseFloat(price.replace("$", "")),
            });
          })
          .then(resolve);
      });
    }),
  );
  console.log(results);
  // finish crawl
  await crawler.done();

  // store price
};

try {
  go();
} catch (err) {
  console.log(err);
}
