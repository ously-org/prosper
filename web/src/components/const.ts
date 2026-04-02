import { AssetType, LiabilityType } from "@/lib/enum";

export const ASSET_TYPE_TEXT: Record<AssetType, string> = {
  [AssetType.Cash]: "Cash & Equivalents",
  [AssetType.Investment]: "Equities (US Stocks)",
  [AssetType.RealEstate]: "Real Estate",
  [AssetType.Other]: "Alternative Assets",
};

export const ASSET_TEXT_TO_TYPE: Record<string, AssetType> = Object.fromEntries(
  Object.entries(ASSET_TYPE_TEXT).map(([k, v]) => [v, k as AssetType])
);

export const LIABILITY_TYPE_TEXT: Record<LiabilityType, string> = {
  [LiabilityType.Mortgage]: "Mortgage Debt",
  [LiabilityType.Loan]: "Personal Loans",
  [LiabilityType.CreditCard]: "Consumer Credit",
  [LiabilityType.Other]: "Other Liabilities",
};

export const LIABILITY_TEXT_TO_TYPE: Record<string, LiabilityType> = Object.fromEntries(
  Object.entries(LIABILITY_TYPE_TEXT).map(([k, v]) => [v, k as LiabilityType])
);
