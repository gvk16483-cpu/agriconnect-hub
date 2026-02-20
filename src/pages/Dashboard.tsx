import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FarmerDashboard from "@/components/dashboard/FarmerDashboard";
import BuyerDashboard from "@/components/dashboard/BuyerDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import TransporterDashboard from "@/components/dashboard/TransporterDashboard";
import StorageProviderDashboard from "@/components/dashboard/StorageProviderDashboard";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { t } = useTranslation();
  const { user, loading, role, profileStatus } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/login" />;

  if (profileStatus === "pending") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold text-foreground">{t("accountPending")}</h2>
          <p className="mt-2 text-muted-foreground">{t("accountPendingDesc")}</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case "farmer": return <FarmerDashboard />;
      case "buyer": return <BuyerDashboard />;
      case "admin": return <AdminDashboard />;
      case "transporter": return <TransporterDashboard />;
      case "storage_provider": return <StorageProviderDashboard />;
      default: return <FarmerDashboard />;
    }
  };

  return (
    <DashboardLayout role={role || "farmer"}>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
