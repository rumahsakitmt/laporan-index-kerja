import ReportFilter from "@/features/report/components/table/report-filter";
import ReportPagination from "@/features/report/components/table/report-pagination";
import { ReportTable } from "@/features/report/components/table/report-table";
import { getAuthSession } from "@/lib/auth-context";
import { PWAServiceWorker } from "@/components/pwa-service-worker";
import { InstallPrompt } from "@/components/pwa-install-prompt";

export default async function Home() {
  const currentUser = await getAuthSession();
  return (
    <main className="space-y-4">
      <ReportFilter role={currentUser?.user.role ?? ""} />
      <ReportTable isShowAction={false} />
      <div className="flex justify-end w-full">
        <ReportPagination />
      </div>
      <PWAServiceWorker />
      <InstallPrompt />
    </main>
  );
}
