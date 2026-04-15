import { AuthProvider } from "@/lib/auth";
import { AppContent } from "@/lib/AppContent";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { ClientProviders } from "@/providers/ClientProviders";
import { Navbar } from "@/components/Navbar";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Footer } from "@/components/Footer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ClientProviders>
          <NavigationProvider>
            <AppContent>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 relative overflow-hidden h-full">
                  {children}
                </main>
              </div>
              <Footer />
            </AppContent>
          </NavigationProvider>
        </ClientProviders>
      </AuthProvider>
    </ErrorBoundary>
  );
}
