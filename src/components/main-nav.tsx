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
import { LogOut, User2 } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

export default function MainNavigation() {
	return (
		<nav className="w-full py-4 flex items-center justify-between">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex items-center gap-4">
							<Image
								src="/images/logo_mateng.png"
								width={30}
								height={30}
								alt="Logo Mamuju Tengah"
							/>
							<div className="text-xs font-bold flex flex-col items-start">
								<p>Laporan Index</p>
								<p>Kerja</p>
							</div>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Laporan Index Kerja</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						<AvatarImage src="https://github.com/putuhema.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<User2 />
						Profile
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LogOut />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
