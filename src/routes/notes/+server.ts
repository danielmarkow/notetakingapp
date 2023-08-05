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
		.select({ title: notesTable.title, note: notesTable.note })
		.from(notesTable)
		.where(eq(notesTable.id, newId));

	console.log('result: ', result);

	return json({ title, note }, { status: 200 });
}
