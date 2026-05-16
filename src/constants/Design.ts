export const TOKEN = {
  pink: "#E91E8C",
  pinkLight: "#F8D7EA",
  pinkMid: "#F0A8CF",
  pinkDark: "#B5166E",
  rose: "#FDF0F7",
  white: "#FFFFFF",
  gray50: "#F9F9FB",
  gray100: "#F2F2F5",
  gray200: "#E4E4EA",
  gray400: "#9A9AAF",
  gray600: "#5A5A72",
  gray900: "#13131A",
} as const;

export type TokenType = typeof TOKEN;
