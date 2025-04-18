import { admin } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_APP_URL,
	plugins: [admin()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
export type Session = typeof authClient.$Infer.Session & {
	user: {
		role: string;
	};
};
