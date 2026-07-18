import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Security Store Inventory Workflows', () => {

    test('dashboard should match visual baseline', async ({ page }) => {
    // 1. Intercept the network so the data is always identical for the screenshot
    await page.route('*/**/api/v1/fruits', async route => {
      const securityStock = [
        { id: 101, name: 'Dome CCTV Camera v2' },
        { id: 102, name: 'Biometric Access Gate' }
      ];
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(securityStock) });
    });

    // 2. Navigate to the page
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    // 3. Wait for the mocked data to actually appear on screen
    await expect(page.getByText('Dome CCTV Camera v2')).toBeVisible();

    // 4. THE VISUAL ASSERTION: Take a screenshot and compare it
    await expect(page).toHaveScreenshot('dashboard-baseline.png');
  });
  
  test('should display biometric and CCTV stock from mocked API', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // 1. Intercept the network request to inject our custom security system data
    await page.route('*/**/api/v1/fruits', async route => {
      const securityStock = [
        { id: 101, name: 'Dome CCTV Camera v2' },
        { id: 102, name: 'Biometric Access Gate' },
        { id: 103, name: 'Motion Sensor Array' }
      ];

      await route.fulfill({ 
        status: 200, 
        contentType: 'application/json',
        body: JSON.stringify(securityStock) 
      });
    });

    // 2. Navigate using our Page Object
    await dashboard.navigate();

    // 3. Assert that our custom program data rendered correctly on the screen
    await expect(page.getByText('Dome CCTV Camera v2')).toBeVisible();
    await expect(page.getByText('Biometric Access Gate')).toBeVisible();
    await expect(page.getByText('Motion Sensor Array')).toBeVisible();
  });
  
});