interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="mockup-phone h-[88dvh] w-auto max-w-[90vw] aspect-[9/19.5]">
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display relative h-full w-full overflow-hidden bg-base-100">
        {children}
      </div>
    </div>
  );
}
