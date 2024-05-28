import { ReactNode, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<HTMLDivElement | null>(null);

function PortalProvider({ children }: { children: ReactNode }) {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  return (
    <PortalContext.Provider value={portalContainer}>
      {children}
      <div
        ref={(elem) => {
          if (!elem || portalContainer) return;
          setPortalContainer(elem);
        }}
      />
    </PortalContext.Provider>
  );
}

function PortalElement({ children }: { children: ReactNode }) {
  const portalContainer = useContext(PortalContext);

  if (!portalContainer) return null;

  return createPortal(children, portalContainer);
}

export const GlobalPortal = {
  Provider: PortalProvider,
  Element: PortalElement,
};
