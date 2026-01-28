
# Playwright + TypeScript E2E Automation Framework

---

##  Introduction (by the author)

This framework is built as a **modern, production-ready end-to-end test automation solution** using **Playwright and TypeScript**.

The project demonstrates **best practices used in real enterprise environments**, including:
- Clean architecture
- Page Object Model (POM)
- Scalable configuration management
- CI/CD pipeline integration
- Parallel execution strategies
- Robust selector strategy
- Secure environment handling

This is **not a demo-only project**, but a **template architecture** that can be used in real-world systems.

---

##  Why Playwright + TypeScript?

### Why Playwright?
- Native multi-browser support (Chromium, Firefox, WebKit)
- Fast execution engine
- Auto-waiting & stable selectors
- Excellent debugging tools
- Powerful parallel execution model
- Built-in API testing support

### Why TypeScript?
- Strong typing = fewer runtime bugs
- IDE auto-completion
- Safer refactoring
- Enterprise-grade maintainability

---

## Why `testIdAttribute: 'data-test'`?

I configure Playwright to treat `data-test` as the **primary test selector**:

```ts
use: {
  testIdAttribute: 'data-test'
}
```

### Why?
- Designed specifically for automation
- Stable against UI changes
- Independent of styling & layout changes
- Resistant to localization and translations

This follows **Playwright best practice recommendations**.

---

## 🎯 Locator Strategy Priority

Selectors follow Playwright’s recommended priority:

1. `getByTestId()`
2. `getByRole()`
3. `getByLabel()`
4. `getByPlaceholder()`
5. `getByText()`

 `getByText()` is used **only as fallback** due to localization risks.

---

##  Why Static Product Data?

SauceDemo uses **static catalog data**, therefore:

- Product names & prices are **hardcoded**
- No backend seeding or dynamic fixtures required

### In real production systems:
- Data seeding APIs
- DB fixtures
- Environment refresh endpoints

would be used instead.

---

## Project Structure

```
.
├── config/
│   ├── env.ts
│
├── data/
│   ├── users.ts
│   ├── products.ts
│
├── pages/
│   ├── login.page.ts
│   ├── products.page.ts
│   ├── cart.page.ts
│   ├── checkout-info.page.ts
│   ├── checkout-overview.page.ts
│   ├── burger-menu.page.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── checkout.spec.ts
│   ├── burger-menu.spec.ts
│
├── .env.local.example
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Installation & Setup (Detailed)

### 1 System Requirements

- Node.js >= 18
- npm >= 9
- Git
- VS Code (recommended)

Check versions:

```bash
node -v
npm -v
```

---

### 2 Clone Repository

```bash
git clone https://github.com/your-org/playwright-task-solution.git
cd playwright-task-solution
```

---

### 3 Install Dependencies

```bash
npm install
```

---

### 4 Install Playwright Browsers

```bash
npx playwright install
```

---

### 5 Configure Environment

Copy example file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
TEST_ENV=qa
BASE_URL_QA=https://www.saucedemo.com
BASE_URL_STAGING=https://www.saucedemo.com
SAUCE_PASSWORD=secret_sauce
```

---

## Environment Handling Logic

```
.env.local  →  config/env.ts  →  playwright.config.ts  →  Tests
```

### Priority Order:

```
GitHub Actions inputs
   ↓
GitHub Secrets
   ↓
.env.local
```

---

##  Available Scripts Explained

| Script | Description |
|--------|-------------|
| `npm test` | Run full regression suite |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:headed` | Run in headed browser |
| `npm run test:ui` | Run Playwright UI mode |
| `npm run test:debug` | Debug mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run report` | Open HTML report |

---


## Tagging Strategy

Tags are implemented using Playwright grep:

```ts
test.describe('Login @smoke', () => {})
```

### Example usage:

| Tag | Purpose |
|-------|----------|
| `@smoke` | CI fast validation |
| `@regression` | Full regression |
| `@critical` | High priority tests |

---

## GitHub Actions Pipeline Architecture

### Selectable Inputs:

- Environment → `qa / staging`
- Test Type → `smoke / regression`
- Parallel Mode → `none / specs / browsers`

---

### Execution Strategies:

| Mode | Description |
|--------|--------------|
| `none` | Sequential execution |
| `specs` | Parallel per test file |
| `browsers` | Parallel per browser |

---

## Parallelization Architecture

### Option 1: By Spec Files
```
Spec 1 → Worker 1
Spec 2 → Worker 2
Spec 3 → Worker 3
```

### Option 2: By Browsers
```
Chromium → Worker 1
Firefox → Worker 2
WebKit → Worker 3
```

---

## Security Best Practices

- Password stored in `.env.local`
- GitHub Secrets for CI
- No credentials committed
- Roles & users separated

---

## 🧠 Architecture Flow Diagram

```
Local Development
      ↓
.env.local
      ↓
config/env.ts
      ↓
playwright.config.ts
      ↓
Test Runner
      ↓
Browser
      ↓
Report
```

---

## CI/CD Flow Diagram

```
GitHub Actions
     ↓
Environment Selection
     ↓
Test Type Selection
     ↓
Parallel Mode Selection
     ↓
Playwright Execution
     ↓
HTML + JUnit Reports
```

---

## Test Pyramid Strategy

```
         UI E2E
      API Tests
   Integration Tests
 Unit Tests
```
---

