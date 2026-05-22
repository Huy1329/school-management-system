"use client"
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/language-context";
//import {  } form 'test/page'

export default function Pricing() {
    const [open, setOpen] = useState(false);
    const { t } = useLanguage();
    
    return (

        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">{t.pricing_title}</h1>
                    <p>{t.pricing_description}</p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
                    <div className="rounded-(--radius) flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-2 md:rounded-r-none md:border-r-0 lg:p-10">
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-medium">Free</h2>
                                <span className="my-3 block text-2xl font-semibold">{t.free_price}</span>
                                <p className="text-muted-foreground text-sm">{t.free_vr}</p>
                            </div>

                            <Button
                                asChild
                                variant="outline"
                                disabled
                                className="w-full pointer-events-none opacity-50 cursor-not-allowed ">
                                <Link href="/home">{t.get_started_pricing}</Link>
                            </Button>

                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Basic Analytics Dashboard', '5MB Cloud Storage', 'Email and Chat Support'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="dark:bg-muted rounded-(--radius) border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="font-medium">Pro</h2>
                                    <span className="my-3 block text-2xl font-semibold">{t.pro_price}</span>
                                    <p className="text-muted-foreground text-sm">{t.pro_vr}</p>
                                </div>
                            <>
                                <Button
                                    asChild
                                    className="w-full"
                                    onClick={() => setOpen(true)}>
                                    <Link href="">{t.get_started_pricing}</Link>
                                </Button>

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
                                            
                                            <p className="text-xs uppercase tracking-[4px] text-black-400">
                                            {t.pay}
                                            </p>

                                            <h1 className="mt-2 text-3xl font-black">
                                            {t.thank_you}
                                            </h1>

                                            <div className="mt-6 space-y-3">
                                            
                                            {/* BANK */}
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-xs text-gray-400">
                                                {t.bank}
                                                </p>

                                                <h2 className="mt-1 text-xl font-bold">
                                                MB Bank
                                                </h2>
                                            </div>

                                            {/* NAME */}
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-xs text-gray-400">
                                                {t.account_name}
                                                </p>

                                                <h2 className="mt-1 text-xl font-bold">
                                                NGUYEN QUANG HUY
                                                </h2>
                                            </div>

                                            {/* STK */}
                                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                                <p className="text-xs text-gray-400">
                                                {t.account_number}
                                                </p>

                                                <h2 className="mt-1 text-2xl font-black tracking-wider text-pink-400">
                                                04658794132009
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
                            </div>

                            <div>
                                <div className="text-sm font-medium">{t.pro_text}</div>

                                <ul className="mt-4 list-outside space-y-3 text-sm">
                                    {['Everything in Free Plan', '5GB Cloud Storage', 'Email and Chat Support', 'Access to Community Forum', 'Single User Access', 'Access to Basic Templates', 'Mobile App Access', '1 Custom Report Per Month', 'Monthly Product Updates', 'Standard Security Features'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}