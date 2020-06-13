const functions = require('firebase-functions');

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sendMessage = functions.firestore.document('products/{productId}')
  .onCreate((snapshot, context) => {
    const docId = context.params.productId;
    const name = snapshot.get('name');
    const productRef = admin.firestore().collection('products').doc(docId)

    return productRef.update({ message: `Nice ${name}! - Love Cloud Functions` })
});
