// layout.tsx
import './globals.css'; 
import Header from './components/layoutComponents/header'; 
import Nav from './components/layoutComponents/nav'; 
import Footer from './components/layoutComponents/footer'; 

export const metadata = {
  title: 'SIGeM - Sistema de Ger. de Manutenção',
  description: 'Sistema de Gerenciamento de Manutenção da empresa',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Nav />
          <main className="flex-1 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}


