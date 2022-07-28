const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.deleteTeacher = functions.firestore.document("users/{uid}")
    .onDelete((snap, context) => {
      return admin.auth().deleteUser(context.params.uid);
    });

exports.updateTeacher = functions.firestore.document("users/{uid}")
    .onUpdate((snap, context) => {
      const newValues = snap.after.data();
      const previousValues = snap.before.data();

      if (newValues.email != previousValues.email) {
        return admin.auth().updateUser(context.params.uid, {
          email: newValues.email,
        });
      }
    });

