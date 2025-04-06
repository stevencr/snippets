"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = void 0;
var firebase_admin_1 = require("firebase-admin");
var path = require("path");
var rootPath = path.resolve(__dirname, "../..");
var serviceAccountPath = path.resolve(rootPath, "cranster-snippets-app-firebase-admin.json");
if (!serviceAccountPath) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set");
}
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountPath),
});
var firestore = firebase_admin_1.default.firestore();
exports.firestore = firestore;
