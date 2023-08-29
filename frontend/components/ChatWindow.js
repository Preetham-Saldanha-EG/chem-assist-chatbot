import React, { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import axios from "axios";
import PromptInput from "./PromptInput";
import Chat from "./Chat";
import Spinner from "./Spinner";
import LanguageSelector from "./LanguageSelector";
import { content } from "@/tailwind.config";
import Modal from "./Modal";

function ChatWindow({}) {
  const [prompt, setPrompt] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDanish, setIsDanish] = useState(false);
  const [danishToEnglishMessages, setDanishToEnglishMessages] = useState([]);
  const abortController = useRef(new AbortController());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handleYes, setHandleYes] = useState(null);
  const [handleNo, setHandleNo] = useState(null);
  const [chatInfo, setChatInfo] = useState([
    // {
    //   content:
    //     "You are an expert in chemistry who is a helpfull assistant for industrial chemical safety and helps prevent chemical hazard by warning the user about dangers, prevention, storing and handling when required.Always answer as helpfully as possible, while being safe. You have the knowledge of all potential chemical hazards and the chemical safety data sheets of all chemicals. If a text is unrelated to chemicals or industrial  explain it is a different subject and does not pertain to your expertise instead of wrong answer.",
    //   role: "system",
    // },
    // {
    //   content: "sulfric acid fallen on my hand",
    //   role: "user",
    // },
  ]);

  const handleModalOpen = async () => {
    console.log("trigger..");
    const result = await new Promise((resolve, reject) => {
      const yesCallback = () => {
        console.log("test");
        resolve(true);
        setIsDanish((prev) => !prev);
        setChatInfo([]);
        setIsGenerating(false);

        abortController.current.abort();
        abortController.current = new AbortController();
        setIsModalOpen(false);
      };
      setHandleYes(() => yesCallback);
      const noCallback = () => {
        resolve(false);
        setIsModalOpen(false);
      };
      setHandleNo(() => noCallback);
    });
    console.log("trigger...end");
    // if (result) {

    // }
  };

  const handlePromptSubmit = async () => {
    if (prompt === "") return;

    setIsSubmit((isSubmit) => !isSubmit);
  };

  const handleSwitchToDanish = () => {
    setIsModalOpen(true);
    handleModalOpen();
  };

  const handleEnglishSubmit = () => {
    const payload = {
      // max_tokens: 1000,
    };
    console.log("submitted...", payload);
    setChatInfo((chatInfo) => [
      ...chatInfo,
      { content: prompt, role: "user", totalTime: parseFloat(0) },
    ]);
    setIsGenerating(true);
    setPrompt("");
    payload.messages = [
      ...chatInfo,
      { content: prompt, role: "user", totalTime: parseFloat(0) },
    ];
    axios
      .post("http://127.0.0.1:8000/v1/chat/generate/english", payload, {
        signal: abortController.current?.signal,
      })
      .then((data) => {
        console.log(data);
        // const newMessage = data.data?.choices[0].message?.content;
        const newMessage = data.data?.result;
        const timeTaken = data.data?.totalTime;
        console.log("extracetd text", newMessage);
        setIsGenerating(false);
        setChatInfo((chatInfo) => [
          ...chatInfo,
          { content: newMessage, role: "system", totalTime: timeTaken },
        ]);
      })
      .catch((err) => console.log(err));
  };

  const handleDanishSubmit = () => {
    const payload = {
      // max_tokens: 1000,
    };
    console.log("submitted...", payload);
    setChatInfo((chatInfo) => [
      ...chatInfo,
      { content: prompt, role: "user", totalTime: parseFloat(0) },
    ]);
    setIsGenerating(true);
    setPrompt("");
    payload.messages = [
      ...danishToEnglishMessages,
      { content: prompt, role: "user", totalTime: parseFloat(0) },
    ];
    axios
      .post("http://127.0.0.1:8000/v1/chat/generate/danish", payload, {
        signal: abortController.current.signal,
      })
      .then((data) => {
        console.log(data);
        // const newMessage = data.data?.choices[0].message?.content;
        const newMessage = data.data?.result;
        const timeTaken = data.data?.totalTime;
        console.log("extracetd text", newMessage);
        setIsGenerating(false);
        setChatInfo((chatInfo) => [
          ...chatInfo,
          { content: newMessage, role: "system", totalTime: timeTaken },
        ]);
        setDanishToEnglishMessages((englishMessages) => [
          ...englishMessages,
          {
            content: data.data.englishChat.question,
            role: "user",
            totalTime: parseFloat(0),
          },
          {
            content: data.data.englishChat.answer,
            role: "system",
            totalTime: timeTaken,
          },
        ]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (prompt !== "") {
      if (!isDanish) {
        handleEnglishSubmit();
      } else {
        handleDanishSubmit();
      }
    }
  }, [isSubmit]);

  //   const { data, error, isLoading } = useSWR("/api/user", fetcher);
  return (
    <>
      <Modal
        handleNo={handleNo}
        handleYes={handleYes}
        message={
          isDanish
            ? "Vil du skifte til engelsk?"
            : "Do you want to switch to Danish?"
        }
        isOpen={isModalOpen}
        isDanish={isDanish}
      />
      <div className="col-span-9 box-border m-auto w-full h-screen bg-[#f2f2f2] ">
        <div className="bg-[#f2f2f2] pt-4 px-6  m-auto h-screen my-10">
          <div className="rounded-lg flex flex-col items-center mx-auto max-w-[60%] bg-[#bfbfc0] p-10">
            <LanguageSelector
              isDanish={isDanish}
              handleSwitchToDanish={handleSwitchToDanish}
            />
            <div className="min-h-[60vh] max-h-[60vh] border-b-2  bg-white rounded-b-lg w-full overflow-y-scroll mb-2">
              {chatInfo.map((chat, index) => (
                <Chat
                  message={chat.content}
                  role={chat.role}
                  timeTaken={chat.totalTime}
                  key={index}
                />
              ))}
              {isGenerating ? (
                <div className=" animate-pulse flex p-3 flex-row gap-2 w-full text-gray-500">
                  <Spinner />
                  <div className=" flex flex-col gap-2 w-full  ">
                    <div className="flex justify-end">
                      <div className="rounded-lg bg-slate-300 h-6 w-[85%]"></div>
                    </div>
                    <div className=" rounded-lg bg-slate-300 h-6 w-full"></div>
                    <div className="rounded-lg bg-slate-300 h-6 w-[70%]"></div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              handlePromptSubmit={handlePromptSubmit}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatWindow;
