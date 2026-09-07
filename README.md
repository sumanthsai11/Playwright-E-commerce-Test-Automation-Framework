# Playwright E-commerce Test Automation Framework

Scalable | Maintainable | Reusable | CI/CD ready

Playwright + JavaScript framework for an ecommerce application. It validates the shopper journey (login, cart, checkout, order history), API order creation, network intercepts, and UI controls. Locators, page objects, fixtures, environment config, and reports are kept in separate folders so tests stay easy to extend.

## Framework structure

```text
config/environment/     dev.json, qa.json, staging.json
config/env.config.js    Loads ENV + .env overlays
fixtures/               Browser, POM, login, and API fixtures
pages/                  Page Object Model (BasePage + screen classes)
locators/               Centralized UI selectors
utils/                  constants, dataReader, logger, API helpers
test-data/              JSON datasets (users, place-order)
tests/                  Specs grouped by e2e / api / intercept / ui
reports/                HTML, Allure, and JUnit output
allure-results/         Raw Allure results
logs/                   Step-level log file
screenshots/            Failure screenshots (convention)
test-results/           Playwright traces, videos, artifacts
playwright.config.js    Browsers, timeouts, reporters
```

| Layer | Purpose |
| --- | --- |
| Pages (POM) | Locators stay in `locators/`; actions live in page classes |
| Fixtures | Shared browser, login, token, and API setup/teardown |
| Test data | Run the same test with different JSON inputs |
| Logger | INFO / WARN / ERROR / DEBUG written to `logs/test.log` |
| Utils | Constants, JSON reader, REST helpers |
| Config | Switch `ENV=dev\|qa\|staging` without changing tests |

## Execution flow

1. Test start (local or GitHub Actions)
2. Load environment config and test data
3. Fixtures initialize browser, context, and page objects
4. Specs drive the app through POM methods
5. Logger records each major step
6. HTML, JUnit, and Allure reports are written under `reports/`

## What the tests do

| Suite | Coverage |
| --- | --- |
| `@e2e` | Login → add to cart → checkout → order history |
| `@api` | Create order via REST; confirm it in the UI |
| `@intercept` | Mock empty orders; unauthorized order details |
| `@ui` | Login errors, search, iframe, dialog, child window |

## Setup

```bash
git clone https://github.com/sumanthsai11/Playwright-E-commerce-Test-Automation-Framework.git
cd Playwright-E-commerce-Test-Automation-Framework
cp .env.example .env
npm install
npx playwright install
```

Fill `.env` with application URLs and test credentials. Do not commit `.env`.

Set `ENV=qa` (default), `ENV=dev`, or `ENV=staging`. Values in `.env` override the JSON files in `config/environment/`.

For GitHub Actions, store passwords as **secrets** and URLs as **variables**.

## Run tests

```bash
npm test                 # Chromium, ENV from .env (default qa)
npm run test:qa
npm run test:e2e
npm run test:api
npm run test:ui
npm run test:intercept
npm run test:all-browsers
npm run report           # Playwright HTML report
```

Allure (optional, after tests):

```bash
npm run allure:generate
npm run allure:open
```
