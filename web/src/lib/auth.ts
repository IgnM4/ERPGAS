import { useEffect, useState } from 'react';
import { auth, googleProvider, facebookProvider } from './firebase';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  return user;
}

export function loginWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function loginWithFacebook() {
  return signInWithPopup(auth, facebookProvider);
}

export function logout() {
  return signOut(auth);
}

export async function registerWithEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(cred.user);
  return cred.user;
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}
