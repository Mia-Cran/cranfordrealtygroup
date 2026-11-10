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

/**
 * Monthly payment estimate. Every box starts empty; the payment shows once a home
 * price is entered. `initialPrice` (a listing's price) is only shown as a hint.
 */
export function MortgageCalculator({
  initialPrice,
  title,
  subtitle,
}: { initialPrice?: number; title?: string; subtitle?: string } = {}) {
  const { t } = useLanguage();
  const hintPrice = initialPrice && initialPrice > 0 ? initialPrice : 250000;
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState(30);
  const [tax, setTax] = useState("");
  const [insurance, setInsurance] = useState("");

  const num = (value: string) => Number(value) || 0;
  const pi = useMemo(
    () => monthlyPrincipal(num(price), num(down), num(rate), years),
    [price, down, rate, years],
  );
  const taxIns = num(tax) / 12 + num(insurance) / 12;
  const ready = num(price) > 0;
  const show = (amount: number) => (ready ? formatPrice(Math.round(amount)) : "—");

  return (
    <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10 lg:grid-cols-2 lg:p-8">
      {title ? (
        <div className="lg:col-span-2">
          <h2 className="font-serif text-3xl text-navy sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-ink-muted">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className="grid gap-4">
        <Field label={t.mortgage.price} value={price} onChange={setPrice} step={5000} placeholder={`e.g. ${hintPrice.toLocaleString("en-US")}`} />
        <Field label={t.mortgage.down} value={down} onChange={setDown} step={1000} placeholder={`e.g. ${Math.round(hintPrice * 0.1).toLocaleString("en-US")}`} />
        <Field label={t.mortgage.rate} value={rate} onChange={setRate} step={0.125} placeholder="e.g. 6.5" />
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
        <Field label={t.mortgage.tax} value={tax} onChange={setTax} step={100} placeholder="e.g. 2,400" />
        <Field label={t.mortgage.insurance} value={insurance} onChange={setInsurance} step={50} placeholder="e.g. 1,400" />
      </div>
      <div className="flex flex-col justify-center rounded-3xl bg-navy px-8 py-10 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-gold">{t.mortgage.monthly}</p>
        <p className="mt-3 font-serif text-5xl">{show(pi + taxIns)}</p>
        <p className="mt-6 text-sm text-white/70">
          {t.mortgage.principal}: {show(pi)}
        </p>
        <p className="mt-2 text-sm text-white/70">
          {t.mortgage.taxIns}: {show(taxIns)}
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step: number;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-xl border border-navy/15 bg-cream px-4 placeholder:text-ink-muted/50"
      />
    </label>
  );
}
