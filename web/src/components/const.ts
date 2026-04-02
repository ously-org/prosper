import { AssetType, LiabilityType } from "@/lib/enum";

export const ASSET_TYPE_TEXT: Record<AssetType, string> = {
  [AssetType.Cash]: "Cash & Equivalents",
  [AssetType.Investment]: "Equities (US Stocks)",
  [AssetType.RealEstate]: "Real Estate",
  [AssetType.Other]: "Alternative Assets",
};

export const LIABILITY_TYPE_TEXT: Record<LiabilityType, string> = {
  [LiabilityType.Mortgage]: "Mortgage Debt",
  [LiabilityType.Loan]: "Personal Loans",
  [LiabilityType.CreditCard]: "Consumer Credit",
  [LiabilityType.Other]: "Other Liabilities",
};
