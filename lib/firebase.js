import admin from 'firebase-admin'

const app = admin.initializeApp();

const serviceAccount = JSON.parse(
	process.env.FIREBASE_PRIVATE_KEY
);

try{
		admin.initializeApp(
			{
				credential: admin.credential.cert(serviceAccount),
				databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
			}
		);
	}	catch(err) {
		// If error happens.
		console.log("Firebase err... ", err.stack);
	}

	export default admin.firestore();