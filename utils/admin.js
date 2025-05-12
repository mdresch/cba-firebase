import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Updates the role for a given user.
 *
 * @param {string} userId - The unique ID of the user whose role is being updated.
 * @param {string} newRole - The new role to assign (e.g., "admin", "user").
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", userId);
    
    // Update the role field in the user's document
    await updateDoc(userDocRef, { role: newRole });
    console.log("User role updated successfully!");
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};