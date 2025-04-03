import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModeProvider } from "./contexts/PageModeContext.jsx";
import App from "./App.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModeProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ModeProvider>
  </StrictMode>
);
