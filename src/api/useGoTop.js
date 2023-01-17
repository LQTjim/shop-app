import { useEffect } from "react";

export default function useGoTop(loacation) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loacation.pathname]);
}
