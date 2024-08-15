// pages/EmailBroadcast.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import TextEditor from "@/components/Text_Editor/TextEditor";
import { sendEmail } from "@/actions/send-email/action";
import template1 from "@/assets/images/Avatar/temp1.png";
import template2 from "@/assets/images/Avatar/temp2.png";
import template3 from "@/assets/images/Avatar/temp3.png";
import template4 from "@/assets/images/Avatar/temp4.png";
import template5 from "@/assets/images/Avatar/temp5.png";
const EmailBroadcast: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [subject, setSubject] = useState<string>("Hello");
  // const [email, setEmail] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const handleSubmit = async () => {
    {
      sendEmail;
    }
  };

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
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTemplate(event.target.value);
  };
  // Sample email list
  const emailList = [
    "raheelhussainco@gmail.com",
    "raheelofficialco@gmail.com",
    "raheelandcompany@gmail.com",
    "raheelconnect@gmail.com",
  ];
  const templates = [
    { id: 1, src: template1, name: "Template 1" },
    { id: 2, src: template2, name: "Template 2" },
    { id: 3, src: template3, name: "Template 3" },
    { id: 4, src: template4, name: "Template 4" },
    { id: 5, src: template5, name: "Template 5" },
  ];
  return (
    <main className="w-full h-full text-[#B6B6B6]  text-[20px] flex flex-row justify-center items-center space-y-4 p-4">
      <div className="w-[60%] flex items-start justify-start  flex-col ">
        <form className="w-full">
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
                id="subject"
                name="subject"
                placeholder="Write Subject"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="border-gray-300 mb-2 border w-full rounded">
              <input
                type="text"
                id="buttonLink"
                name="buttonLink"
                placeholder="Button Link"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {/* <TextEditor /> */}
            <h2 className="font-bold text-lg mb-2">Select Template</h2>
            <div className="mt-4 flex w-full">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full p-2 m-3 border border-gray-300 items-center mb-4"
                >
                  <Image
                    src={template.src}
                    alt={template.name}
                    className=" h-[100px] w-[200px] "
                  />
                  <div className="flex items-center ">
                    <input
                      type="radio"
                      name="template"
                      id={`template-${template.id}`}
                      value={template.id.toString()}
                      checked={selectedTemplate === template.id.toString()}
                      onChange={handleRadioChange}
                      className="w-4 h-4 border-2 mr-2 border-gray-500 rounded-full checked:bg-blue-500"
                    />
                    <label
                      htmlFor={`template-${index}`}
                      className="flex items-center"
                    >
                      <span className="text-gray-800 my-2 text-sm">
                        {template.name}
                      </span>
                    </label>
                  </div>
                  <div className="flex">
                    <Link href={`/template/${template.id}`} passHref>
                      <button className="rounded border text-white bg-black border-gray-300 text-sm px-8 py-1 my-2">
                        <a target="_blank" rel="noopener noreferrer">
                          Preview
                        </a>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="border-gray-800 bg-black cursor-pointer mb-3 mt-3 text-white  rounded text-sm px-4 py-2"
            formAction={handleSubmit}
          >
            Submit
          </button>
        </form>
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
