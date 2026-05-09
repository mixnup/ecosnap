# Cloud Functions Architecture Guide

## Purpose
This guide provides patterns for organizing Firebase Cloud Functions to ensure consistency, scalability, and maintainability across serverless backend implementations.

## Core Principles
- **Modularity**: Each function has a single responsibility
- **Scalability**: Structure supports growth without refactoring
- **Maintainability**: Clear naming conventions and organization
- **Testability**: Functions are easily testable and debuggable

## How to Use This Guide
1. **New Projects**: Follow the directory structure patterns from the start
2. **Refactoring**: Use these patterns to reorganize existing functions
3. **Code Reviews**: Reference these standards for consistency checks
4. **Team Onboarding**: Share this guide with new developers

---

## Function Organization Pattern

### When to Use This Pattern
- Firebase Cloud Functions projects
- Serverless backend architectures
- Multi-domain business logic
- Scheduled tasks and webhooks

### Overview
This pattern organizes cloud functions by business domain with clear separation between public, admin, and scheduled functions.

### Recommended Directory Structure
```
functions/
├── src/                    # Source code directory
│   ├── [domain]/          # Business domain modules
│   │   ├── [function].js  # Individual function files
│   │   ├── [admin]/       # Admin-only functions (optional)
│   │   │   └── [adminFunction].js
│   │   └── index.js       # Domain exports
│   ├── [otherDomain]/     # Additional domains
│   └── [anotherDomain]/   # More domains as needed
├── index.js               # Main entry point
├── package.json           # Dependencies and scripts
├── .eslintrc.js          # Linting configuration
└── README.md             # Project documentation
```

### Structure Guidelines
- **Domains**: Group related business logic (auth, analytics, wallet, etc.)
- **Functions**: Single file per function with descriptive names
- **Admin**: Separate admin-only functions into subdirectories
- **Exports**: Each domain has an index.js for clean imports

### Naming Flexibility
- Use domain names that match your business logic
- `[domain]` could be `auth`, `analytics`, `payments`, `users`, `content`
- `[function]` should clearly describe what it does
- Keep the pattern, adapt names to your business domain

---

## Function Types and Patterns

### 1. Scheduled Functions
```javascript
// [domain]/[scheduledFunction].js
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions/v2");

exports.generateWeeklyAnalytics = onSchedule(
  {
    schedule: "0 2 * * 0", // Cron expression
    region: "us-central1",
    timeZone: "UTC"
  },
  async (event) => {
    logger.info("Starting scheduled task");
    
    try {
      // Business logic here
      const result = await performScheduledTask();
      logger.info("Task completed successfully");
      return result;
    } catch (error) {
      logger.error("Task failed:", error);
      throw error;
    }
  }
);
```

### 2. HTTP Functions
```javascript
// [domain]/[httpFunction].js
const { onRequest } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");

exports.getPublicData = onRequest(
  {
    region: "us-central1",
    cors: true
  },
  async (request, response) => {
    logger.info("HTTP function called");
    
    try {
      // Handle different HTTP methods
      if (request.method === 'GET') {
        const data = await fetchData();
        response.status(200).json(data);
      } else {
        response.status(405).json({ error: "Method not allowed" });
      }
    } catch (error) {
      logger.error("HTTP function failed:", error);
      response.status(500).json({ error: "Internal server error" });
    }
  }
);
```

### 3. Callable Functions
```javascript
// [domain]/[callableFunction].js
const { onCall } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");

exports.processDataCallable = onCall(
  {
    region: "us-central1"
  },
  async (request) => {
    logger.info("Callable function invoked");
    
    // Verify authentication
    if (!request.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'User must be authenticated'
      );
    }

    try {
      const { data } = request;
      const result = await processData(data, request.auth.uid);
      return { success: true, data: result };
    } catch (error) {
      logger.error("Callable function failed:", error);
      throw new functions.https.HttpsError(
        'internal', 
        'Processing failed'
      );
    }
  }
);
```

---

## Domain Organization Examples

