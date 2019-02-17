const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.emojify =
    functions.firestore.document('/messages/{messageId}/text')
    .onCreate((snap, context) => {
        // Now we begin the emoji transformation
        console.log("emojifying!");

        // Get the value from the 'text' key of the message
        const originalText = snap.data();
        const emojifiedText = emojifyText(originalText);

        // Return a JavaScript Promise to update the database node
        snap.after.data() == {text: emojifiedText} 
    });

    function emojifyText(text) {
        var emojifiedText = text;
        emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
        emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
        return emojifiedText;
    }