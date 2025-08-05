import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const updateSessionData = functions.https.onRequest(async (req, res) => {
  try {
    const updates = req.body;
    const db = admin.firestore();
    const results: string[] = [];

    for (const category in updates) {
      const items = updates[category];
      for (const item of items) {
        const docId = item.id || db.collection(category).doc().id;
        const ref = db.collection(category).doc(docId);
        const existing = await ref.get();

        if (existing.exists) {
          await ref.update(item);
          results.push(`Updated ${category}: ${docId}`);
        } else {
          await ref.set(item);
          results.push(`Added ${category}: ${docId}`);
        }
      }
    }

    return res.status(200).json({ success: true, results });
  } catch (error: any) {
    console.error('Error updating session ', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
