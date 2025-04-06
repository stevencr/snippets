import { firestore } from "../src/firebase/firebaseAdmin"; // Adjust the path based on your project structure

describe("Firestore connection", () => {
  it("should create and fetch a document from Firestore", async () => {
    const docRef = firestore.collection("test").doc("testDoc");
    const testData = { field: "test", updatedAt: new Date().toISOString() };
    await docRef.set(testData);
    const doc = await docRef.get();
    expect(doc.exists).toBe(true);
    expect(doc.data()).toEqual(testData);
  });
});
