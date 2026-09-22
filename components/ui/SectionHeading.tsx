export function SectionHeading({
  title,
  subtitle,
  center = false,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-navy">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg text-navy-soft">{subtitle}</p> : null}
    </div>
  );
}
