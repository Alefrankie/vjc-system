/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: any
		authenticated: boolean
	}

	// interface Platform {}

	interface Session {
		user: IUser
		_id: string
		authenticated: boolean
		username: string
		firstName: string
		lastName: string
		gender: string
		role: string
	}

	// interface Stuff {}
}
