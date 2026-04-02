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

export const EntityType = {
  Asset: "ASSET",
  Liability: "LIABILITY",
  Income: "INCOME",
  Expense: "EXPENSE",
} as const;
export type EntityType = (typeof EntityType)[keyof typeof EntityType];

export const CommitActionType = {
  Add: "ADD",
  Delete: "DELETE",
  Update: "UPDATE",
  Replace: "REPLACE",
} as const;
export type CommitActionType =
  (typeof CommitActionType)[keyof typeof CommitActionType];

export const GoalType = {
  TimeFixed: "TIME_FIXED", // Reach target by specific date
  Commitment: "COMMITMENT", // Something you want to do/be
  Measurable: "MEASURABLE", // Measured by specific metrics
} as const;
export type GoalType = (typeof GoalType)[keyof typeof GoalType];

export const GoalMetric = {
  NetWorth: "NET_WORTH",
  MonthlyIncome: "MONTHLY_INCOME",
  YearlyIncome: "YEARLY_INCOME",
  Savings: "SAVINGS",
} as const;
export type GoalMetric = (typeof GoalMetric)[keyof typeof GoalMetric];
