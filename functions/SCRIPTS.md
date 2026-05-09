# EcoSnap - Backend Scripts & Maintenance

This directory is intended for utility scripts used for database maintenance, data migrations, or administrative tasks. These scripts are designed to interact directly with the Firebase environment using the Firebase Admin SDK.

## Pre-requisites

To run maintenance scripts, you must have a valid Firebase Service Account key:

1. Go to the **Firebase Console** > **Project Settings** > **Service Accounts**.
2. Click **Generate new private key**.
3. Save the JSON file within the `functions/` directory (e.g., `service-account.json`).
4. **IMPORTANT**: Ensure this file is listed in your `.gitignore`. Never commit service account keys to version control.

## Running Scripts

Scripts should be executed from the `functions/` directory. You must point to your service account key using an environment variable so the Admin SDK can authenticate.

### Execution Pattern

```bash
# 1. Set the credentials environment variable (Mac/Linux)
export GOOGLE_APPLICATION_CREDENTIALS="service-account.json"

# 2. Run your script via npm (if registered in package.json)
npm run <script-name>

# Alternatively, run directly with node
node scripts/your-script.js
```

## Available Scripts

### 1. Seed Inventory
`npm run seed:inventory -- <UID> <COUNT>`

Populates a user's inventory sub-collection with mock data. Useful for testing UI performance with large datasets or verifying triage logic.

*   **UID**: The target user's Firebase UID.
*   **COUNT**: Number of items to generate (default: 50).

**Example:**
```bash
# Seed 500 items for a specific user
npm run seed:inventory -- my-user-id-123 500
```

## Adding New Scripts

To maintain a clean and standardized environment for administrative tasks, follow these steps:

1. **Location**: Place your script in a `functions/scripts/` directory (create it if it doesn't exist).
2. **Standard Header**: Ensure your script initializes the Firebase Admin SDK using the default credentials:
   ```javascript
   const admin = require('firebase-admin');
   admin.initializeApp({
     credential: admin.credential.applicationDefault()
   });
   const db = admin.firestore();
   ```
3. **Registration**: Add the script to the `"scripts"` section of `functions/package.json` for easy execution.
4. **Documentation**: Briefly document the script's purpose and usage in this file or within the script's comments.

