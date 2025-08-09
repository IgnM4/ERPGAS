import { useEffect, useState } from 'react';
import { auth, googleProvider, facebookProvider } from './firebase';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';

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
