import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Loads the SalesCaptain webchat / AI-agent widget.
 *
 * Integration (from the SalesCaptain dashboard) is a deferred script plus a
 * mount div:
 *   <script defer type="text/javascript"
 *     src="https://app.salescaptain.com/api/v1/user/webchat/<WEBCHAT_ID>"></script>
 *   <div id="salescaptain-webchat"></div>
 *
 * The script renders SalesCaptain's own floating launcher (bottom-right, like
 * the Zendesk web widget) into that div. We render the div from React and inject
 * the script once on mount.
 *
 * The webchat URL can be overridden via `VITE_SALESCAPTAIN_SRC` in .env; if unset
 * it falls back to the account's configured URL below.
 */
const DEFAULT_SRC =
  "https://app.salescaptain.com/api/v1/user/webchat/44344897-42de-419b-9f97-e0d676183082";

// The chatbot is for customers only — never show it on the admin/staff portal.
const isAdminRoute = (pathname: string) =>
  pathname.startsWith("/admin") ||
  pathname.startsWith("/auth") ||
  pathname.startsWith("/file-manager");

export const SalesCaptain = () => {
  const { pathname } = useLocation();
  const hidden = isAdminRoute(pathname);

  useEffect(() => {
    if (hidden) return; // Don't load the widget on admin/staff routes.

    const src = (import.meta.env.VITE_SALESCAPTAIN_SRC as string | undefined) || DEFAULT_SRC;
    if (!src) return;
    if (document.getElementById("salescaptain-webchat-script")) return; // Already injected.

    const script = document.createElement("script");
    script.id = "salescaptain-webchat-script";
    script.type = "text/javascript";
    script.defer = true;
    script.src = src;
    document.body.appendChild(script);
    // The widget persists across route changes, so no cleanup on unmount.
  }, [hidden]);

  // Mount point the SalesCaptain script renders its launcher into. On admin
  // routes we hide it (display:none) so the injected iframe never shows there.
  return <div id="salescaptain-webchat" style={hidden ? { display: "none" } : undefined} />;
};
