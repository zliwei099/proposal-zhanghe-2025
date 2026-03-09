const { chromium } = require('playwright');

const BASE_URL = 'https://zliwei099.github.io/proposal-zhanghe-2025/';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro
    recordVideo: { dir: 'test-results/videos/', size: { width: 390, height: 844 } }
  });
  
  const page = await context.newPage();
  
  console.log('🎬 开始录制测试视频...');
  
  // 1. 封面页
  console.log('1. 封面页');
  await page.goto(BASE_URL);
  await page.waitForTimeout(3000);
  
  // 2. 点击进入
  console.log('2. 点击进入');
  await page.click('.cover-btn');
  await page.waitForTimeout(1500);
  
  // 3. 照片页1
  console.log('3. 照片页1');
  await page.waitForTimeout(1500);
  await page.click('body');
  
  // 4. 照片页2
  console.log('4. 照片页2');
  await page.waitForTimeout(1500);
  await page.click('body');
  
  // 5. 照片页3
  console.log('5. 照片页3');
  await page.waitForTimeout(1500);
  await page.click('body');
  
  // 6. 统计页 - 快速点击测试
  console.log('6. 统计页（快速点击进入下一页）');
  await page.waitForTimeout(2000);
  await page.click('body'); // 点击快速进入求婚页
  
  // 7. 求婚页
  console.log('7. 求婚页');
  await page.waitForTimeout(2000);
  await page.click('.proposal-cta');
  
  // 8. 提问页
  console.log('8. 提问页');
  await page.waitForTimeout(2000);
  await page.click('.btn-yes');
  
  // 9. 庆祝页
  console.log('9. 庆祝页');
  await page.waitForTimeout(3000);
  
  console.log('✅ 录制完成');
  
  await context.close();
  await browser.close();
})();