import { AssetType } from "@/lib/enum";

export interface Asset {
  id: string;
  name: string;
  value: number;
  type: AssetType;
  growthRate: number; // yearly growth rate decimal
  color?: string; // Optional hex or CSS variable for UI
}

export function calculateAssetGrowth(asset: Asset, years: number): number {
  return asset.value * Math.pow(1 + asset.growthRate, years);
}

export function calculateTotalAssets(assets: Asset[]): number {
  return assets.reduce((sum, asset) => sum + asset.value, 0);
}

export function calculateLiquidAssets(assets: Asset[]): number {
  return assets
    .filter((asset) => asset.type === AssetType.Cash)
    .reduce((sum, asset) => sum + asset.value, 0);
}

export function applyAssetChange(asset: Asset, change: AssetChange): Asset {
  return {
    ...asset,
    ...(change.nameTo !== undefined && { name: change.nameTo }),
    ...(change.valueBy !== undefined && {
      value: asset.value + change.valueBy,
    }),
    ...(change.typeTo !== undefined && { type: change.typeTo }),
    ...(change.growthRateBy !== undefined && {
      growthRate: asset.growthRate + change.growthRateBy,
    }),
  };
}

export interface AssetChange {
  nameTo?: string;
  valueBy?: number;
  typeTo?: AssetType;
  growthRateBy?: number;
}
