import React from "react";
import Spinner from "./Spinner";
import Arrow from "../images/send.svg"
function PromptInput({ handlePromptSubmit, prompt, setPrompt, isGenerating }) {
  return (
    <div className=" flex gap-1 items-center mb-5 w-full">
      <textarea
        onSubmit={handlePromptSubmit}
        onChange={(e) => setPrompt(e.target.value)}    
        value={prompt}
        onKeyDown={(e) => { 
          if (e.key === 'Enter'){
            console.log("key pressed");
            handlePromptSubmit();
            e.preventDefault();
          }}}
        className=" w-[100%] p-2 h-12 text-lg border-gray-600 ring-2 ring-[#232937] border-[1px] rounded-md"    
        placeholder="Send a message" 
      />
      <button
        className="h-12 w-24 p-2 bg-[#232937] text-white rounded-md  duration-150 hover:text-gray-300 active:scale-105 flex justify-center pt-3"
        onClick={handlePromptSubmit}
      >
        {!isGenerating ? <Arrow color="white"/> : <Spinner />}
      </button>
    </div>
  );
}

export default PromptInput;
