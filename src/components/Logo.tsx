export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-10 w-10 text-base" : "h-7 w-7 text-xs";
  const text = size === "lg" ? "text-2xl" : "text-sm";

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid ${box} place-items-center rounded-lg bg-primary font-mono font-bold text-primary-foreground`}
      >
        {"</>"}
      </span>
      <span className={`${text} font-semibold tracking-tight`}>SyncScript</span>
    </div>
  );
}
