import { Page, chromium, devices } from "playwright";

const randomTime = () => {
  return Math.floor(Math.random() * 4000 + 1000);
};

const wait = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const randomNumberFromRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkAndBypassCapture = async (page: Page) => {
  const isCapturePage = await page
    .getByText("review the security of your connection")
    .isVisible();

  if (isCapturePage) {
    console.log("attempting to bypass captcha");

    console.log(await page.content());
    await wait(randomTime());

    const windowSize = await page.evaluate(() => {
      return { x: window.innerWidth, y: window.innerHeight };
    });

    await page.evaluate(() => {
      const randomNumberFromRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      window.scrollBy(0, randomNumberFromRange(10, window.innerHeight / 2));
    });

    await wait(randomTime());

    await page.mouse.move(
      randomNumberFromRange(10, windowSize.x / 2),
      randomNumberFromRange(10, windowSize.y / 2),
      { steps: 30 },
    );

    await page.evaluate(() => {
      const randomNumberFromRange = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      window.scrollBy(randomNumberFromRange(10, window.innerWidth / 2), 0);
    });

    await page.mouse.move(
      randomNumberFromRange(10, windowSize.x / 2),
      randomNumberFromRange(10, windowSize.y / 2),
      { steps: 30 },
    );

    // Add another random delay of 1 to 5 seconds
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000)),
    );

    await page.locator("Verify you are human").click();

    await page.mouse.move(
      randomNumberFromRange(10, windowSize.x / 2),
      randomNumberFromRange(10, windowSize.y / 2),
      { steps: 30 },
    );
  }
};

const getCrawler = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices["Pixel 7 landscape"],
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
