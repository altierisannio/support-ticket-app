export const metadata = {
  title: 'Support Ticket App',
  description: 'Gestione ticket di supporto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
