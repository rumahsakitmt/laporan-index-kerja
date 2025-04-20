"use client";

import React from "react";

import { Button } from "./ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";

export default function SignOutButton() {
	const router = useRouter();
	return (
		<DropdownMenuItem
			className="text-red-400"
			onClick={async () => {
				await signOut({
					fetchOptions: {
						onSuccess: () => {
							router.push("/sign-in");
						},
					},
				});
			}}
		>
			<LogOut className="text-red-400" />
			Keluar
		</DropdownMenuItem>
	);
}
