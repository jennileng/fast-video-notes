import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { supabase } from "@/integrations/supabase/client";
import { AuthProvider, RequireAuth } from "@/lib/auth";
import AuthPage from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/Landing";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [queryClient]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/sign-in" element={<AuthPage initialMode="signin" />} />
            <Route path="/sign-up" element={<AuthPage initialMode="signup" />} />
            <Route
              path="/app"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
