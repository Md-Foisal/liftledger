// daisyui spinner in our lime color
export default function Loader({ text = "Loading workouts…" }: { text?: string }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4" role="status">
      <span className="loading loading-bars loading-lg text-lime" />
      <p className="text-sm text-muted">{text}</p>
    </div>
  );
}
