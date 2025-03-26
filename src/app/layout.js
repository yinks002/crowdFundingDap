
import "./globals.css";

import { Navbar, Footer } from "../../Components";
import { CrowdFundingProvider } from "../../Context/CrowdFunding";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >

      <CrowdFundingProvider>
        <Navbar />
        {children}
        <Footer/>
        </CrowdFundingProvider>
      </body>
    </html>
  );
}
