import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Sprout, Home, Wheat, ShoppingCart, Truck, Warehouse,
  DollarSign, Settings, LogOut, Users, ListChecks, Globe,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const sidebarLinks: Record<string, { icon: React.ElementType; labelKey: string; href: string }[]> = {
  farmer: [
    { icon: Home, labelKey: "home", href: "/dashboard" },
    { icon: Wheat, labelKey: "myCrops", href: "/dashboard" },
    { icon: ShoppingCart, labelKey: "sellNow", href: "/dashboard" },
    { icon: Warehouse, labelKey: "store", href: "/dashboard" },
    { icon: Truck, labelKey: "transport", href: "/dashboard" },
    { icon: DollarSign, labelKey: "expenses", href: "/dashboard" },
  ],
  buyer: [
    { icon: Home, labelKey: "home", href: "/dashboard" },
    { icon: Wheat, labelKey: "trendingCrops", href: "/dashboard" },
    { icon: ListChecks, labelKey: "myOrders", href: "/dashboard" },
  ],
  admin: [
    { icon: Home, labelKey: "overview", href: "/dashboard" },
    { icon: Users, labelKey: "allUsers", href: "/dashboard" },
    { icon: ListChecks, labelKey: "allListings", href: "/dashboard" },
  ],
  transporter: [
    { icon: Home, labelKey: "home", href: "/dashboard" },
    { icon: Truck, labelKey: "availableRequests", href: "/dashboard" },
    { icon: DollarSign, labelKey: "earnings", href: "/dashboard" },
  ],
  storage_provider: [
    { icon: Home, labelKey: "home", href: "/dashboard" },
    { icon: Warehouse, labelKey: "bookings", href: "/dashboard" },
    { icon: DollarSign, labelKey: "earnings", href: "/dashboard" },
  ],
};

const DashboardLayout = ({ children, role }: { children: ReactNode; role: string }) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const links = sidebarLinks[role] || sidebarLinks.farmer;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const dashTitleKey = `${role === "storage_provider" ? "storageProvider" : role}Dashboard`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-5">
          <Sprout className="h-7 w-7 text-sidebar-primary" />
          <span className="text-lg font-bold">AgriSync</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.labelKey}
                to={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h1 className="text-lg font-bold text-foreground">{t(dashTitleKey)}</h1>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="mr-2 h-4 w-4" />
                  {language === "en" ? "EN" : language === "hi" ? "हि" : "తె"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("hi")}>हिंदी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("te")}>తెలుగు</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
