import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./App.tsx";
import AppContextProvider from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <SearchContextProvider>
        <RouterProvider router={routes} />
      </SearchContextProvider>
    </AppContextProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
