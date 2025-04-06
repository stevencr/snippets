import admin from "firebase-admin";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountPath) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set"
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const firestore = admin.firestore();

export { firestore };
