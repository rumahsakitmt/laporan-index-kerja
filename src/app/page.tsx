import LaporanIndexContainer from "@/components/laporan-index-container";
import LaporanIndexForm from "@/components/laporan-index-form";
import MainNavigation from "@/components/main-nav";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default async function Home() {
	return (
		<main className="max-w-6xl mx-auto px-8">
			<MainNavigation />
			<LaporanIndexContainer />
		</main>
	);
}
