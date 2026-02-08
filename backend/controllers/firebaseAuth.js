const admin = require("../config/firebaseAdmin");
const decoded = await admin.auth().verifyIdToken(token);
