import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6">
      <Loader text="Loading workout…" />
    </main>
  );
}
