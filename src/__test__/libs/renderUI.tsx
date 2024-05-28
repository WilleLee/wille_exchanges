import { GlobalPortal } from "@/GlobalPortal";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export function wrapper(props: { children: ReactNode }, path: `/${string}`) {
  return (
    <GlobalPortal.Provider>
      <MemoryRouter initialEntries={[path || "/"]}>
        {props.children}
      </MemoryRouter>
    </GlobalPortal.Provider>
  );
}
