import { type ChartConfig } from "@/components/ui/chart";

export interface ChartGoalMarker {
  date: string; // Changed from year to date to match chart data
  netWorth: number;
  label: string;
  isAchieved: boolean;
}

// Generate mock data for up to 30 years (monthly)
export const generateMockData = () => {
  const data = [];
  const startDate = new Date("2024-01-01");

  let cash = 100000;
  let stock = 800000;
  let property = 600000;
  let crypto = 100000;

  let mortgage = 150000;
  let loan = 40000;
  let credit = 10000;

  for (let i = 0; i <= 360; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    // Asset Growth
    cash *= 1.001;
    stock *= 1.007 + Math.random() * 0.002;
    property *= 1.003;
    crypto *= 1.01 + (Math.random() * 0.05 - 0.025);

    // Liability Reduction
    mortgage *= 0.997;
    loan *= 0.99;
    credit = Math.max(0, credit - 500);

    const fCash = Math.floor(cash);
    const fStock = Math.floor(stock);
    const fProperty = Math.floor(property);
    const fCrypto = Math.floor(crypto);
    const fMortgage = Math.floor(mortgage);
    const fLoan = Math.floor(loan);
    const fCredit = Math.floor(credit);

    const totalAssets = fCash + fStock + fProperty + fCrypto;
    const tiedLiabilities = fMortgage;
    const untiedLiabilities = fLoan + fCredit;

    const equity = totalAssets - tiedLiabilities;
    const untiedDebt = -untiedLiabilities;
    const netWorth = totalAssets - (tiedLiabilities + untiedLiabilities);

    data.push({
      date: date.toISOString().split("T")[0],
      // Assets
      cash: fCash,
      stock: fStock,
      property: fProperty,
      crypto: fCrypto,
      totalAssets: totalAssets,
      // Liabilities
      mortgage: fMortgage,
      loan: fLoan,
      credit: fCredit,
      totalLiabilities: tiedLiabilities + untiedLiabilities,
      // Summary
      netWorth: netWorth,
      equity: equity,
      untiedDebt: untiedDebt,
    });
  }
  return data;
};

export const chartData = generateMockData();

export const chartConfig = {
  netWorth: { label: "Net Worth", color: "var(--chart-1)" },
  equity: { label: "Equity", color: "var(--chart-1)" },
  untiedDebt: { label: "Untied Debt", color: "var(--destructive)" },
  cash: { label: "Cash", color: "var(--chart-2)" },
  stock: { label: "Stock", color: "var(--chart-3)" },
  property: { label: "Property", color: "var(--chart-4)" },
  crypto: { label: "Crypto", color: "var(--chart-5)" },
  mortgage: { label: "Mortgage", color: "var(--destructive)" },
  loan: { label: "Personal Loan", color: "#f59e0b" },
  credit: { label: "Credit Card", color: "#ec4899" },
  totalAssets: { label: "Total Assets", color: "var(--chart-2)" },
  totalLiabilities: { label: "Total Liabilities", color: "var(--destructive)" },
} satisfies ChartConfig;
