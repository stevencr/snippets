import admin from "firebase-admin";
import * as path from "path";

const rootPath = path.resolve(__dirname, "../..");

const serviceAccountPath = path.resolve(
  rootPath,
  "cranster-snippets-app-firebase-admin.json"
);

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
