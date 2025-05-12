import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export async function loginUser(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  return await signOut(auth);
}