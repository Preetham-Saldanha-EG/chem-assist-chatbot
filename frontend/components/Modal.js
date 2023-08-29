import React from "react";

function Modal({ isOpen, setIsOpen, message, isDanish, handleYes, handleNo }) {
  return (
    <>
      {isOpen && (
        <div className=" fixed w-screen">
          <div className=" absolute w-screen h-screen top-0 left-0 overflow-hidden bg-slate-500 opacity-40"></div>
          <div className="flex w-full justify-center  pt-44">
            <div className="z-10  h-48 bg-white p-7 flex flex-col gap-5 items-center text-center rounded-lg  max-lg:w-1/4 w-1/5 max-lg:text-lg text-xl">
              <p>{message}</p>
              <div className="flex gap-4">
                <button
                  className="text-white bg-[#232937] px-5 py-2 rounded-lg "
                  onClick={handleYes}
                >
                  {isDanish ? "Ja" : "Yes"}
                </button>
                <button
                  className="text-white bg-[#232937] px-5 py-2 rounded-lg "
                  onClick={handleNo}
                >
                  {isDanish ? "Nej" : "No"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
