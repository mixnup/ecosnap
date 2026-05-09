const admin = require('firebase-admin');
const path = require('path');

/**
 * SEED INVENTORY SCRIPT
 * Populates a user's inventory with mock data for testing.
 * 
 * Usage: node seed-inventory.js <UID> <COUNT>
 * Example: node seed-inventory.js my-user-id 500
 */

const uid = process.argv[2];
const count = parseInt(process.argv[3]) || 50;

if (!uid) {
  console.error("\x1b[31mError: User UID is required.\x1b[0m");
  console.log("Usage: node seed-inventory.js <UID> [COUNT]");
  process.exit(1);
}

// 1. Initialize Firebase Admin
// Points to your specific service account file in the functions folder
const serviceAccountPath = path.join(__dirname, '../ecosnap-staging-firebase-adminsdk-fbsvc-074ecd00bb.json');

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("\x1b[32mInitialized with service-account.json\x1b[0m");
} catch (e) {
  console.log("\x1b[33mWarning: service-account.json not found in root. Attempting default credentials...\x1b[0m");
  admin.initializeApp();
}

const db = admin.firestore();

// 2. Mock Data Configuration
const ingredients = [
  "Chicken", "Milk", "Eggs", "Spinach", "Avocado", "Tofu", "Broccoli", 
  "Salmon", "Beef", "Pork", "Apples", "Bananas", "Yogurt", "Cheese", 
  "Bread", "Butter", "Garlic", "Onions", "Potatoes", "Carrots",
  "Blueberries", "Kale", "Quinoa", "Lentils", "Greek Yogurt", "Hummus"
];

const categories = ["poultry", "dairy", "produce", "meat", "bakery", "pantry", "seafood"];
const units = ["pcs", "kg", "g", "lb", "bag", "carton", "oz"];

// 3. Seeding Logic
async function seed() {
  console.log(`\x1b[36mSeeding ${count} items for user: ${uid}...\x1b[0m`);
  
  const inventoryRef = db.collection('users').doc(uid).collection('inventory');
  
  // Use Batched Writes for efficiency (limit 500 per batch)
  const batchSize = 500;
  let batch = db.batch();
  let operationCount = 0;
  let totalCommitted = 0;

  for (let i = 0; i < count; i++) {
    const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    
    const item = {
      name: `${ingredient} ${totalCommitted + operationCount + 1}`,
      quantity: parseFloat((Math.random() * 5 + 0.1).toFixed(1)),
      unit: units[Math.floor(Math.random() * units.length)],
      // Random expiry between 6 hours and 10 days
      expiryHours: Math.floor(Math.random() * (240 - 6 + 1)) + 6,
      category: categories[Math.floor(Math.random() * categories.length)],
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = inventoryRef.doc();
    batch.set(docRef, item);
    operationCount++;

    if (operationCount >= batchSize) {
      await batch.commit();
      totalCommitted += operationCount;
      batch = db.batch();
      operationCount = 0;
      console.log(`\x1b[32mCommitted ${totalCommitted} items...\x1b[0m`);
    }
  }

  if (operationCount > 0) {
    await batch.commit();
    totalCommitted += operationCount;
  }

  console.log(`\n\x1b[42m\x1b[30m SUCCESS \x1b[0m Successfully seeded ${totalCommitted} items.`);
  console.log(`View them at: /users/${uid}/inventory`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("\x1b[31mSeeding failed:\x1b[0m", err);
  process.exit(1);
});
