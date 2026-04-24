import { Platform } from "react-native";

type PurchasesModule = {
  configure: (opts: { apiKey: string }) => void;
  getOfferings: () => Promise<any>;
  purchasePackage: (pkg: any) => Promise<any>;
  restorePurchases: () => Promise<any>;
};

let cached: PurchasesModule | null | undefined;

function loadPurchases(): PurchasesModule | null {
  if (cached !== undefined) return cached;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require("react-native-purchases");
    cached = (mod?.default ?? mod) as PurchasesModule;
  } catch {
    cached = null;
  }
  return cached;
}

function apiKey(): string | null {
  const key =
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
      : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  return key && key.trim().length > 0 ? key : null;
}

export function isPurchasesConfigured(): boolean {
  return !!loadPurchases() && !!apiKey();
}

export async function configurePurchases() {
  const p = loadPurchases();
  const key = apiKey();
  if (!p || !key) return false;
  try {
    p.configure({ apiKey: key });
    return true;
  } catch {
    return false;
  }
}

export async function purchasePlan(plan: "yearly" | "monthly") {
  if (!isPurchasesConfigured()) {
    throw new Error("NOT_CONFIGURED");
  }
  const p = loadPurchases()!;
  await configurePurchases();
  const offerings = await p.getOfferings();
  const pkg =
    plan === "yearly"
      ? offerings?.current?.annual ?? offerings?.current?.availablePackages?.find((x: any) => /year/i.test(x.identifier))
      : offerings?.current?.monthly ?? offerings?.current?.availablePackages?.find((x: any) => /month/i.test(x.identifier));
  if (!pkg) throw new Error("PACKAGE_NOT_FOUND");
  return p.purchasePackage(pkg);
}

export async function restorePurchases() {
  if (!isPurchasesConfigured()) {
    throw new Error("NOT_CONFIGURED");
  }
  const p = loadPurchases()!;
  await configurePurchases();
  return p.restorePurchases();
}
