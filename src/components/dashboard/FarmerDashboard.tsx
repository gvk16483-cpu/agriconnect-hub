import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, TrendingUp, CloudSun, DollarSign, BarChart3, Bot } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockPriceData = [
  { day: "Mon", mandi: 2200, platform: 2400 },
  { day: "Tue", mandi: 2300, platform: 2500 },
  { day: "Wed", mandi: 2150, platform: 2350 },
  { day: "Thu", mandi: 2400, platform: 2550 },
  { day: "Fri", mandi: 2350, platform: 2500 },
  { day: "Sat", mandi: 2500, platform: 2650 },
  { day: "Sun", mandi: 2450, platform: 2600 },
];

const FarmerDashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("cropStatus")}</CardTitle>
            <Wheat className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Wheat</div>
            <p className="text-xs text-muted-foreground">Growth: Flowering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("daysToHarvest")}</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">32</div>
            <p className="text-xs text-muted-foreground">Expected: March 24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("mandiPrice")}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹2,450</div>
            <p className="text-xs text-success">+5.2% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t("platformPrice")}</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹2,600</div>
            <p className="text-xs text-success">+6.1% vs mandi</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("priceTrend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockPriceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="mandi" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="platform" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bot className="h-4 w-4 text-primary" />
              {t("aiRecommendation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-success/30 bg-success/5 p-4">
              <p className="text-sm font-semibold text-success">📈 {t("sellNow")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Prices are trending upward. Current platform price is 6.1% above mandi price. 
                Recommended to sell within the next 5 days for optimal return.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border p-4">
              <CloudSun className="h-8 w-8 text-info" />
              <div>
                <p className="text-sm font-semibold text-foreground">{t("weather")}</p>
                <p className="text-xs text-muted-foreground">28°C, Partly Cloudy · Humidity 65%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("expenseSummary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">{t("totalExpenses")}</p>
              <p className="text-xl font-bold text-destructive">₹45,000</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">{t("estimatedRevenue")}</p>
              <p className="text-xl font-bold text-success">₹78,000</p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="text-xs text-muted-foreground">{t("netProfit")}</p>
              <p className="text-xl font-bold text-primary">₹33,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
