import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

test.describe('Security Store Inventory Workflows', () => {
  
  test('should display biometric and CCTV stock from mocked API', async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // Intercept network to provide custom security data
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

    await dashboard.navigate();

    // Verify functional logic
    await expect(page.getByText('Dome CCTV Camera v2')).toBeVisible();
    await expect(page.getByText('Biometric Access Gate')).toBeVisible();
    await expect(page.getByText('Motion Sensor Array')).toBeVisible();
  });

  test('dashboard should match visual baseline', async ({ page }) => {
    // Standardize the data so the screenshot is always the same
    await page.route('*/**/api/v1/fruits', async route => {
      const securityStock = [
        { id: 101, name: 'Dome CCTV Camera v2' },
        { id: 102, name: 'Biometric Access Gate' }
      ];
      await route.fulfill({ 
        status: 200, 
        contentType: 'application/json', 
        body: JSON.stringify(securityStock) 
      });
    });

    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    await expect(page.getByText('Dome CCTV Camera v2')).toBeVisible();

    // Verify visual integrity
    await expect(page).toHaveScreenshot('dashboard-baseline.png');
  });
  
});