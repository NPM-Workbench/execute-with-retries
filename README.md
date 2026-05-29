![exe-with-retries-banner](https://github.com/user-attachments/assets/892ef8cb-100a-4050-9346-c443b8886ee6)
![npm](https://img.shields.io/npm/v/execute-with-retries)
![downloads](https://img.shields.io/npm/dw/execute-with-retries)
![license](https://img.shields.io/npm/l/execute-with-retries)
![Security Policy](https://img.shields.io/badge/security-policy-brightgreen)
![npm_provenance](https://img.shields.io/badge/npm-provenance-brightgreen?logo=npm)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/execute-with-retries)
## Execute-with-Retries

A tiny, dependency-free retry utility with fixed delay or built-in exponential backoff, designed for predictable behavior in modern TypeScript applications.
<br/><br/>
🚨 **Async-only support**
`executeWithRetries` supports **only async callbacks** (functions that return a `Promise`).
Synchronous functions are not supported and must be wrapped in an async function if needed.

### 📦 Installation

```console
npm install execute-with-retries
```

### 🎲 Features

1. Zero dependencies
2. No side effects (no logging by default)
3. Functional (not class-based)
4. Works in both client-side and server-side JavaScript environments
5. Preset Default and tiny configuration surface
6. Async-only by design
7. No hooks, no events, no middleware

### 📚 API Signature

```javascript
executeWithRetries<T>(
  callback: () => Promise<T>, /* arguments are not passed directly; use closures instead */
  options?: {
    retries?: number;
    delay?: {
      type: "fixed" | "exponential";
      ms: number;
    };
  }
): Promise<T>
```

### 🔤 Example Usage

1. Basic Usage: Retrying an Operation

```javascript
import { executeWithRetries } from 'execute-with-retries';
const apiResponse = await executeWithRetries(async () => {
  const response = await fetch('https://api.example.com/data');
  if (!response.ok) {
    throw new Error('Request failed');
  } else {
    return response.json();
  }
});

/*
Note: Default Settings:
Retries: 3 Nos
delay = { type: "fixed", ms: 300 }
*/
```

2. Custom Retry Count Param

```javascript
import { executeWithRetries } from 'execute-with-retries';
const apiResponse = await executeWithRetries(
  async () => {
    const response = await fetch('https://api.example.com/data');
    return response;
  },
  { retries: 5 },
);

/* Note: Retries the operation up to 5 times before failing. */
```

3. Fixed Delay Between Retries

```javascript
import { executeWithRetries } from "execute-with-retries";
const apiResponse = await executeWithRetries(async () => {
  const response = await fetch("https://api.example.com/data");
  return response;
}, {retries: 3, delay: {type: "fixed", ms: 1000}});

/* Note: Waits 1 second between each retry attempt.
```

4. Exponential Backoff Implementation

```javascript
import { executeWithRetries } from 'execute-with-retries';
const apiResponse = await executeWithRetries(
  async () => {
    const response = await fetch('https://api.example.com/data');
    return response;
  },
  { retries: 3, delay: { type: 'exponential', ms: 500 } },
);

/* Note: Delay Pattern:
   First Attempt: 500ms
   Second Attempt: 1000ms
   Third Attempt: 2000ms
   ...and so on.
*/
```

5. Passing Data via a Top-Level Function

```javascript
import { executeWithRetries } from "execute-with-retries";
async function getUserDetails(userId: number): Promise<Record<string, any>> {
  return executeWithRetries(async () => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    } else {
      return await response.json();
    }
  });
}
const userInfo = await getUserDetails(100);
```

### 📗 Test Coverage

```
PASS src/execute-with-retries/test/index.test.ts
  executeWithRetries
    ✓ resolves on first attempt without retries
    ✓ retries failures and resolves when a later attempt succeeds
    ✓ throws immediately when retries is set to 0
    ✓ throws after all retry attempts fail

PASS src/execute-with-retries/test/calculate-delay.test.ts
  calculateDelayMs
    ✓ returns fixed delay milliseconds for fixed type
    ✓ computes exponential delay based on attempt
    ✓ caps exponential delay at 10000ms
```

```
--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|-------------------
All files           |   98.41 |    94.11 |     100 |   98.41 |
 calculate-delay.ts |     100 |      100 |     100 |     100 |
 index.ts           |   97.43 |    92.85 |     100 |   97.43 | 28
--------------------|---------|----------|---------|---------|-------------------
```

### 📘 Contributing

Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### 🔒 Security & Privacy

1. This package is open source and intended to provide reusable utilities for application development. It does not collect, store, transmit, sell, or share user data, and it does not include analytics, tracking, telemetry, cookies, local storage usage, backend services, or project-owned data collection mechanisms.
2. For more details, including vulnerability reporting guidance and consumer security recommendations, please see the [Security Policy](https://github.com/NPM-Workbench/execute-with-retries/security/policy).

### ❤️ Support

Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
