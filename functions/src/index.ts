import { setGlobalOptions } from "firebase-functions";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
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

    let claims: any = {};

    if (role === "admin") {
      claims = { admin: true, news: true };
    } else if (role === "news") {
      claims = { news: true };
    } else {
      claims = {};
    }

    await admin.auth().setCustomUserClaims(uid, claims);

    console.log("Claims frissítve:", uid, claims);
  }
);