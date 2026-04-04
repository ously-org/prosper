import type { Asset, AssetChange } from "@/lib/model/Asset";
import { applyAssetChange } from "@/lib/model/Asset";
import { assets, setAssets } from "./state";
import { delay } from "./utils";

export async function fetchAssets() {
  await delay(300);
  return assets;
}

export async function updateAsset(asset: Asset) {
  await delay(300);
  setAssets(assets.map((a) => (a.id === asset.id ? asset : a)));
  return asset;
}

export async function addAsset(asset: Asset) {
  await delay(300);
  setAssets([...assets, asset]);
  return asset;
}

export async function deleteAsset(id: string) {
  await delay(300);
  setAssets(assets.filter((a) => a.id !== id));
}

export function internalApplyAssetChange(id: string, change: AssetChange) {
  setAssets(assets.map((a) => (a.id === id ? applyAssetChange(a, change) : a)));
}

export function internalReplaceAsset(id: string, asset: Asset) {
  setAssets(assets.map((a) => (a.id === id ? asset : a)));
}
