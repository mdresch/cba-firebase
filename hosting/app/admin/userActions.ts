'use server';

import { getAuth, UserRecord } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { User } from '../../app/utils/types';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    admin.initializeApp();
  } catch (error: any) {
    console.error('Error initializing Firebase Admin SDK:', error);
  }
}

const auth = getAuth();
const db = getFirestore();

export const listAllUsers = async (nextPageToken?: string): Promise<User[]> => {
  try {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    console.log('listUsersResult:', listUsersResult); // Log the result
    const users: User[] = listUsersResult.users.map((userRecord: UserRecord) => {
      // Add more detailed logging for each user record
      console.log('Processing user record:', userRecord.uid, userRecord.email);
      if (!userRecord.displayName) {
        console.warn('User record missing displayName:', userRecord.uid);
      }
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