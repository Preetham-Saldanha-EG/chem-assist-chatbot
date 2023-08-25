"use client";
import ChatWindow from "@/components/ChatWindow";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className=" flex flex-col">
        <Header />
        {/* <div className="grid grid-cols-10 pt-16 ">
          <Slider />
          <ChatWindow />
        </div> */}
        <ChatWindow />
      </div>
    </main>
  );
}
