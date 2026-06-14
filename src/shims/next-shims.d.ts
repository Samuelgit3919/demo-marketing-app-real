// Ambient declarations so TypeScript resolves the Vite-aliased Next.js shims.
// These imports are remapped in vite.config.ts to local shim components.
declare module "next/link" {
  import { ComponentType, AnchorHTMLAttributes } from "react";
  const Link: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string | { pathname: string } }>;
  export default Link;
}

declare module "next/image" {
  import { ComponentType, ImgHTMLAttributes } from "react";
  const Image: ComponentType<
    ImgHTMLAttributes<HTMLImageElement> & {
      src: string;
      alt: string;
      fill?: boolean;
      priority?: boolean;
      sizes?: string;
    }
  >;
  export default Image;
}

declare module "next/navigation" {
  export function usePathname(): string;
}
