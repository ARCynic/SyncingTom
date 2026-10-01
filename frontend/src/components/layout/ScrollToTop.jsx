import {
  useLayoutEffect,
} from "react";

import {
  useLocation,
} from "react-router";

export default function ScrollToTop() {
  const {
    pathname,
    search,
  } = useLocation();

  useLayoutEffect(() => {
    if (
      "scrollRestoration" in
      window.history
    ) {
      window.history.scrollRestoration =
        "manual";
    }

    const scrollToTop = () => {
      window.scrollTo(
        0,
        0,
      );

      document.documentElement.scrollTop =
        0;

      document.body.scrollTop =
        0;
    };

    // Immediate reset.
    scrollToTop();

    // Browser restoration can happen
    // after layout, so override it again.
    const frame =
      window.requestAnimationFrame(
        scrollToTop,
      );

    // One final reset after the current
    // navigation/render cycle.
    const timer =
      window.setTimeout(
        scrollToTop,
        0,
      );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      window.clearTimeout(
        timer,
      );
    };
  }, [
    pathname,
    search,
  ]);

  return null;
}