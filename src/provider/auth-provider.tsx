"use client";

import * as React from "react";

import type { Session } from "@/lib/auth-client";

interface AuthContextType {
	session: Session | null;
	setSession: (session: Session | null) => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
	initialSession: Session | null;
}

export function AuthProvider({ children, initialSession }: AuthProviderProps) {
	const [session, setSession] = React.useState(initialSession);

	return (
		<AuthContext.Provider value={{ session, setSession }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = (): AuthContextType => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthPovider");
	}
	return context;
};
