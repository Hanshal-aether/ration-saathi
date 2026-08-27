import "./globals.css";
import { Providers } from "../components/providers";
import { Chrome } from "../components/chrome";

export const metadata = { title: "Ration Saathi", description: "Ration services prototype" };

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Chrome />
          {children}
        </Providers>
      </body>
    </html>
  );
}
