export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header id="site-header">Site header</header>
        {children}
      </body>
    </html>
  );
}
