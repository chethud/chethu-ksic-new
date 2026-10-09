export type HomeNavLink = {
  id: string;
  label: string;
  labelKn: string;
  href: string;
};

/** Homepage primary nav — maps to existing routes. */
export const HOME_PRIMARY_NAV: HomeNavLink[] = [
  { id: "heritage", label: "Heritage", labelKn: "ಪರಂಪರೆ", href: "/heritage" },
  { id: "craft", label: "Craft", labelKn: "ಕರಕುಶಲ", href: "/mysore-silk/craft" },
  { id: "collections", label: "Collections", labelKn: "ಸಂಗ್ರಹ", href: "/collections" },
  { id: "institution", label: "Institution", labelKn: "ಸಂಸ್ಥೆ", href: "/story" },
  { id: "stores", label: "Stores", labelKn: "ಅಂಗಡಿಗಳು", href: "/visit/showrooms" },
];
