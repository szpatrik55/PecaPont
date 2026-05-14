import { setGlobalOptions } from "firebase-functions";
import { onDocumentWritten } from "firebase-functions/v2/firestore";

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });

// 🔥 USER ROLE → CUSTOM CLAIM SYNC
export const syncUserRole = onDocumentWritten(
  "users/{uid}",
  async (event) => {

    const data = event.data?.after.data();
    const uid = event.params.uid;

    if (!data) return;

    const role = data.role;

    // 🔥 Custom claims generálása
    const claims = {
      admin: role === "admin",

      // admin automatikusan news jogot is kap
      news: role === "news" || role === "admin",

      manager: role === "manager",

      organiser: role === "organiser"
    };

    await admin.auth().setCustomUserClaims(
      uid,
      claims
    );

    console.log(
      "Claims frissítve:",
      uid,
      claims
    );
  }
);

// 🔥 USER DELETE
export const deleteUser = functions.https.onCall(
  async (request) => {

    if (!request.auth) {

      throw new functions.https.HttpsError(
        "unauthenticated",
        "Nincs bejelentkezve"
      );
    }

    const callerUid = request.auth.uid;

    const callerDoc = await admin
      .firestore()
      .collection("users")
      .doc(callerUid)
      .get();

    const callerData = callerDoc.data();

    if (callerData?.role !== "admin") {

      throw new functions.https.HttpsError(
        "permission-denied",
        "Nem admin"
      );
    }

    const uid = request.data.uid;

    if (!uid) {

      throw new functions.https.HttpsError(
        "invalid-argument",
        "Hiányzó UID"
      );
    }

    // 🔥 Saját magát ne törölhesse
    if (uid === callerUid) {

      throw new functions.https.HttpsError(
        "failed-precondition",
        "Saját magadat nem törölheted"
      );
    }

    // 🔥 Firestore user doc törlés
    await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .delete();

    // 🔥 Firebase Auth user törlés
    await admin
      .auth()
      .deleteUser(uid);

    return {
      success: true
    };
  }
);