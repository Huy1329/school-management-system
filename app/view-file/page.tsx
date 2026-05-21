"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";

// Lấy extension từ tên file
function getExtension(url: string): string {
  const clean = url.split("?")[0]; // bỏ query string
  const parts = clean.split(".");
  return parts[parts.length - 1].toLowerCase();
}

function getFileType(ext: string): "pdf" | "image" | "video" | "audio" | "office" | "text" | "unknown" {
  if (["pdf"].includes(ext)) return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "bmp", "svg"].includes(ext)) return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";
  if (["mp3", "wav", "ogg", "aac", "flac"].includes(ext)) return "audio";
  if (["docx", "doc", "xlsx", "xls", "pptx", "ppt"].includes(ext)) return "office";
  if (["txt", "csv", "json", "md", "xml"].includes(ext)) return "text";
  return "unknown";
}

function DocxViewer({ fullUrl }: { fullUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocx() {
      if (!containerRef.current) return;
      try {
        // docx-preview giữ đúng bố cục: font, màu, bảng, spacing, header/footer
        const { renderAsync } = await import("docx-preview");
        const response = await fetch(fullUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        await renderAsync(blob, containerRef.current, undefined, {
          className: "docx-preview",
          useBase64URL: true,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          ignoreWidth: false,
          ignoreHeight: false,
        });
      } catch (e) {
        setError("Không thể đọc file .docx. Hãy thử tải xuống.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDocx();
  }, [fullUrl]);

  return (
    <div className="w-full h-full overflow-auto bg-[#e8e8e8]">
      {loading && (
        <div className="flex items-center justify-center w-full h-full gap-3 text-gray-500 absolute inset-0">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-sm font-mono">Đang render tài liệu...</span>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-gray-500">
          <div className="text-4xl">⚠️</div>
          <p className="text-sm">{error}</p>
          <a href={fullUrl} download className="px-4 py-2 bg-black/10 hover:bg-black/20 rounded-md text-sm transition">
            Tải xuống
          </a>
        </div>
      )}
      {/* docx-preview render vào đây — giữ đúng trang A4, font, bảng, màu */}
      <div
        ref={containerRef}
        className="docx-wrapper"
        style={{ padding: "30px 0", background: "#e8e8e8" }}
      />
    </div>
  );
}

function FileViewer({ url }: { url: string }) {
  const ext = getExtension(url);
  const fileType = getFileType(ext);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [textLoading, setTextLoading] = useState(false);

  // Tạo full URL nếu là path tương đối
  const fullUrl = url.startsWith("http") ? url : `http://localhost:3000${url}`;

  // Với file text: fetch nội dung
  useEffect(() => {
    if (fileType === "text") {
      setTextLoading(true);
      fetch(fullUrl)
        .then((r) => r.text())
        .then((t) => setTextContent(t))
        .catch(() => setTextContent("❌ Không thể đọc nội dung file."))
        .finally(() => setTextLoading(false));
    }
  }, [fullUrl, fileType]);

  switch (fileType) {
    case "pdf":
      return (
        <iframe
          src={fullUrl}
          className="w-full h-full border-0"
          title="PDF Viewer"
        />
      );

    case "image":
      return (
        <div className="flex items-center justify-center w-full h-full bg-[#0a0a0a] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={fullUrl}
            alt="File preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        </div>
      );

    case "video":
      return (
        <div className="flex items-center justify-center w-full h-full bg-black">
          <video
            src={fullUrl}
            controls
            className="max-w-full max-h-full rounded-lg shadow-2xl"
          >
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
        </div>
      );

    case "audio":
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#0a0a0a] gap-6">
          <div className="text-6xl">🎵</div>
          <p className="text-white/60 text-sm font-mono">{url.split("/").pop()}</p>
          <audio src={fullUrl} controls className="w-96 max-w-full">
            Trình duyệt của bạn không hỗ trợ phát audio.
          </audio>
        </div>
      );

    case "office":
      // .docx → dùng mammoth (hoạt động trên localhost)
      if (ext === "docx" || ext === "doc") {
        return <DocxViewer fullUrl={fullUrl} />;
      }
      // .xlsx, .pptx → cần server public, hiện thông báo rõ ràng
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white/50">
          <div className="text-5xl">📊</div>
          <p className="text-base text-white/60">
            File <code className="bg-white/10 px-2 py-0.5 rounded text-sm">.{ext}</code> chưa hỗ trợ xem trực tiếp trên localhost.
          </p>
          <p className="text-sm text-white/30">Hãy tải xuống và mở bằng Microsoft Office hoặc LibreOffice.</p>
          <a
            href={fullUrl}
            download
            className="mt-2 px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition"
          >
            Tải xuống file
          </a>
        </div>
      );

    case "text":
      return (
        <div className="w-full h-full overflow-auto bg-[#0d0d0d] p-6">
          {textLoading ? (
            <p className="text-white/40 font-mono text-sm">Đang tải...</p>
          ) : (
            <pre className="text-white/80 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed">
              {textContent}
            </pre>
          )}
        </div>
      );

    default:
      return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white/50">
          <div className="text-5xl">📄</div>
          <p className="text-lg">Không thể xem loại file <code className="bg-white/10 px-2 py-0.5 rounded text-sm">.{ext}</code></p>
          <a
            href={fullUrl}
            download
            className="mt-2 px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition"
          >
            Tải xuống file
          </a>
        </div>
      );
  }
}

function ViewFileContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  if (!url) {
    return (
      <div className="flex items-center justify-center h-screen text-white/50">
        Không có URL file được cung cấp.
      </div>
    );
  }

  const ext = getExtension(url);
  const fileName = decodeURIComponent(url.split("/").pop() || "File");

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 border-b border-white/10 bg-[#111111]">
          {/* Logo bên trái */}
          <div className="flex items-center">
            <div className="text-md font-semibold">
              DocsFuture
            </div>
          </div>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-white/70 text-sm font-mono truncate max-w-lg">
          {fileName}
        </span>
        <span className="ml-auto text-xs uppercase tracking-widest text-white/30 font-mono">
          .{ext}
        </span>
        <a
          href={url.startsWith("http") ? url : `http://localhost:3000${url}`}
          download
          className="ml-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-md transition font-medium"
        >
          Tải xuống
        </a>
      </div>

      {/* Viewer */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <FileViewer url={url} />
      </div>
    </div>
  );
}

export default function ViewFilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-[#0a0a0a] text-white/40">
          Đang tải...
        </div>
      }
    >
      <ViewFileContent />
    </Suspense>
  );
}