import { notesTable } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

import { nanoid } from 'nanoid';

import { POSTGRES_URL } from '$env/static/private';

export async function POST({ request }) {
	const queryClient = postgres(POSTGRES_URL);
	const db: PostgresJsDatabase = drizzle(queryClient);

	const { title, note } = await request.json();
	const newId = nanoid();

	await db.insert(notesTable).values({
		id: newId,
		userId: 'default-uid',
		title,
		note
	});

	const result = await db
		.select({ id: notesTable.id, title: notesTable.title, note: notesTable.note })
		.from(notesTable)
		.where(eq(notesTable.id, newId));

	return json(result[0], { status: 200 });
}

export async function GET({ url }) {
	const queryClient = postgres(POSTGRES_URL);
	const db: PostgresJsDatabase = drizzle(queryClient);

	const userId = url.searchParams.get('userId');
	const noteId = url.searchParams.get('noteId');

	if (!userId && !noteId) {
		return json({ message: 'no parameters provided' }, { status: 400 });
	}

	if (userId) {
		const result = await db.select().from(notesTable).where(eq(notesTable.userId, userId));
		if (result) {
			return json(result, { status: 200 });
		} else {
			return json({ message: 'not found' }, { status: 404 });
		}
	}

	if (noteId) {
		const result = await db.select().from(notesTable).where(eq(notesTable.id, noteId));
		if (result) {
			return json(result[0], { status: 200 });
		} else {
			return json({ message: 'not found' }, { status: 404 });
		}
	}
}

export async function PUT({ request }) {
	const queryClient = postgres(POSTGRES_URL);
	const db: PostgresJsDatabase = drizzle(queryClient);

	const note = await request.json();

	if (note) {
		await db.update(notesTable).set(note).where(eq(notesTable.id, note.id));
		const result = await db.select().from(notesTable).where(eq(notesTable.id, note.id));
		return json(result[0], { status: 200 });
	} else {
		return json({ message: 'no parameters provided' }, { status: 400 });
	}
}
