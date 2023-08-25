import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import PromptInput from "./PromptInput";
import Chat from "./Chat";
import Spinner from "./Spinner";

function ChatWindow({}) {
  const [prompt, setPrompt] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatInfo, setChatInfo] = useState([
    {
      content:
        "You are an expert in chemistry who is a helpfull assistant for industrial chemical safety and helps prevent chemical hazard by warning the user about dangers, prevention, storing and handling when required.Always answer as helpfully as possible, while being safe. You have the knowledge of all potential chemical hazards and the chemical safety data sheets of all chemicals. If a text is unrelated to chemicals or industrial  explain it is a different subject and does not pertain to your expertise instead of wrong answer.",
      role: "system",
    },
    // {
    //   content: "sulfric acid fallen on my hand",
    //   role: "user",
    // },
  ]);

  const handlePromptSubmit = async () => {
    if (prompt === "") return;

    setIsSubmit((isSubmit) => !isSubmit);
  };

  useEffect(() => {
    if (prompt !== "") {
      const payload = {
        max_tokens: 1000,
      };
      console.log("submitted...", payload);
      setChatInfo((chatInfo) => [
        ...chatInfo,
        { content: prompt, role: "user" },
      ]);
      setIsGenerating(true);
      payload.messages = [...chatInfo, { content: prompt, role: "user" }];
      axios
        .post("http://localhost:8000/v1/chat/completions", payload)
        .then((data) => {
          const newMessage = data.data?.choices[0].message?.content;
          console.log("extracetd text", newMessage);
          setIsGenerating(false);
          setChatInfo((chatInfo) => [
            ...chatInfo,
            { content: newMessage, role: "system" },
          ]);
          setPrompt("");
          console.log(data);
        });
    }
  }, [isSubmit]);

  //   const { data, error, isLoading } = useSWR("/api/user", fetcher);
  return (
    <div className="p-6 col-span-9 box-border max-w-[90vw] min-w-[90vw] m-auto">
      <div className="bg-gray-400 rounded-lg pt-4 pb-4 px-6  flex flex-col items-center  gap-2 m-auto  ">
        <div className="min-h-[60vh] max-h-[60vh] border-2  bg-white rounded-lg w-full overflow-y-scroll">
          {chatInfo.slice(1).map((chat, index) => (
            <Chat message={chat.content} role={chat.role} key={index} />
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
  );
}

export default ChatWindow;
