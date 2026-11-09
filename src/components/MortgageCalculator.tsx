"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/format";

function monthlyPrincipal(price: number, down: number, rate: number, years: number) {
  const principal = Math.max(price - down, 0);
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  return (
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n))
  );
}

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

/**
 * Monthly payment estimate. Pass `initialPrice` (e.g. a listing's price) to start
 * from that home: 10% down, with yearly tax and insurance scaled from the price.
 */
export function MortgageCalculator({
  initialPrice,
  title,
  subtitle,
}: { initialPrice?: number; title?: string; subtitle?: string } = {}) {
  const { t } = useLanguage();
  const startPrice = initialPrice && initialPrice > 0 ? initialPrice : 250000;
  const [price, setPrice] = useState(startPrice);
  const [down, setDown] = useState(roundTo(startPrice * 0.1, 500));
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [tax, setTax] = useState(roundTo(startPrice * 0.0096, 100));
  const [insurance, setInsurance] = useState(roundTo(startPrice * 0.0056, 50));

  const pi = useMemo(
    () => monthlyPrincipal(price, down, rate, years),
    [price, down, rate, years],
  );
  const monthly = pi + tax / 12 + insurance / 12;

  return (
    <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10 lg:grid-cols-2 lg:p-8">
      {title ? (
        <div className="lg:col-span-2">
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-ink-muted">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="grid gap-4">
        <Field label={t.mortgage.price} value={price} onChange={setPrice} step={5000} />
        <Field label={t.mortgage.down} value={down} onChange={setDown} step={1000} />
        <Field label={t.mortgage.rate} value={rate} onChange={setRate} step={0.125} />
        <label className="grid gap-2 text-sm">
          {t.mortgage.years}
          <select
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className="h-12 rounded-xl border border-navy/15 bg-cream px-4"
          >
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </label>
        <Field label={t.mortgage.tax} value={tax} onChange={setTax} step={100} />
        <Field label={t.mortgage.insurance} value={insurance} onChange={setInsurance} step={50} />
      </div>
      <div className="flex flex-col justify-center rounded-3xl bg-navy px-8 py-10 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">{t.mortgage.monthly}</p>
        <p className="mt-3 font-serif text-5xl">{formatPrice(Math.round(monthly))}</p>
        <p className="mt-6 text-sm text-white/70">
          {t.mortgage.principal}: {formatPrice(Math.round(pi))}
        </p>
        <p className="mt-2 text-sm text-white/70">
          {t.mortgage.taxIns}: {formatPrice(Math.round(tax / 12 + insurance / 12))}
        </p>
        <p className="mt-6 text-xs leading-5 text-white/60">{t.mortgage.disclaimer}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step: number;
}) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="h-12 rounded-xl border border-navy/15 bg-cream px-4"
      />
    </label>
  );
}
