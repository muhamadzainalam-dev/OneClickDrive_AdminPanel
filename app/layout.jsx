import "./globals.css";

export const metadata = {
  title: "One Click Dive | Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mulish-font">
        <main>{children}</main>
      </body>
    </html>
  );
}
