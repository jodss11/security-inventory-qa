# Security Store Inventory Automation Framework

**Author:** Jodell Zara

## 1. Overview
This repository contains a modern end-to-end (E2E) automation testing framework for a Security Hardware & Merchandising Inventory System. It demonstrates advanced testing patterns including UI validation, network interception, and visual testing.

## 2. Tech Stack
* **Framework:** Playwright
* **Language:** TypeScript
* **Design Pattern:** Page Object Model (POM)
* **CI/CD:** GitHub Actions (Automated Cloud Execution)

## 3. Key Features Demonstrated
* **API Mocking:** Intercepts frontend network requests to inject custom JSON payloads (simulating CCTV and Biometric Gate stock) for highly reliable, fast test execution without backend dependencies.
* **Page Object Model:** Strict separation of UI element locators and test assertions to ensure maintainability.
* **Visual Regression Testing:** Utilizes pixel-by-pixel snapshot comparisons to ensure UI CSS integrity alongside functional logic.
* **Headless Execution:** Optimized for continuous integration pipelines.

## 4. How to Run Locally
Clone the repository and run the following commands:

```bash
npm install
npx playwright test --headed