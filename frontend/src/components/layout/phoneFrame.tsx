interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="h-dvh w-full sm:mockup-phone sm:h-[88dvh] sm:w-auto sm:max-w-[90vw] sm:aspect-[9/19.5]">
      <div className="hidden sm:mockup-phone-camera sm:block" />
      <div className="relative h-full w-full overflow-hidden bg-base-100 sm:mockup-phone-display">
        {children}
      </div>
    </div>
  );
}
