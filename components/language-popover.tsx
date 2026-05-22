"use client";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage, Lang } from "@/components/language-context";

const LANGS: { code: Lang; flag: string; labelKey: "english" | "vietnamese" }[] = [
  { code: "en", flag: "🇺🇸", labelKey: "english" },
  { code: "vi", flag: "🇻🇳", labelKey: "vietnamese" },
];

export default function LanguagePopover() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "left-start", // mở sang TRÁI của nút Languages
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <div className="relative w-full">
      {/* Nút Languages — giữ nguyên style của các button khác trong menu */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-md border border-transparent px-3 py-2 text-sm text-white bg-black hover:bg-white/10 transition-colors [&_svg]:size-4"
      >
        {t.languages}
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>
        </svg>
      </button>

      {/* Popover panel */}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-[9999] min-w-[160px] rounded-xl border border-[#2c2c2c] bg-black shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-[#2c2c2c]">
            <p className="text-xs text-[#a1a1a1]">{t.selectLanguage}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col p-1">
            {LANGS.map((l) => {
              const isActive = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-[#a1a1a1] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{l.flag}</span>
                    {t[l.labelKey]}
                  </span>
                  {isActive && <Check size={13} className="text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}