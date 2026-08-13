interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section
      className="mx-auto w-full max-w-md rounded-2xl border border-base-300/60 bg-base-100/70 px-5 py-8 text-center"
      aria-labelledby="empty-state-title"
    >
      <h1 id="empty-state-title" className="text-xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
