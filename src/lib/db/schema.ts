// https://blog.robino.dev/posts/drizzle-svelte
import { text, varchar, pgTable } from 'drizzle-orm/pg-core';

export const notesTable = pgTable('notes', {
	id: varchar('id', { length: 21 }).primaryKey(), // cuid
	userId: text('user_id'),
	title: text('title'),
	note: text('note')
});
