// pages/EmailBroadcast.tsx
"use client";
import React, { useState } from "react";
import TextEditor from "@/components/Text_Editor/TextEditor";

const EmailBroadcast: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextInput(event.target.value);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  // Sample email list
  const emailList = [
    "email1@example.com",
    "email2@example.com",
    "email3@example.com",
    "email4@example.com",
    "email5@example.com",
  ];

  return (
    <main className="w-full h-full text-[#B6B6B6]  text-[20px] flex flex-row justify-center items-center space-y-4 p-4">
      <div className="w-[60%] flex items-start justify-start  flex-col ">
        <div className="w-[70%] flex flex-col">
          <select
            value={selectedOption}
            onChange={handleDropdownChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="border-gray-300 mb-2 border w-full rounded">
            <input
              type="text"
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Your email subject"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <TextEditor />
        </div>
      </div>
      <div className="w-[40%]  flex flex-col items-center justify-start space-y-2">
        <h1 className="text-left  font-bold text-sm text-black ">
          Email Broadcasts
        </h1>
        {emailList.map((email, index) => (
          <div
            key={index}
            className="p-2 border bg-[#F8F8F8] w-[90%] border-gray-300 rounded "
          >
            <p className="text-sm"> {email} </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default EmailBroadcast;
