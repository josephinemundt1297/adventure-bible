interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="mockup-phone">
      <div className="mockup-phone-camera" />
      <div className="mockup-phone-display bg-base-100">
        {children}
      </div>
    </div>
  );
}