### Analytics Domain (`src/analytics/`)
```
src/analytics/
├── [generateScheduledReport].js        # Scheduled analytics reports
├── [generateReportCallable].js        # Manual report generation
├── [generateMetrics].js               # Metrics calculation
├── [getStatsCallable].js              # Statistics retrieval
└── index.js                           # Domain exports
```

### Wallet Domain (`src/wallet/`)
```
src/wallet/
├── [createWallet].js                  # Create user wallet
├── [updateBalance].js                 # Balance operations
├── [freezeWallet].js                  # Freeze wallet
├── [addTransaction].js                # Transaction logging
├── admin/                             # Admin-only functions
│   ├── [adjustBalance].js             # Admin balance adjustments
│   ├── [reverseTransaction].js        # Transaction reversals
│   ├── [getAuditLog].js               # Audit trail
│   └── [adminManagement].js           # Other admin operations
└── index.js                           # Domain exports
```

### Auth Domain (`src/auth/`)
```
src/auth/
├── [createUserAccount].js             # User registration
├── [updateUserRole].js                # Role management
├── [resetPassword].js                 # Password operations
├── [validateSession].js               # Session validation
└── index.js                           # Domain exports
```

---

## File Structure Patterns

### Main Entry Point (`index.js`)
```javascript
/**
 * Main Cloud Functions Entry Point
 * 
 * This file imports and exports all cloud functions.
 * It serves as the main entry point for Firebase Functions deployment.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (only once)
admin.initializeApp();

// Import function domains
const [domain1]Functions = require('./src/[domain1]');
const [domain2]Functions = require('./src/[domain2]');
const [domain3]Functions = require('./src/[domain3]');
const [otherDomain]Functions = require('./src/[otherDomain]');

// Export all functions
module.exports = {
  // Domain functions
  ...[domain1]Functions,
  ...[domain2]Functions,
  ...[domain3]Functions,
  ...[otherDomain]Functions,
  
  // Legacy or utility functions can be added here
};
```

### Domain Index (`src/[domain]/index.js`)
```javascript
/**
 * [Domain]-related Cloud Functions
 * 
 * This module exports all [domain]-related cloud functions
 */

const [function1] = require('./[function1]');
const [function2] = require('./[function2]');
const [adminFunction] = require('./admin/[adminFunction]');

module.exports = {
  // Public functions
  [function1Name]: [function1].[function1Name],
  [function2Name]: [function2].[function2Name],
  
  // Admin functions
  [adminFunctionName]: [adminFunction].[adminFunctionName],
};
```

---

## Naming Conventions

### Files and Folders
- **Domains**: camelCase (`analytics`, `walletManagement`, `userAuth`)
- **Functions**: camelCase with descriptive verbs (`generateWeeklyAnalytics`, `createUserWallet`)
- **Admin Functions**: Clear admin context (`adminAdjustBalance`, `adminReverseTransaction`)
- **Directories**: camelCase for domains, lowercase for admin subdirectory

### Function Names
```javascript
// Good naming conventions
exports.[generateScheduledReport] = onSchedule(...);
exports.[createUserWallet] = onCall(...);
exports.[getPublicData] = onRequest(...);
exports.[adminAdjustBalance] = onCall(...);

// Clear, descriptive names
exports.[processWebhook] = onRequest(...);
exports.[sendNotifications] = onSchedule(...);
exports.[updateUserProfile] = onCall(...);
```

### Variable Naming
```javascript
// Use descriptive variable names
const [analyticsData] = await generateAnalytics();
const [userBalance] = await getWalletBalance(userId);
const [transactionLog] = await getAuditLog(transactionId);

// Error handling
const [analyticsError] = new Error('Analytics generation failed');
const [validationError] = new Error('Invalid data');
```

---

## Error Handling Patterns

