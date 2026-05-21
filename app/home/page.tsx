"use client";
import LiquidEther from "@/components/LiquidEther";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, SendHorizonal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession } from "@/app/lib/auth-client";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="w-full flex justify-center relative items-center h-[calc(100vh-60px)]">
      {/* Hiệu ứng nền - z-index thấp */}
      <div style={{ width: "100%", height: 600, position: "absolute", zIndex: 0 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Nội dung - z-index cao hơn */}
      <section className="relative z-10">
        <div className="flex flex-col items-center justify-center w-full gap-8">
          <Link
            href="/"
            className="rounded-(--radius) flex w-fit items-center justify-center gap-2 border p-1 pr-3 lg:ml-0"
          >
            <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
              New
            </span>
            <span className="text-sm">Introduction Upload</span>
            <span className="bg-(--color-border) block h-4 w-px"></span>
            <ArrowRight className="size-4" />
          </Link>
          <h1 className="w-[700px] text-center text-3xl font-medium md:text-5xl xl:text-6xl">
            A Complete Learning Resource for Students
          </h1>
          <p className="w-[530px] text-center">
            Discover a rich collection of learning resources, study materials,
            and inspirational content designed to guide you through every step
            of your educational journey — helping you achieve your academic
            goals, develop critical thinking, and grow into a lifelong learner.
          </p>
          <div className="flex gap-4 items-center">
            <Link href={session ? "/library" : "/login"}>
              <Button 
                variant={"outline"}
                className="flex items-center gap-2"
              >
                Getting Started
              
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}