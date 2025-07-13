const admin = require("firebase-admin");

const serviceAccount = require("../its-your-story-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
