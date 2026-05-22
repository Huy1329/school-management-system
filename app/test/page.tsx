"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function PaymentModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        Thanh toán
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#111] text-white shadow-2xl">
            
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-50 text-xl text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              
              {/* LEFT */}
              <div className="flex flex-col justify-center p-6 bg-[#111]">
                
                <p className="text-xs uppercase tracking-[4px] text-pink-400">
                  QR PAYMENT
                </p>

                <h1 className="mt-2 text-3xl font-black">
                  THANK YOU ❤️
                </h1>

                <div className="mt-6 space-y-3">
                  
                  {/* BANK */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-gray-400">
                      Ngân hàng
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      MB Bank
                    </h2>
                  </div>

                  {/* NAME */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-gray-400">
                      Chủ tài khoản
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      NGUYEN VAN A
                    </h2>
                  </div>

                  {/* STK */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-gray-400">
                      Số tài khoản
                    </p>

                    <h2 className="mt-1 text-2xl font-black tracking-wider text-pink-400">
                      123456789
                    </h2>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center justify-center bg-gradient-to-br from-pink-500/20 to-blue-500/20 p-6">
                
                <div className="rounded-3xl bg-white p-3">
                  <Image
                    src="/qr.png"
                    alt="QR Code"
                    width={260}
                    height={260}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}