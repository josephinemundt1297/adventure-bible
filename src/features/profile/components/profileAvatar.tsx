import { useEffect, useId, useRef, useState } from "react";

const AVATAR_STORAGE_KEY = "adventure-bible:profile-avatar";
const AVATAR_EVENT = "adventure-bible:avatar-updated";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function readAvatar(): string | null {
  return localStorage.getItem(AVATAR_STORAGE_KEY);
}

export function ProfileAvatar({
  name,
  size = "md",
  editable = false,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  editable?: boolean;
}) {
  const [avatar, setAvatar] = useState<string | null>(() => readAvatar());
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const initial = name.trim().charAt(0).toUpperCase() || "A";

  useEffect(() => {
    const updateAvatar = () => setAvatar(readAvatar());
    window.addEventListener(AVATAR_EVENT, updateAvatar);
    return () => window.removeEventListener(AVATAR_EVENT, updateAvatar);
  }, []);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Bitte wähle eine Bilddatei aus.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      window.alert("Das Bild darf höchstens 5 MB groß sein.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return;

      try {
        localStorage.setItem(AVATAR_STORAGE_KEY, result);
        setAvatar(result);
        window.dispatchEvent(new Event(AVATAR_EVENT));
      } catch {
        window.alert("Das Bild konnte lokal nicht gespeichert werden. Bitte versuche ein kleineres Bild.");
      }
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  }

  const sizeClass = {
    sm: "size-11 text-base",
    md: "size-16 text-xl",
    lg: "size-32 text-4xl",
  }[size];

  const image = (
    <div
      className={`overflow-hidden rounded-full border border-secondary/35 bg-[#eee3d1] ${sizeClass}`}
    >
      {avatar ? (
        <img className="size-full object-cover" src={avatar} alt={`${name} Profilbild`} />
      ) : (
        <div className="flex size-full items-center justify-center font-bold text-primary" aria-hidden="true">
          {initial}
        </div>
      )}
    </div>
  );

  if (!editable) return image;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => inputRef.current?.click()}
        aria-label={avatar ? "Profilbild ändern" : "Profilbild hinzufügen"}
      >
        {image}
        <span className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-base-100 bg-primary text-sm text-primary-content shadow-sm transition-transform group-hover:scale-105">
          ✎
        </span>
      </button>
      <label htmlFor={inputId} className="btn btn-outline btn-sm">
        {avatar ? "Bild ändern" : "Eigenes Bild hochladen"}
      </label>
      <input
        ref={inputRef}
        id={inputId}
        className="sr-only"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
      />
      <p className="max-w-xs text-center text-xs leading-4 text-base-content/55">
        Dein Bild bleibt lokal in diesem Browser gespeichert.
      </p>
    </div>
  );
}
