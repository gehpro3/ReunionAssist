import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin'; // <-- CORRECTED PATH ALIAS

const db = admin.firestore();
const guestsCollection = db.collection('guests');

// GET function: To fetch all guests
export async function GET() {
    try {
        const snapshot = await guestsCollection.get();
        const guests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(guests);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch guests' }, { status: 500 });
    }
}

// POST function: To add a new guest
export async function POST(request: Request) {
    try {
        const newGuest = await request.json();
        const docRef = await guestsCollection.add(newGuest);
        return NextResponse.json({ id: docRef.id, ...newGuest }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create guest' }, { status: 500 });
    }
}

// PUT function: To update a guest
export async function PUT(request: Request) {
    try {
        const updatedGuest = await request.json();
        const { id, ...guestData } = updatedGuest;
        if (!id) return NextResponse.json({ error: 'Guest ID is required' }, { status: 400 });
        
        await guestsCollection.doc(id).update(guestData);
        return NextResponse.json({ message: 'Guest updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update guest' }, { status: 500 });
    }
}

// DELETE function: To remove a guest from the database
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ error: 'Guest ID is required' }, { status: 400 });

        await guestsCollection.doc(id).delete();
        return NextResponse.json({ message: 'Guest deleted successfully' });
    } catch (error) {
        console.error("Failed to delete guest:", error);
        return NextResponse.json({ error: 'Failed to delete guest' }, { status: 500 });
    }
}
