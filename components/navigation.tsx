"use client"
import React from "react";
import { Button } from "./ui/button";
import { authClient, useSession } from "@/app/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import UserButtonClient from "./user-button-client";
import Link from "next/link";
const data = [
  {
    id: 1,
    name: "Home",
    src: "/home",
  },
  {
    id: 2,
    name: "Library",
    src: "/library",
  },

  {
    id: 3,
    name: "Pricing",
    src: "/pricing",
  },
 
  {
    id: 4,
    name: "Support",
    src: "/support",
  },
  /* {
    id: 5,
    name: "Docs",
    src: "/docs",
  },*/
];
export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const signInWithGithub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };
  const {
    data: session,

    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    authClient.refreshToken;
    refetch();
    router.push("/");
  };

  return (
    <div
      className={`w-full fixed z-20 top-0
        backdrop-blur-xl
        bg-black/30
        border-b border-white/10
        shadow-lg
        px-12 ${
        pathname == "/view-file" ||
        pathname == "/sign-up" ||
        pathname == "/login"
          ? "hidden"
          : "flex"
      } items-center h-[60px]`}
    >
      {/* Logo bên trái */}
      <div className="flex items-center">
        <Link href={"/home"} className="text-md font-semibold">
          DocsFuture
        </Link>
      </div>

      {/* Menu ở giữa */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 items-center">
        {data.map((link) => (
          <Link
            key={link.id}
            className={`relative text-sm transition-colors duration-300 hover:text-white ${
              pathname === link.src ? "text-white" : "text-[#a1a1a1]"
            }`}
            href={link.src}
          >
            {link.name}
            {pathname === link.src && (
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-white rounded-full" />
            )}
          </Link>
        ))}
      </div>

      {/* User button bên phải */}
      <div className="ml-auto flex items-center gap-4">
        <UserButtonClient />
      </div>
    </div>
  );
}
