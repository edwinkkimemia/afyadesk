"use client";
import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link2, Heading2, Heading3, Pilcrow, RemoveFormatting } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
};

function ToolbarButton({ title, onMouseDown, active, children }: { title: string; onMouseDown: (e: React.MouseEvent) => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown(e);
      }}
      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition ${
        active ? "bg-[#0B1F33] text-white border-[#0B1F33]" : "bg-white text-[#0B1F33] border-[#E6EEF6] hover:bg-[#F8FAFC]"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder = "Write article content…", minHeight = 220 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [htmlMode, setHtmlMode] = useState(false);

  // sync external value (e.g. form reset) when not focused
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.activeElement !== el && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function exec(cmd: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    onChange(ref.current?.innerHTML || "");
  }

  function insertLink() {
    const url = window.prompt("Link URL (https://…)");
    if (!url) return;
    exec("createLink", url);
  }

  return (
    <div className="rounded-xl border border-[#E6EEF6] bg-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-[#E6EEF6] bg-[#F8FAFC]">
        <ToolbarButton title="Bold" onMouseDown={() => exec("bold")}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Italic" onMouseDown={() => exec("italic")}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Underline" onMouseDown={() => exec("underline")}>
          <Underline className="h-4 w-4" />
        </ToolbarButton>
        <span className="h-5 w-px bg-[#E6EEF6] mx-1" />
        <ToolbarButton title="Heading 2" onMouseDown={() => exec("formatBlock", "h2")}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Heading 3" onMouseDown={() => exec("formatBlock", "h3")}>
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Paragraph" onMouseDown={() => exec("formatBlock", "p")}>
          <Pilcrow className="h-4 w-4" />
        </ToolbarButton>
        <span className="h-5 w-px bg-[#E6EEF6] mx-1" />
        <ToolbarButton title="Bullet list" onMouseDown={() => exec("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" onMouseDown={() => exec("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Quote" onMouseDown={() => exec("formatBlock", "blockquote")}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Insert link" onMouseDown={insertLink}>
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton title="Clear formatting" onMouseDown={() => exec("removeFormat")}>
          <RemoveFormatting className="h-4 w-4" />
        </ToolbarButton>
        <button
          type="button"
          onClick={() => setHtmlMode((m) => !m)}
          className="ml-auto text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E6EEF6] bg-white hover:bg-[#F8FAFC]"
        >
          {htmlMode ? "Rich" : "HTML"}
        </button>
      </div>

      {htmlMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="<p>HTML…</p>"
          className="w-full p-4 text-sm font-mono leading-6 focus:outline-none"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange((e.currentTarget as HTMLDivElement).innerHTML)}
          data-placeholder={placeholder}
          className="p-4 text-sm leading-7 text-[#172033] focus:outline-none prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#0B1F33] [&_h3]:font-semibold [&_h3]:text-[#0B1F33] [&_a]:text-[#0F8B8D] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#0F8B8D]/30 [&_blockquote]:pl-3 [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 empty:before:content-[attr(data-placeholder)] empty:before:text-[#8A9BB0]"
          style={{ minHeight }}
        />
      )}
      <div className="px-3 py-2 border-t border-[#E6EEF6] bg-[#F8FAFC] text-[11px] text-[#8A9BB0]">
        Rich text saved as HTML — headings, lists, quotes & links render on the blog page.
      </div>
    </div>
  );
}
