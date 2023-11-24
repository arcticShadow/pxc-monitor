import { chromium } from "playwright";

// const getHarness = async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   // Navigate to a website
//   await page.goto(
//     "https://www.bunnings.co.nz/ozito-pxc-18v-2-x-4-0ah-batteries-and-charger-pack-pxbc-800c_p0375443"
//   );
//   // const price = await page.$$('[data-locator=product-price-conversion-container] [data-locator=product-price]');
//   const price = await page
//     .locator(
//       "[data-locator=product-price-conversion-container] [data-locator=product-price]"
//     )
//     .first()
//     .textContent();
//   console.log(price);

//   await browser.close();
//   return;
// };

const getCrawler = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: { dir: "crawl-results/videos/" },
  });

  const crawl = async (url: string) => {
    const page = await context.newPage();
    try {
      await page.goto(url);
    } catch (err) {
      console.log(err);
    }
    return page;
  };

  const done = async () => {
    await context.close();
    await browser.close();
  };
  return { crawl, done };
};

export { getCrawler };
