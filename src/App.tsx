import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages";
import { GlobalPortal } from "./GlobalPortal";
import UnitPage from "@pages/UnitPage.tsx";

function App() {
  return (
    <GlobalPortal.Provider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/unit/:code" element={<UnitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GlobalPortal.Provider>
  );
}

export default App;
