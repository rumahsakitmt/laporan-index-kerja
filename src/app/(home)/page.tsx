import ReportFilter from "@/features/report/components/table/report-filter";
import { PWAServiceWorker } from "@/components/pwa-service-worker";
import { InstallPrompt } from "@/components/pwa-install-prompt";
import ReportContainer from "@/features/report/components/report-container";
import CreateReportButton from "@/components/create-report-button";

export default async function Home() {
  return (
    <main className="space-y-4">
      <ReportFilter />
      <CreateReportButton />
      <ReportContainer />
      <PWAServiceWorker />
      <InstallPrompt />
    </main>
  );
}
