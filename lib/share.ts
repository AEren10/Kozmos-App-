import { Share } from "react-native";
import * as Linking from "expo-linking";

export async function shareText(message: string) {
  try {
    await Share.share({ message });
  } catch {
    /* user cancelled */
  }
}

export function createPartnerInviteLink(birthDate: string, name?: string): string {
  const url = Linking.createURL("/invite", {
    queryParams: { d: birthDate, n: name ?? "" },
  });
  return url;
}

export async function shareHoroscope(sign: string, text: string) {
  const msg = `✨ ${sign} için bugün:\n\n${text.slice(0, 180)}...\n\nKozmos'ta devamını oku ↓`;
  return shareText(msg);
}

export async function sharePartnerInvite(link: string) {
  const msg = `Hey 💫 Seninle Kozmos'ta uyumumuza bakalım mı?\n${link}`;
  return shareText(msg);
}
