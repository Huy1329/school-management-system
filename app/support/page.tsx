
"use client";

import React from "react";
import { Mail, MessageCircle, Phone, ShieldQuestion ,GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Support Center</h1>
          <p className="text-zinc-400 mt-2">
            Need help? Contact support or send us a message.
          </p>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-1 space-y-4">
            {/* Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Mail size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Email Support</h2>
                  <p className="text-sm text-zinc-400">
                    nguyenhuy2k9ktm@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <Phone size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Phone</h2>
                  <p className="text-sm text-zinc-400">
                    +84 395261030
                  </p>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-3 rounded-xl">
                  <GraduationCap size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">School</h2>
                  <p className="text-sm text-zinc-400">
                    THPT Nguyen Trai - Bờ Y
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <ShieldQuestion className="text-white" />
              <h2 className="text-2xl font-semibold">
                Contact Support
              </h2>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="bg-white/5 border-white/10 text-white"
              />

              <Input
                placeholder="Your Email"
                className="bg-white/5 border-white/10 text-white"
              />

              <Input
                placeholder="Subject"
                className="bg-white/5 border-white/10 text-white"
              />

              <Textarea
                placeholder="Describe your problem..."
                className="bg-white/5 border-white/10 text-white min-h-[160px]"
              />

              <Button className="w-full bg-white text-black hover:bg-zinc-200">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}