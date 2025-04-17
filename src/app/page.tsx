import LaporanIndexContainer from "@/components/laporan-index-container";
import MainNavigation from "@/components/main-nav";

export default async function Home() {
	return (
		<main className="max-w-6xl mx-auto px-8">
			<MainNavigation />
			<LaporanIndexContainer />
		</main>
	);
}
