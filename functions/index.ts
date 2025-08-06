import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const updateSessionData = functions.https.onRequest(async (req, res) => {
  try {
    const updates = req.body;
    const db = admin.firestore();
    const sessionRef = db.collection('sessions').doc('your-session-id'); // Make sure to specify the correct document
    await sessionRef.update(updates);
    res.status(200).send({ message: 'Session updated successfully' });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});
