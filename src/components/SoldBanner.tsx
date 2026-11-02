// Big "SOLD" band across a listing photo.
export function SoldBanner({ label, size = "md" }: { label: string; size?: "md" | "lg" }) {
  const text = size === "lg" ? "text-5xl sm:text-7xl py-3 sm:py-4" : "text-3xl sm:text-4xl py-2";
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center overflow-hidden">
      <div
        className={`w-[150%] -rotate-12 border-y-4 border-gold bg-navy/85 text-center font-serif font-semibold uppercase tracking-[0.3em] text-white shadow-2xl ${text}`}
      >
        {label}
      </div>
    </div>
  );
}
