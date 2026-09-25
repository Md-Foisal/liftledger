import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-12">
      <Hero />

      <section id="library" className="scroll-mt-28 pt-16">
        <div className="mb-8 flex flex-col gap-1">
          <h2 className="font-display text-[30px] leading-9 font-bold tracking-[-0.75px] text-white uppercase">
            THE LIBRARY
          </h2>
          <p className="text-sm leading-5 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>
    </main>
  );
}
