import React from "react";
import Spinner from "./Spinner";

function PromptInput({ handlePromptSubmit, prompt, setPrompt, isGenerating }) {
  return (
    <div className=" flex gap-1 items-center mb-5 w-full">
      <textarea
        onSubmit={handlePromptSubmit}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        className=" w-[100%] p-2 h-12 text-lg border-gray-600 ring-2 border-[1px] rounded-md"
      />
      <button
        className="h-10  w-24 p-2 bg-blue-700 text-white rounded-md  duration-150 hover:text-gray-300 active:scale-105 "
        onClick={handlePromptSubmit}
      >
        {!isGenerating ? "Submit" : <Spinner />}
      </button>
    </div>
  );
}

export default PromptInput;
