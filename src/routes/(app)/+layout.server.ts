import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from '../(auth)/$types'

export const load: LayoutServerLoad = ({ locals: { authenticated, session } }) => {
	if (!authenticated) {
		throw redirect(302, '/sign-in')
	}

	return {
		session
	}
}
