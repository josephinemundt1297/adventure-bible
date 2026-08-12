interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="mockup-phone w-[min(360px,calc(100vw-2rem))]">
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display relative h-[760px] overflow-hidden bg-base-100">
        {children}
      </div>
    </div>
  );
}
