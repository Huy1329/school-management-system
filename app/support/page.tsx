"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, GraduationCap, ShieldQuestion, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/language-context";

// ✅ Thay bằng thông tin của bạn
const EMAILJS_SERVICE_ID = "service_a8klwyx";
const EMAILJS_TEMPLATE_ID = "template_2o29ujq";
const EMAILJS_PUBLIC_KEY = "mw-p6BQ46rr_PXnB0";

export default function SupportPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: "nguyenhuy2k9ktm@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">{t.t_support}</h1>
          <p className="text-zinc-400 mt-2">
            {t.support_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">{t.email_support}</h2>
                  <p className="text-sm text-zinc-400">nguyenhuy2k9ktm@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">{t.phone}</h2>
                  <p className="text-sm text-zinc-400">+84 395261030</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">{t.school}</h2>
                  <p className="text-sm text-zinc-400">THPT Nguyen Trai - Bờ Y</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShieldQuestion className="text-white" />
              <h2 className="text-2xl font-semibold">{t.button_support}</h2>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <CheckCircle size={48} className="text-green-400" />
                <p className="text-xl font-semibold">{t.tb_support}</p>
                <p className="text-zinc-400">
                  {t.support_desc_success}
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  className="mt-2 bg-white text-black hover:bg-zinc-200"
                >
                  {t.tb_support_desc}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder= {t.your_name}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder= {t.your_email}
                  type="email"
                  className="bg-white/5 border-white/10 text-white"
                />
                <Input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder= {t.subject_sp}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder= {t.message}
                  className="bg-white/5 border-white/10 text-white min-h-[160px]"
                />

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    {t.error_support}
                  </p>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {t.support_loading}
                    </span>
                  ) : (
                    t.button_sp
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}