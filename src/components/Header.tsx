import colors from "@constants/colors";
import { css } from "@emotion/react";
import IconButton from "./IconButton";
import ArrowLeftSvg from "./svgs/ArrowLeftSvg";

interface Props {
  onGoBack?: () => void;
}

export default function Header({ onGoBack }: Props) {
  return (
    <header
      css={css`
        display: grid;
        grid-template-columns: 36px 1fr 36px;
        grid-template-rows: 36px;
        align-items: center;
        margin-bottom: 18px;
      `}
    >
      <div>
        {onGoBack && (
          // <button onClick={onGoBack} data-testid="button_go_back">
          //   back
          // </button>
          <IconButton
            buttonType="transparent"
            onClick={onGoBack}
            data-testid="button_go_back"
          >
            <ArrowLeftSvg />
          </IconButton>
        )}
      </div>
      <h1
        css={css`
          text-align: center;
          font-weight: 800;
          font-size: 18px;
          color: ${colors.grey700};
        `}
      >
        Wille exchanges 💸
      </h1>
      <div></div>
    </header>
  );
}
