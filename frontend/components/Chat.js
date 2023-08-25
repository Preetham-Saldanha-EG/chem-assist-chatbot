import React from "react";

function Chat({ role, message }) {
  const style =
    role === "user"
      ? "bg-blue-100  rounded-sm p-3 w-full flex gap-3 box-border"
      : "bg-gray-100  rounded-sm p-3 w-full flex gap-3 box-border";

  return (
    <div className={style}>
      <p
        className={
          role === "user"
            ? "flex-wrap font-mono font-bold text-blue-700"
            : " flex-wrap font-mono font-bold text-green-700"
        }
      >
        {role !== "user" ? "Mr.Chemical:" : "user:"}
      </p>
      <p className=""> {message}</p>
    </div>
  );
}

export default Chat;