### Standard Error Handling
```javascript
exports.[exampleFunction] = onCall(async (request, response) => {
  try {
    // Validate input
    if (!request.data.[requiredField]) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Required field is missing'
      );
    }

    // Check authentication
    if (!request.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    // Business logic
    const result = await [performBusinessLogic](request.data);
    
    return { success: true, data: result };
    
  } catch (error) {
    logger.error('Function failed:', error);
    
    // Re-throw HTTPS errors as-is
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    
    // Wrap other errors
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred'
    );
  }
});
```

### Logging Best Practices
```javascript
const { logger } = require("firebase-functions/v2");

// Structured logging
logger.info("Function started", { 
  userId: request.auth?.uid, 
  function: "[processData]" 
});

logger.warn("Warning condition", { 
  userId, 
  warning: "[Low balance]" 
});

logger.error("Error occurred", { 
  userId, 
  error: error.message,
  stack: error.stack 
});
```

---

## Configuration and Deployment

### Package.json Structure
```json
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "lint": "eslint .",
    "serve": "firebase emulators:start --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "20"
  },
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^13.6.0",
    "firebase-functions": "^7.0.0"
  },
  "devDependencies": {
    "eslint": "^8.15.0",
    "eslint-config-google": "^0.14.0",
    "firebase-functions-test": "^3.4.1"
  }
}
```

### Environment Configuration
```javascript
// Use environment-specific configuration
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Configuration based on environment
const config = {
  collectionName: isProduction ? '[productionData]' : '[testData]',
  logLevel: isProduction ? 'error' : 'debug',
  timeout: isProduction ? 540000 : 60000 // 9 min vs 1 min
};
```

---

## Testing and Debugging

### Local Testing Structure
```javascript
// Use Firebase emulators for local testing
if (process.env.FUNCTIONS_EMULATOR) {
  // Development-specific code
  logger.info("Running in emulator mode");
  
  // Add test data or mock functions
  const testData = require('./test/[testData]');
}
```

### Function Testing Pattern
```javascript
// Test file: tests/[domain].test.js
const { expect } = require('chai');
const admin = require('firebase-admin');

// Test setup
const testEnv = require('firebase-functions-test')();
const myFunctions = require('../src/[domain]');

// Test cases
describe('[Domain] Functions', () => {
  after(() => {
    testEnv.cleanup();
  });

  it('should [perform expected action]', async () => {
    const wrapped = testEnv.wrap(myFunctions.[functionName]);
    const result = await wrapped({}, { uid: '[testUser]' });
    
    expect(result).to.have.property('success', true);
    expect(result.data).to.be.an('object');
  });
});
```

---

## Implementation Guide

### When Setting Up New Functions:

1. **Choose the domain** for your function (auth, analytics, wallet, etc.)
2. **Create the function file** with descriptive naming
3. **Follow the function type pattern** (scheduled, HTTP, callable)
4. **Implement error handling** with proper logging
5. **Add to domain index** for clean exports
6. **Test locally** with Firebase emulators
7. **Deploy with monitoring** and logging

### Quick Start Checklist
- [ ] Set up Firebase project and functions directory
- [ ] Initialize admin SDK in main index.js
- [ ] Create domain directories for business logic
- [ ] Set up ESLint configuration
- [ ] Configure package.json scripts
- [ ] Set up local emulators for testing
- [ ] Implement logging and error handling patterns

### Domain-Specific Setup
- [ ] **Analytics**: Create scheduled functions and callable reports
- [ ] **Auth**: Implement user management and role-based functions
- [ ] **Payments**: Set up financial transaction handling with admin controls
- [ ] **Custom Domain**: Follow the same pattern for your specific business logic

---

## Conclusion

This architecture guide provides a proven pattern for organizing Firebase Cloud Functions:

- **Domain-Based Organization**: Group related business logic
- **Function Type Patterns**: Consistent structure for scheduled, HTTP, and callable functions
- **Admin Separation**: Clear separation of admin-only functions
- **Error Handling**: Standardized error handling and logging
- **Testing Support**: Built-in patterns for local testing and debugging

Use these patterns to build scalable, maintainable serverless backends while keeping development practices consistent across teams and projects.
