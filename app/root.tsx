import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n";
import React from "react";
import GlobalLoader from "./components/loading/globalLoading";
import { Toaster } from "./components/ui/sonner";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />

        <Links />
      </head>
      <body>
        <Toaster />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
// export function HydrateFallback() {
//   return <div className="w-full h-full bg-gray-900 lg:bg-gray-950 flex items-center justify-center">
//       <div className="text-amber-300 text-3xl font-bold">Welcome to Binance</div>
//   </div>
// }
async function timingMiddleware({ context }, next) {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`Navigation took ${duration}ms`);
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
  timingMiddleware,
];
export default function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" || navigation.state === "submitting";
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
          {
            isLoading && <GlobalLoader/>
          }
          <Outlet />
      </I18nextProvider>
    </React.StrictMode>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      <Link to={"/"}>Go back home</Link>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
