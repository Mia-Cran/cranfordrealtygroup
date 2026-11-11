"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { formatPrice } from "@/lib/format";

type Result = {
  monthly: number;
  total: number;
  interest: number;
  principal: number;
  /** Loan balance left at the end of each year */
  balances: { year: number; balance: number }[];
};

function calculate(amount: number, rate: number, years: number): Result | null {
  if (!(amount > 0) || !(years > 0)) return null;
  const n = Math.round(years * 12);
  const r = rate / 100 / 12;
  const monthly = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
  const startYear = new Date().getFullYear();
  const balances: Result["balances"] = [];
  let balance = amount;
  for (let m = 1; m <= n; m++) {
    balance = Math.max(balance - (monthly - balance * r), 0);
    if (m % 12 === 0 || m === n) balances.push({ year: startYear + Math.ceil(m / 12), balance });
  }
  const total = monthly * n;
  return { monthly, total, interest: total - amount, principal: amount, balances };
}

const ink = "#003140";

/**
 * Mortgage calculator laid out like the widget on A Home For You Realty's site:
 * amount, rate and term on the left; monthly payment, totals, a yearly paydown
 * chart and a loan-vs-interest pie on the right. English and Spanish.
 * Boxes start blank until someone types and presses Calculate.
 */
export function MortgageCalculator({
  title,
  subtitle,
}: { initialPrice?: number; title?: string; subtitle?: string } = {}) {
  const { t } = useLanguage();
  const m = t.mortgage;
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const run = () => setResult(calculate(Number(amount) || 0, Number(rate) || 0, Number(term) || 0));
  const money = (value: number | undefined) => (result && value !== undefined ? formatPrice(Math.round(value)) : "—");

  return (
    <div className="rounded-3xl p-5 ring-1 ring-[#003140]/15 sm:p-7" style={{ background: "#e7f0f3", color: ink }}>
      {title ? (
        <div className="mb-4">
          <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl opacity-80">{subtitle}</p> : null}
        </div>
      ) : (
        <h2 className="mb-5 text-center text-3xl">{m.widgetTitle}</h2>
      )}
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <form
          className="grid content-start gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            run();
          }}
        >
          <Field label={m.amount} value={amount} onChange={setAmount} prefix="$" step={1000} />
          <Field label={m.rate} value={rate} onChange={setRate} suffix="%" step={0.125} />
          <Field label={m.term} value={term} onChange={setTerm} suffix={m.yearsUnit} step={1} />
          <button
            type="submit"
            className="mt-2 h-12 rounded-full text-sm font-semibold uppercase tracking-wide text-white shadow"
            style={{ background: "linear-gradient(#5fbf63,#3e9a45)" }}
          >
            {m.calculate}
          </button>
        </form>

        <div className="min-w-0">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label={m.monthlyPayments} value={money(result?.monthly)} />
            <Stat label={m.totalPayments} value={money(result?.total)} />
            <Stat label={m.totalInterest} value={money(result?.interest)} />
          </div>
          <div className="mt-5 grid gap-6 md:grid-cols-[1fr_200px]">
            <div className="min-w-0">
              <p className="text-center font-semibold">{m.paydown}</p>
              <PaydownChart balances={result?.balances ?? []} />
            </div>
            <div>
              <p className="text-center font-semibold">{m.structure}</p>
              <Pie principal={result?.principal ?? 0} interest={result?.interest ?? 0} loanLabel={m.loanPct} interestLabel={m.interestPct} />
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-center text-xs opacity-70">{m.disclaimer}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step: number;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      {label}
      <span className="flex items-center gap-2">
        {prefix ? <span className="text-base">{prefix}</span> : null}
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full min-w-0 rounded-lg border border-[#003140]/20 bg-white/80 px-3 text-base"
        />
        {suffix ? <span className="shrink-0 text-sm">{suffix}</span> : null}
      </span>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs sm:text-sm">{label}</p>
      <p className="mt-1 text-lg font-bold sm:text-2xl">{value}</p>
    </div>
  );
}

function PaydownChart({ balances }: { balances: { year: number; balance: number }[] }) {
  const W = 600;
  const H = 230;
  const left = 48;
  const bottom = 40;
  const top = 10;
  const plotW = W - left - 10;
  const plotH = H - bottom - top;
  const max = balances.length ? Math.max(...balances.map((b) => b.balance), 1) : 1;
  const niceMax = (() => {
    const p = Math.pow(10, Math.floor(Math.log10(max)));
    return Math.ceil(max / p) * p;
  })();
  const short = (v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(Math.round(v)));
  const barW = balances.length ? (plotW / balances.length) * 0.6 : 0;
  const every = Math.max(1, Math.ceil(balances.length / 15));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full" role="img" aria-label="Loan balance by year">
      {[0, 0.5, 1].map((f) => {
        const y = top + plotH - f * plotH;
        return (
          <g key={f}>
            <line x1={left} x2={W - 10} y1={y} y2={y} stroke={ink} strokeOpacity={0.12} />
            <text x={left - 6} y={y + 4} textAnchor="end" fontSize="12" fill={ink}>
              {balances.length ? short(niceMax * f) : ""}
            </text>
          </g>
        );
      })}
      {balances.map((b, i) => {
        const x = left + (plotW / balances.length) * i + (plotW / balances.length - barW) / 2;
        const h = (b.balance / niceMax) * plotH;
        return (
          <g key={b.year}>
            <rect x={x} y={top + plotH - h} width={barW} height={h} fill="#2c5d6e" rx={1.5} />
            {i % every === 0 ? (
              <text
                x={x + barW / 2}
                y={H - bottom + 14}
                fontSize="11"
                fill={ink}
                textAnchor="end"
                transform={`rotate(-40 ${x + barW / 2} ${H - bottom + 14})`}
              >
                {b.year}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function Pie({
  principal,
  interest,
  loanLabel,
  interestLabel,
}: {
  principal: number;
  interest: number;
  loanLabel: string;
  interestLabel: string;
}) {
  const total = principal + interest;
  const share = total > 0 ? principal / total : 0;
  const r = 60;
  const c = 2 * Math.PI * r;
  return (
    <div className="mt-2 flex flex-col items-center gap-3">
      <svg viewBox="0 0 160 160" className="h-36 w-36" role="img" aria-label={`${loanLabel} / ${interestLabel}`}>
        <circle cx="80" cy="80" r={r} fill="none" stroke={total > 0 ? "#6a5acd" : "#c9d8de"} strokeWidth="38" />
        {total > 0 ? (
          <circle
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke="#2f7fa3"
            strokeWidth="38"
            strokeDasharray={`${share * c} ${c}`}
            transform="rotate(-90 80 80)"
          />
        ) : null}
      </svg>
      <ul className="grid gap-1 text-sm">
        <li className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#2f7fa3" }} />
          {loanLabel}
          {total > 0 ? ` ${Math.round(share * 100)}%` : ""}
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#6a5acd" }} />
          {interestLabel}
          {total > 0 ? ` ${100 - Math.round(share * 100)}%` : ""}
        </li>
      </ul>
    </div>
  );
}
