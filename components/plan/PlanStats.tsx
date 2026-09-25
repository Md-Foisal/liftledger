type Props = {
  exercises: number;
  minutes: number;
  calories: number;
};

export default function PlanStats({ exercises, minutes, calories }: Props) {
  const stats = [
    { label: "Exercises", value: exercises, accent: true },
    { label: "Minutes", value: minutes, accent: false },
    { label: "Calories", value: calories, accent: false },
  ];

  return (
    <section
      aria-label="Plan summary"
      className="grid grid-cols-3 rounded-2xl border border-line-2 bg-panel-2 px-4 pt-6 pb-5 sm:px-[25px] sm:pt-[33px] sm:pb-[25px]"
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={i === 0 ? "pr-3 sm:pr-6" : "border-l border-[rgba(35,39,50,0.6)] pl-3 sm:pl-[33px]"}
        >
          <p className="pb-1 text-xs leading-4 text-dim">{s.label}</p>
          <p
            className={`py-0.5 font-display text-3xl leading-10 font-bold sm:text-4xl ${
              s.accent ? "text-volt" : "text-white"
            }`}
          >
            {s.value}
          </p>
        </div>
      ))}
    </section>
  );
}
