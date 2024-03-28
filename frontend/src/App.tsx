import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
