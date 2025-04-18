"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import GoogleSigninButton from "@/components/google-signin-button";

export default function SignIn() {
	return (
		<Card className="max-w-xl w-full mx-4 md:mx-0 md:w-xl">
			<CardHeader className="flex">
				<div className="flex-1">
					<Image
						className="w-auto h-auto mx-auto"
						src="/images/logo_mateng.png"
						width={100}
						height={100}
						alt="logo mamuju tengah"
					/>
				</div>
				<div className="flex-1">
					<CardTitle className="text-lg md:text-xl">
						Laporan Index Kerja IT <br /> RSUD Mateng
					</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Laporan ini menyajikan hasil analisis dari index kerja yang telah
						dilakukan. Index kerja ini mencakup berbagai aspek penting seperti
						produktivitas, efisiensi, dan kinerja karyawan.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div
						className={cn(
							"w-full gap-2 flex items-center",
							"justify-between flex-col",
						)}
					>
						<GoogleSigninButton />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
