// utils/navigation.ts
"use client";

import { useRouter } from "next/navigation";

type NavOptions = {
  path: string;
  queryParams?: Record<string, string>;
  replace?: boolean;
  scroll?: boolean;
};

export function useNavLink() {
  const router = useRouter();

  const navLink = ({
    path,
    queryParams = {},
    replace = false,
    scroll = true,
  }: NavOptions) => {
    // Build query string if params exist
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const fullPath = queryString ? `${path}?${queryString}` : path;

    // Use replace or push based on option
    if (replace) {
      router.replace(fullPath, { scroll });
    } else {
      router.push(fullPath, { scroll });
    }
  };

  return navLink;
}
