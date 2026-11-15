"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

const WIDGET = "https://www.mortgagecalculator.net/embeddable/v2/";
const COLORS = "textColor=003140&backgroundColor=e7f0f3";
const HEIGHT = 330;

/**
 * The free mortgagecalculator.net widget, embedded the way their webmaster page
 * shows (iframe + "Powered By www.MortgageCalculator.net" link over its footer).
 * The widget has fixed sizes (700px wide, or 400px for small screens), so it is
 * scaled down to fit narrow phones. It is English-only; our heading and
 * disclaimer around it are bilingual.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MortgageCalculator(_props: { initialPrice?: number } = {}) {
  const { t } = useLanguage();
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(700);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth || 700);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const wide = width >= 560;
  const native = wide ? 700 : 400;
  const scale = Math.min(1, width / native);

  return (
    <div className="mx-auto w-full max-w-[700px]">
      <div ref={box} className="w-full">
        <div
          className="relative mx-auto overflow-hidden"
          style={{ width: native * scale, height: HEIGHT * scale }}
        >
          <div style={{ width: native, height: HEIGHT, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <iframe
              key={native}
              title="Mortgage calculator"
              src={`${WIDGET}?size=${wide ? 2 : 4}&${COLORS}`}
              width={native}
              height={HEIGHT}
              className="block border-0"
              scrolling="no"
              loading="lazy"
            />
            <a
              href="https://www.mortgagecalculator.net/"
              target="_blank"
              rel="noopener"
              className="absolute bottom-0 left-0 block w-full bg-[#075269] py-[3px] text-center font-sans text-xs font-bold uppercase text-white no-underline"
            >
              Powered By www.MortgageCalculator.net
            </a>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-muted">{t.mortgage.disclaimer}</p>
    </div>
  );
}
