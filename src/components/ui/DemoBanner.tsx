export function DemoBanner() {
  return (
    <div className="bg-teal-50 border-b border-teal-200 px-4 py-2 text-center">
      <p className="text-xs font-medium text-teal-700">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse-soft" />
          Demo Mode — All data shown is illustrative. No real government departments are connected.
        </span>
      </p>
    </div>
  );
}
