import { notesTable } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit';

import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import { nanoid } from 'nanoid';

export async function POST({ request }) {
	const db = drizzle(sql);

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
