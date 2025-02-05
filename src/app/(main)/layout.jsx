"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
  const path = usePathname();

  return (
    <div className="">
      {path.includes("login") || path.includes("register") ? (
        <></>
      ) : (
        <Navbar></Navbar>
      )}
      <div className="bg-bg-gray pb-9">{children}</div>
      {path.includes("login") ||
      path.includes("register") ||
      path.includes("community") ||
      path.includes("messenger") ? (
        <></>
      ) : (
        <Footer></Footer>
      )}

      <Link
        href="https://wa.me/message/XPWNEV3HUN6MO1"
        target="_blank"
        className="fixed bottom-4 right-4 z-50"
      >
        <Image
          height={60}
          width={60}
          className="w-[40px] md:w-[50px] lg:w-[60px] h-[40px] md:h-[50px] lg:h-[60px] bg-transparent z-50"
          src="https://i.postimg.cc/HWBFd2X3/Whatsapp-removebg-preview.png"
          alt="WhatsApp"
        />
      </Link>
    </div>
  );
};

export default MainLayout;
