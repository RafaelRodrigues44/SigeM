// app/layout.tsx
import './globals.css';
import Header from './components/header';
import Nav from './components/nav';
import Footer from './components/footer';

export const metadata = {
  title: 'SIGeM - Sistema de Gerenciamento de Manutenção',
  description: 'Sistema de Gerenciamento de Manutenção da empresa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Nav />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
