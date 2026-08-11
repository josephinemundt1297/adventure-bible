interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <main>{children}</main>
    </div>
  );
}
