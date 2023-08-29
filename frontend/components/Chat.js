import React from "react";

function Chat({ role, message, timeTaken }) {
  const style =
    role === "user"
      ? "bg-blue-100 rounded-md p-3 w-full flex gap-3 box-border my-1"
      : "bg-gray-100 rounded-md p-3 w-full flex gap-3 box-border my-1";

  return (
    <div className={style}>
      <div>
        <p
          className={
            role === "user"
              ? "flex-wrap font-mono font-bold text-blue-700"
              : " flex-wrap font-mono font-bold text-green-700"
          }
        >
          {role !== "user" ? "Mr.Chemical:" : "user:"}
        </p>
        <p className="font-mono font-bold text-gray-700">
          {role !== "user" ? "(" + timeTaken + "s" + ")" : ""}
        </p>
      </div>
      <p className=""> {message}</p>
    </div>
  );
}

export default Chat;
