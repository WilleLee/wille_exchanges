import { GlobalPortal } from "@/GlobalPortal";
import colors from "@constants/colors";
import { css } from "@emotion/react";
import Loading from "@assets/loading.gif";

export default function CtxLoading() {
  return (
    <GlobalPortal.Element>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colors.greyOpacity500};
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div data-testid="loading_indicator">
          <img src={Loading} width="36" height="36" alt="loading" />
        </div>
      </div>
    </GlobalPortal.Element>
  );
}
