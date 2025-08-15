import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

const db = admin.firestore();

export async function GET(
  request: Request,
  { params }: { params: { collection: string } }
) {
  const collectionName = params.collection;
  try {
    const snapshot = await db.collection(collectionName).get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch from ${collectionName}` }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { collection: string } }
) {
  const collectionName = params.collection;
  try {
    const newItem = await request.json();
    const docRef = await db.collection(collectionName).add(newItem);
    return NextResponse.json({ id: docRef.id, ...newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to create in ${collectionName}` }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { collection: string } }
) {
  const collectionName = params.collection;
  try {
    const { id, ...itemData } = await request.json();
    if (!id) { return NextResponse.json({ error: 'Item ID is required' }, { status: 400 }); }
    await db.collection(collectionName).doc(id).update(itemData);
    return NextResponse.json({ message: 'Item updated' });
  } catch (error) {
    return NextResponse.json({ error: `Failed to update in ${collectionName}` }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { collection: string } }
) {
  const collectionName = params.collection;
  try {
    const { id } = await request.json();
    if (!id) { return NextResponse.json({ error: 'Item ID is required' }, { status: 400 }); }
    await db.collection(collectionName).doc(id).delete();
    return NextResponse.json({ message: 'Item deleted' });
  } catch (error) {
    return NextResponse.json({ error: `Failed to delete in ${collectionName}` }, { status: 500 });
  }
}
