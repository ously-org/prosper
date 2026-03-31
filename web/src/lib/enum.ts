export const Frequency = {
  Monthly: "monthly",
  Yearly: "yearly",
} as const;
export type Frequency = (typeof Frequency)[keyof typeof Frequency];

export const AssetType = {
  Cash: "cash",
  Investment: "investment",
  RealEstate: "real_estate",
  Other: "other",
} as const;
export type AssetType = (typeof AssetType)[keyof typeof AssetType];

export const LiabilityType = {
  Mortgage: "mortgage",
  Loan: "loan",
  CreditCard: "credit_card",
  Other: "other",
} as const;
export type LiabilityType = (typeof LiabilityType)[keyof typeof LiabilityType];
