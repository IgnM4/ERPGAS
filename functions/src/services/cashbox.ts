import { db } from '../db';

const collection = db.collection('cashbox');

export async function getAll() {
  const snap = await collection.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getById(id: string) {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

export async function create(data: any) {
  const ref = await collection.add(data);
  return { id: ref.id, ...data };
}

export async function update(id: string, data: any) {
  await collection.doc(id).set(data, { merge: true });
  return { id, ...data };
}

export async function remove(id: string) {
  await collection.doc(id).delete();
}
