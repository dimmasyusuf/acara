import Header from '@/components/shared/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
}
