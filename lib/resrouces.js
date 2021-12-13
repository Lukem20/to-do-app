// library for "resources" firestone collection
//	Import firebase lib, returns firestore db in firebase var.
import firebase from "./firebase";

	// Returns all valid IDs for getStaticProps()
export async function getResourceIDs () {
	let output = [];

	try {
			// Retrieve ALL documents from firestore collection named "resources"
		const snapshot = await firebase.collection("resources").get();
			// Loop through and build out an array of all data from firestone collection documents.
		snapshot.forEach(
			(doc) => {
				output.push (
					{
						params: { id: doc.id.toString(),
						name: doc.data().name.toString() }
					}
				);
			}
		);
	} catch (error) {
		console.log(error);
	}

	return output;
}

	// Returns one document's data for a matching ID for getStaticProps()
export async function getResourceData ( idRequested ) {
		// Retrieve one document from our firestone collection matched by unique ID

	const doc = await firebase.collection("resources").doc(idRequested).get();
		// returns all data from firestone docunmebnt as json.
	let output;
	if ( !doc.empty ) {
		output = { id:doc.id, data:doc.data().name };
	} else {
		output = null;
	}

	return output;
}

