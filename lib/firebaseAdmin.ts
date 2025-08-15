import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountString) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set.');
    }
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountString))
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}
export default admin;
