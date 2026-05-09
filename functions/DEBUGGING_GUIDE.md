# Firebase Functions Debugging Guide

This guide covers the commands and techniques used to debug Firebase Functions code.

## Error Checking Commands

### 1. Syntax Check
```bash
node -c index.js
```
- `-c` flag checks syntax without executing the code
- Catches syntax errors, missing imports, etc.
- Run on individual files: `node -c src/team/onInvitationAccept.js`

### 2. Module Loading Test
```bash
node -e "console.log('Loading functions...'); const funcs = require('./index.js'); console.log('Functions:', Object.keys(funcs));"
```
- `-e` executes JavaScript code directly
- Tests if modules can be loaded without runtime errors
- Shows what functions are successfully exported

### 3. Individual File Testing
```bash
node -c src/team/onInvitationAccept.js
node -c src/team/onInvitationExpire.js
```
- Check syntax of individual function files

### 4. Dependency Verification
```bash
node -e "console.log(require('firebase-functions/package.json').version)"
```
- Check Firebase Functions version to ensure API compatibility

## Common Error Patterns & Solutions

### 1. API Version Mismatch
**Problem**: `functions.firestore.document is not a function`
**Solution**: Use Firebase Functions v2 API
```javascript
// Old (v1)
exports.myFunction = functions.firestore
  .document('collection/{docId}')
  .onUpdate(async (change, context) => { ... });

// New (v2)
const { onDocumentUpdated } = require('firebase-functions/v2/firestore');
exports.myFunction = onDocumentUpdated('collection/{docId}', async (event) => { ... });
```

### 2. Multiple Initialization
**Problem**: `admin.initializeApp()` called multiple times
**Solution**: Initialize only once in main index.js
```javascript
// In index.js (main entry point)
const admin = require('firebase-admin');
admin.initializeApp();

// In other files - DON'T call admin.initializeApp()
const admin = require('firebase-admin');
```

### 3. Import/Export Mismatch
**Problem**: Cannot destructure non-existent exports
**Solution**: Use correct import syntax
```javascript
// Wrong
const { nonExistentExport } = require('./myModule');

// Correct
const myModule = require('./myModule');
const functionToUse = myModule.exportedFunction;
```

### 4. Function Signature Changes
**Problem**: Different parameter structure between v1 and v2 APIs
**Solution**: Update parameter handling
```javascript
// v1 API
.onUpdate(async (change, context) => {
  const newValue = change.after.data();
  const { docId } = context.params;
});

// v2 API
.onDocumentUpdated('collection/{docId}', async (event) => {
  const newValue = event.data.after.data();
  const { docId } = event.params;
});
```

## Testing Workflow

1. **Syntax First**: Always run `node -c` on each file
2. **Load Test**: Try to require the main index file
3. **Incremental**: Test files individually before testing the whole system
4. **Version Check**: Verify dependency versions match API usage

## Firebase Functions API Reference

### Firestore Triggers (v2)
```javascript
const { onDocumentCreated, onDocumentUpdated, onDocumentDeleted, onDocumentWritten } = require('firebase-functions/v2/firestore');

// Document created
exports.onCreate = onDocumentCreated('collection/{docId}', async (event) => { ... });

// Document updated
exports.onUpdate = onDocumentUpdated('collection/{docId}', async (event) => { ... });

// Document deleted
exports.onDelete = onDocumentDeleted('collection/{docId}', async (event) => { ... });

// Any document change
exports.onWrite = onDocumentWritten('collection/{docId}', async (event) => { ... });
```

### HTTP Triggers (v2)
```javascript
const { onRequest } = require('firebase-functions/v2/https');

exports.myHttpFunction = onRequest(async (request, response) => { ... });
```

## Common Debugging Commands

### Check Firebase Functions Version
```bash
node -e "console.log('Firebase Functions:', require('firebase-functions/package.json').version)"
node -e "console.log('Firebase Admin:', require('firebase-admin/package.json').version)"
```

### Test Individual Function Files
```bash
# Syntax check
node -c src/team/onInvitationAccept.js

# Load test
node -e "require('./src/team/onInvitationAccept'); console.log('File loaded successfully')"
```

### Full System Test
```bash
# Test complete function loading
node -e "
try {
  const funcs = require('./index.js');
  console.log('✅ Functions loaded:', Object.keys(funcs));
} catch(e) {
  console.error('❌ Error:', e.message);
  console.error('Stack:', e.stack);
}
"
```

## Shared Utilities Pattern (New)

We use shared utilities in `src/utils/` to reduce boilerplate code across callable functions.

### Available Utilities
```javascript
const { requireAuth, requireVerifiedEmail, requireArgs, logFunctionStart, withErrorHandling } = require('../utils');
```

### Standard Callable Function Pattern
```javascript
exports.myFunction = onCall(
  { region: "us-central1" },
  withErrorHandling(async (request) => {
    logFunctionStart("myFunction", request);
    
    const uid = requireAuth(request, 'User must be authenticated.');
    requireVerifiedEmail(request, 'You must have a verified email.');
    requireArgs(request.data, ['requiredField1', 'requiredField2']);
    
    // Your business logic here...
    
    return { success: true, data: result };
  }, 'operation description')
);
```

### Utility Functions Reference

| Function | Purpose | Usage |
|----------|---------|-------|
| `requireAuth(request, message)` | Verify user is authenticated | Returns `uid` or throws `unauthenticated` |
| `requireVerifiedEmail(request, message)` | Verify email is verified | Throws `permission-denied` if not |
| `requireArgs(data, fields[])` | Validate required arguments | Throws `invalid-argument` if missing |
| `logFunctionStart(name, request)` | Standardized logging | Logs function name and userId |
| `withErrorHandling(fn, context)` | Wrap with error handling | Catches errors, logs them, throws `internal` |

### Benefits
- **Consistent error messages** across all functions
- **Reduced boilerplate** (~20 lines → 5 lines per function)
- **Standardized logging** for easier debugging
- **Automatic error wrapping** for unexpected errors

## Tips for Firebase Functions v2

1. **Always use v2 imports**: `require('firebase-functions/v2/*')`
2. **Initialize admin once**: Only in main index.js
3. **Check parameter names**: v2 uses `event` instead of `change, context`
4. **Update event structure**: `event.data.after` instead of `change.after`
5. **Test locally**: Use Firebase emulator before deployment
6. **Use shared utilities**: Import from `../utils` for auth, validation, and error handling

## Error Message Quick Reference

| Error | Cause | Solution |
|-------|-------|----------|
| `functions.firestore.document is not a function` | Using v1 API with v7 SDK | Update to v2 API imports |
| `The default Firebase app already exists` | Multiple `admin.initializeApp()` calls | Remove duplicate initialization |
| `Cannot destructure property` | Importing non-existent export | Check module exports structure |
| `module not found` | Incorrect file path or missing dependency | Verify file paths and package.json |
