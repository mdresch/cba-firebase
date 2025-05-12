'use server';

import { getAuth, UserRecord } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const auth = getAuth();
const db = getFirestore();

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  role?: string; // Assuming a 'role' custom claim/field
  // Add other relevant user properties from UserRecord
}

export const listAllUsers = async (nextPageToken?: string): Promise<User[]> => {
  try {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    const users: User[] = listUsersResult.users.map((userRecord: UserRecord) => {
      const userJson = userRecord.toJSON();
      return {
        uid: userJson.uid,
        email: userJson.email,
        displayName: userJson.displayName,
        role: userJson.customClaims?.role, // Access custom claims
        // Map other properties as needed
      };
    });
    return users;
  } catch (error) {
    console.error('Error listing users:', error);
    throw error;
  }
};

export const updateUserRole = async (uid: string, role: string): Promise<void> => {
  try {
    await auth.setCustomUserClaims(uid, { role });
    // Optionally, update a Firestore document for easier querying
    await db.collection('users').doc(uid).set({ role }, { merge: true });
    console.log(`Successfully updated role for user ${uid} to ${role}`);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};