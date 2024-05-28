import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Path = `/${string}`;

export default function useNav() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      push(path: Path) {
        navigate(path);
      },
      replace(path: Path) {
        navigate(path, { replace: true });
      },
      goBack() {
        navigate(-1);
      },
    }),
    [navigate],
  );
}
