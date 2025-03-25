
import "./globals.css";

import { Navbar, Footer } from "../../Components";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
