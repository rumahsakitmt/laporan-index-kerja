import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen, LogOut, User2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { buttonVariants } from "./ui/button";
import SignOutButton from "./sign-out-button";
import Link from "next/link";

export default async function MainNavigation() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<nav className="w-full py-4 flex items-center justify-between">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Link href="/">
							<div className="flex items-center gap-4">
								<Image
									src="/images/logo_mateng.png"
									width={30}
									height={30}
									alt="Logo Mamuju Tengah"
								/>
								<div className="text-xs font-bold flex flex-col items-start">
									<p>Laporan Index</p>
									<p>Kerja IT</p>
								</div>
							</div>
						</Link>
					</TooltipTrigger>
					<TooltipContent>
						<p>Laporan Index Kerja</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			{session ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src={session.user.image ?? ""} />
							<AvatarFallback>
								{session.user.name.substring(0, 2)}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User2 />
							Profile
						</DropdownMenuItem>
						<Link href="/ruangan">
							<DropdownMenuItem>
								<DoorOpen />
								Ruangan
							</DropdownMenuItem>
						</Link>
						<SignOutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<div className="flex items-center gap-2">
					<Link
						href="/sign-in"
						className={buttonVariants({
							variant: "default",
							size: "sm",
						})}
					>
						Masuk
					</Link>
					<Link
						href="/sign-up"
						className={buttonVariants({
							variant: "secondary",
							size: "sm",
						})}
					>
						Daftar
					</Link>
				</div>
			)}
		</nav>
	);
}
