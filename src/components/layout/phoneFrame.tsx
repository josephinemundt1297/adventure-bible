interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="mockup-phone w-[min(90vw,24rem)]">
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display relative h-[92dvh] min-h-0 overflow-hidden bg-base-100">
        {children}
      </div>
    </div>
  );
}
