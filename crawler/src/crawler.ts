import { Page, chromium, devices } from "playwright";

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

const randomTime = () => {
  return Math.floor(Math.random() * 4000 + 1000);
};

const wait = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

function randomNumberFromRange(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const checkAndBypassCapture = async (page: Page) => {
  const isCapturePage = await page
    .getByText("review the security of your connection")
    .isVisible();

  if (isCapturePage) {
    console.log("attempting to bypass captcha");

    await wait(randomTime());

    // Scroll the page to load additional content
    await page.evaluate(() =>
      window.scrollBy(0, randomNumberFromRange(10, window.innerHeight / 2)),
    );

    await wait(randomTime());

    await page.mouse.move(
      randomNumberFromRange(10, window.innerWidth / 2),
      randomNumberFromRange(10, window.innerHeight / 2),
      { steps: 30 },
    );

    await page.evaluate(() =>
      window.scrollBy(randomNumberFromRange(10, window.innerWidth / 2), 0),
    );

    await page.mouse.move(
      randomNumberFromRange(10, window.innerWidth / 2),
      randomNumberFromRange(10, window.innerHeight / 2),
      { steps: 30 },
    );

    // Add another random delay of 1 to 5 seconds
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000)),
    );
  }
};

const getCrawler = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Pixel 7 landscape']
    recordVideo: { dir: "crawl-results/videos/" },
  });

  const crawl = async (url: string) => {
    const page = await context.newPage();
    try {
      await page.goto(url);
      await checkAndBypassCapture(page);
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
