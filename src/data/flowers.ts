export interface Flower {
  id: string;
  name: string;
  emoji: string;
  color: string;
  petals: string; // SVG path color
}

export const FLOWERS: Flower[] = [
  { id: "red-rose", name: "Red Rose", emoji: "🌹", color: "#C41E3A", petals: "#C41E3A" },
  { id: "pink-tulip", name: "Pink Tulip", emoji: "🌷", color: "#E91E8C", petals: "#E91E8C" },
  { id: "white-lily", name: "White Lily", emoji: "🤍", color: "#F5F5F0", petals: "#F5F5F0" },
  { id: "sunflower", name: "Sunflower", emoji: "🌻", color: "#FFD700", petals: "#FFD700" },
  { id: "lavender", name: "Lavender", emoji: "💜", color: "#9B59B6", petals: "#9B59B6" },
  { id: "peony", name: "Peony", emoji: "🌸", color: "#FFB6C1", petals: "#FFB6C1" },
  { id: "daisy", name: "Daisy", emoji: "🌼", color: "#FFFACD", petals: "#FFFFFF" },
  { id: "orchid", name: "Orchid", emoji: "🪻", color: "#BA55D3", petals: "#BA55D3" },
  { id: "chrysanthemum", name: "Mum", emoji: "🏵️", color: "#FF8C00", petals: "#FF8C00" },
  { id: "carnation", name: "Carnation", emoji: "🌺", color: "#FF6B6B", petals: "#FF6B6B" },
  { id: "hydrangea", name: "Hydrangea", emoji: "💠", color: "#6BB3FF", petals: "#6BB3FF" },
  { id: "cherry-blossom", name: "Cherry Blossom", emoji: "🌸", color: "#FFB7C5", petals: "#FFB7C5" },
];

export const MAX_FLOWERS = 6;

export interface BouquetData {
  flowers: string[]; // flower ids
  message: string;
  from: string;
  to: string;
}

export function encodeBouquet(data: BouquetData): string {
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeBouquet(encoded: string): BouquetData | null {
  try {
    return JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    return null;
  }
}
