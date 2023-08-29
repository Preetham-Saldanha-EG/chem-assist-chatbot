import React from "react";

function LanguageSelector({ isDanish, handleSwitchToDanish }) {
  const englishClass = isDanish
    ? "p-3 text-slate-500 text-center w-3/5 hover:underline text-2xl"
    : "bg-white w-2/5 p-3 rounded-tl-sm rounded-tr-2xl font-semibold text-[#232937] text-2xl ";

  const danishClass = isDanish
    ? "bg-white w-2/5 p-3 rounded-tr-sm rounded-tl-2xl font-semibold text-[#232937] text-2xl"
    : "p-3 text-slate-500 text-center w-3/5 hover:underline text-2xl";

  return (
    <div className="flex max-w-full w-full justify-between font-sans bg-slate-200 rounded-t-sm hover:bg-slate-300 cursor-pointer text-lg">
      <button
        className={englishClass}
        onClick={() => handleSwitchToDanish(false)}
      >
        English
      </button>
      <button
        className={danishClass}
        onClick={() => handleSwitchToDanish(true)}
      >
        Danish
      </button>
    </div>
  );
}

export default LanguageSelector;
