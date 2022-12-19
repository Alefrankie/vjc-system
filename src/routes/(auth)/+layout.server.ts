import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ locals: { session, authenticated } }) => {
	if (authenticated) {
		throw redirect(302, '/')
	}

	return {
		session
	}
}
