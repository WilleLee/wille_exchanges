import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages";
import { GlobalPortal } from "./GlobalPortal";
import UnitPage from "@pages/UnitPage.tsx";
import { Global, css } from "@emotion/react";
import { ReactNode } from "react";
import colors from "@constants/colors";

function App() {
  return (
    <GlobalPortal.Provider>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0;
          }
        `}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/unit/:code" element={<UnitPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </GlobalPortal.Provider>
  );
}

export default App;

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        overflow-x: hidden;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          padding: 16px 8px;
          background: ${colors.background};
        `}
      >
        {children}
      </div>
    </div>
  );
}
