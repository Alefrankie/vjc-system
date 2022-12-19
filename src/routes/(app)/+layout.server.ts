import type { LayoutServerLoad } from '.svelte-kit/types/src/routes/(auth)/$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals: { authenticated, session } }) => {
	if (!authenticated) {
		throw redirect(302, '/sign-in')
	}

	return {
		session
	}
}
