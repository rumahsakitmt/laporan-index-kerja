import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { account, session, user, verification } from "@/db/schema";

export const auth = betterAuth({
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	secret: process.env.BETTER_AUTH_SECRET!,
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(data, request) {
			// Send an email to the user with a link to reset their password
		},
	},
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user,
			account,
			session,
			verification,
		},
	}),
	plugins: [admin()],
	socialProviders: {
		google: {
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clientId: process.env.GOOGLE_CLIENT_ID!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
});
