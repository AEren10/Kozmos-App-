type AppleScope = number;
type AppleCredential = { identityToken: string | null };
export type AppleAuthModule = {
  isAvailableAsync: () => Promise<boolean>;
  signInAsync: (opts: { requestedScopes: AppleScope[] }) => Promise<AppleCredential>;
  AppleAuthenticationScope: { EMAIL: AppleScope; FULL_NAME: AppleScope };
};

export const AppleAuthentication: AppleAuthModule | null = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("expo-apple-authentication") as AppleAuthModule;
  } catch {
    return null;
  }
})();
