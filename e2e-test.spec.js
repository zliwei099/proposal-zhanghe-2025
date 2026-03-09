const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://zliwei099.github.io/proposal-zhanghe-2025/';

// 测试配置
test.setTimeout(60000);

// 截图保存路径
const screenshotDir = './test-results/screenshots';

test.describe('求婚页面端到端测试', () => {
  
  test('1. 封面页加载测试', async ({ page }) => {
    console.log('🧪 测试封面页加载...');
    
    // 访问页面
    const response = await page.goto(BASE_URL);
    expect(response.status()).toBe(200);
    
    // 等待加载动画
    await page.waitForTimeout(3000);
    
    // 验证关键元素
    await expect(page.locator('.cover-names')).toContainText('张立伟');
    await expect(page.locator('.cover-names')).toContainText('和晨睿');
    await expect(page.locator('.cover-btn')).toBeVisible();
    
    // 截图
    await page.screenshot({ path: `${screenshotDir}/01-cover.png` });
    console.log('✅ 封面页测试通过');
  });

  test('2. 完整流程测试', async ({ page }) => {
    console.log('🧪 测试完整流程...');
    
    await page.goto(BASE_URL);
    await page.waitForTimeout(3000);
    
    // 点击开始
    await page.click('.cover-btn');
    await page.waitForTimeout(2000);
    
    // 测试照片页 (1-3)
    for (let i = 1; i <= 3; i++) {
      console.log(`  📸 测试第 ${i} 页...`);
      await page.waitForTimeout(1000);
      
      // 验证页面显示（使用更精确的选择器）
      const currentPage = await page.locator('.page.active');
      const pageNum = await currentPage.locator('.page-counter .current').textContent();
      expect(pageNum).toBe(`0${i}`);
      
      // 点击下一页
      await page.click('body');
    }
    
    // 统计页
    console.log('  📊 测试统计页...');
    await page.waitForTimeout(3000);
    const daysNum = await page.locator('#daysNum').textContent();
    expect(parseInt(daysNum)).toBeGreaterThan(600); // 相识超过600天
    
    // 自动跳转到求婚页
    await page.waitForTimeout(3000);
    
    // 求婚页
    console.log('  💍 测试求婚页...');
    await expect(page.locator('.proposal-tag')).toContainText('这就是爱');
    await page.screenshot({ path: `${screenshotDir}/05-proposal.png` });
    
    // 点击继续
    await page.click('.proposal-cta');
    await page.waitForTimeout(1500);
    
    // 提问页
    console.log('  ❓ 测试提问页...');
    await expect(page.locator('.question-name')).toContainText('和晨睿');
    await expect(page.locator('.question-text')).toContainText('你愿意嫁给我吗');
    await page.screenshot({ path: `${screenshotDir}/06-question.png` });
    
    // 点击我愿意
    await page.click('.btn-yes');
    await page.waitForTimeout(2000);
    
    // 庆祝页
    console.log('  🎉 测试庆祝页...');
    await expect(page.locator('.celebration-title')).toContainText('她答应了');
    await page.screenshot({ path: `${screenshotDir}/07-celebration.png` });
    
    console.log('✅ 完整流程测试通过');
  });

  test('3. 性能测试', async ({ page }) => {
    console.log('🧪 测试性能...');
    
    // 启用性能监控
    await page.goto(BASE_URL);
    
    // 测量加载时间
    const loadTime = await page.evaluate(() => {
      return performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
    console.log(`  ⏱️  页面加载时间: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(15000); // 首次加载包含照片，允许15秒
    
    // 再次测量（缓存后）
    await page.reload();
    await page.waitForTimeout(3000);
    const loadTimeCached = await page.evaluate(() => {
      return performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
    console.log(`  ⏱️  缓存后加载时间: ${loadTimeCached}ms`);
    expect(loadTimeCached).toBeLessThan(5000); // 缓存后应小于5秒
    
    // 测量FPS
    await page.waitForTimeout(3000);
    const fps = await page.evaluate(() => {
      return new Promise(resolve => {
        let frames = 0;
        const start = performance.now();
        const count = () => {
          frames++;
          if (performance.now() - start < 1000) {
            requestAnimationFrame(count);
          } else {
            resolve(frames);
          }
        };
        requestAnimationFrame(count);
      });
    });
    console.log(`  🎬 平均帧率: ${fps} FPS`);
    expect(fps).toBeGreaterThan(30); // FPS应大于30
    
    console.log('✅ 性能测试通过');
  });

  test('4. 移动端视口测试', async ({ page }) => {
    console.log('🧪 测试移动端适配...');
    
    // iPhone 14 Pro 尺寸
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(3000);
    
    // 点击开始并截图
    await page.click('.cover-btn');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${screenshotDir}/mobile-01.png` });
    
    // 检查当前活动页面的标题
    const currentPage = await page.locator('.page.active');
    const mainTitle = await currentPage.locator('.main-title');
    await expect(mainTitle).toBeVisible();
    
    console.log('✅ 移动端适配测试通过');
  });

  test('5. 控制台错误检查', async ({ page }) => {
    console.log('🧪 检查控制台错误...');
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForTimeout(5000);
    
    // 遍历所有页面
    await page.click('.cover-btn');
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(1000);
      await page.click('body').catch(() => {});
    }
    
    if (errors.length > 0) {
      console.log('  ⚠️  发现控制台错误:');
      errors.forEach(e => console.log(`    - ${e}`));
    } else {
      console.log('  ✅ 无控制台错误');
    }
    
    expect(errors.length).toBe(0);
  });

});