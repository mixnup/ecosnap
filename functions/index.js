const { setGlobalOptions } = require("firebase-functions");
const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

admin.initializeApp();
const db = admin.firestore();

// Set global options for all functions
setGlobalOptions({ 
  maxInstances: 10,
  region: "us-central1"
});

/**
 * Triggered when a new user is created in Firebase Auth.
 * Initializes the user's profile in Firestore.
 */
exports.onUserSignup = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL } = user;

  logger.info(`Initializing new user: ${uid} (${email})`);

  try {
    await db.collection("users").doc(uid).set({
      uid,
      email,
      displayName: displayName || "Eco Warrior",
      photoURL: photoURL || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      plan: "free",
      sachets: 3, // Initial balance
      stats: {
        totalScans: 0,
        lastActive: admin.firestore.FieldValue.serverTimestamp()
      }
    });
    
    logger.info(`Successfully created user document for ${uid}`);
  } catch (error) {
    logger.error(`Error creating user document for ${uid}:`, error);
  }
});



