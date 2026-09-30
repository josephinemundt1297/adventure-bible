import type { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <section
      className="mx-auto w-full max-w-md rounded-2xl border border-error/30 bg-base-100/70 px-5 py-8"
      role="alert"
      aria-labelledby="error-state-title"
    >
      <h1 id="error-state-title" className="text-xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-base-content/70">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  );
}
