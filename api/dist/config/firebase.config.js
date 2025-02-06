import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
const { SERVICE_ACCOUNT } = process.env;
if (SERVICE_ACCOUNT) {
    initializeApp({
        credential: admin.credential.cert(JSON.parse(SERVICE_ACCOUNT)),
    });
}
