import { notesTable } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { nanoid } from 'nanoid';

import { POSTGRES_URL } from '$env/static/private';

export async function POST({ request }) {
	const queryClient = postgres(POSTGRES_URL);
	const db: PostgresJsDatabase = drizzle(queryClient);

	const { title, note } = await request.json();
	console.log('title: ', title);
	console.log('note: ', note);

	const result = await db.insert(notesTable).values({
		id: nanoid(),
		userId: 'default-uid',
		title,
		note
	});

	console.log('result: ', result);

	return json({ note }, { status: 200 });
}
