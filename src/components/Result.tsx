interface ResultProps {
  years: string;
  months: string;
  days: string;
}

export function Result({ years, months, days }: ResultProps) {
  return (
    <section className="mt-8">
      <p className="text-5xl sm:text-6xl font-extrabold italic leading-tight text-black">
        <span className="text-purple-500 mr-2">{years}</span> years
      </p>
      <p className="text-5xl sm:text-6xl font-extrabold italic leading-tight text-black">
        <span className="text-purple-500 mr-2">{months}</span> months
      </p>
      <p className="text-5xl sm:text-6xl font-extrabold italic leading-tight text-black">
        <span className="text-purple-500 mr-2">{days}</span> days
      </p>
    </section>
  );
}