// / <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Platform {}

	// interface Session {
	// 	user: IUser
	// 	_id: string
	// 	username: string
	// 	firstName: string
	// 	lastName: string
	// 	gender: string
	// 	role: string
	// }

	interface Locals {
		session: IUser
		authenticated: boolean
	}

	// interface Stuff {}
}
