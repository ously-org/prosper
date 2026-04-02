import { AssetType } from "@/lib/enum";

export const ASSET_TYPE_TEXT: Record<AssetType, string> = {
  [AssetType.Cash]: "Cash & Equivalents",
  [AssetType.Investment]: "Equities (US Stocks)",
  [AssetType.RealEstate]: "Real Estate",
  [AssetType.Other]: "Alternative Assets",
};
