"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/assets/images/icons/Filterwhite.png";
import Filterblack from "@/assets/images/icons/Filterblack.png";
import {
  sendEmail,
  getUserEmail,
  getUserLocations,
} from "@/actions/send-email/action";
import template1 from "@/assets/images/Avatar/temp1.png";
import template2 from "@/assets/images/Avatar/temp2.png";
import template3 from "@/assets/images/Avatar/temp3.png";
import template4 from "@/assets/images/Avatar/temp4.png";
import template5 from "@/assets/images/Avatar/temp5.png";
import { TabContext } from "@/context/ActiveTabContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChevronLeft, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const EmailBroadcast: React.FC = () => {
  const [textInput, setTextInput] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [emailList, setEmailList] = useState<any[]>([]);
  const [locationList, setLocationList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<any>(false);
  const { selectedEmails, setSelectedEmails } = useContext(TabContext);
  useEffect(() => {
    const fetchEmailList = async () => {
      try {
        const email = await getUserEmail();
        setEmailList(email);
        const location = await getUserLocations();
        setLocationList(location);
      } catch (error) {
        console.error("Failed to fetch email:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailList();
  }, []);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTemplate(event.target.value);
  };

  const handleSelectEmail = (email: string) => {
    setSelectedEmails((prevSelectedEmails: any) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter(
            (selectedEmail: any) => selectedEmail !== email
          )
        : [...prevSelectedEmails, email]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emailList.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emailList.map((email) => email.email));
    }
  };

  const templates = [
    { id: 1, src: template1, name: "Template 1" },
    { id: 2, src: template2, name: "Template 2" },
    { id: 3, src: template3, name: "Template 3" },
    { id: 4, src: template4, name: "Template 4" },
    { id: 5, src: template5, name: "Template 5" },
  ];

  return (
    <main className="w-full h-full text-[#B6B6B6] text-[20px] flex flex-row justify-start overflow-hidden items-center space-y-4 p-4">
      <div className=" w-[80%] flex items-start justify-start flex-col ">
        <form className="w-full">
          <div className="w-[70%] flex flex-col">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full p-2 mb-2 border text-left border-gray-300 rounded">
                  Select Option
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  {!filter ? (
                    <>
                      <div className="flex items-center cursor-pointer justify-between">
                        <div className="flex items-center">
                          <AlertDialogTitle>Select Patients</AlertDialogTitle>
                        </div>
                        <AlertDialogCancel>
                          {" "}
                          <X />{" "}
                        </AlertDialogCancel>
                      </div>
                      <div className="flex items-center justify-between ">
                        <div className="flex items-center ">
                          <h1>Search</h1>
                          <input
                            placeholder="Search by name"
                            className="p-2 ml-2 border border-gray-200 rounded-lg "
                          />
                        </div>
                        {!filter ? (
                          <Image
                            src={Filter}
                            alt=""
                            height={25}
                            width={25}
                            onClick={() => {
                              setFilter(true);
                            }}
                          />
                        ) : (
                          <Image
                            src={Filterblack}
                            alt=""
                            height={25}
                            width={25}
                            onClick={() => {
                              setFilter(false);
                            }}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between  ">
                        <h2>Name/Email</h2>
                        <h2>Gender</h2>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center cursor-pointer justify-between">
                      <div className="flex items-center">
                        <ChevronLeft
                          onClick={() => {
                            setFilter(false);
                          }}
                        />
                        <AlertDialogTitle>Filter Patients</AlertDialogTitle>
                      </div>
                      <AlertDialogCancel>
                        {" "}
                        <X />{" "}
                      </AlertDialogCancel>
                    </div>
                  )}
                  <hr />
                  <AlertDialogDescription>
                    {!filter && (
                      <RadioGroup defaultValue="comfortable">
                        {loading ? (
                          <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Skeleton
                                key={index}
                                className="h-10 w-full rounded"
                              />
                            ))}
                          </div>
                        ) : (
                          emailList?.map((email, index) => (
                            <ScrollArea>
                              <div
                                key={index}
                                className="flex items-center p-4 bg-[#F8F8F8] w-[98%] my-2 rounded"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="all" id="" />
                                  <Label htmlFor="">{email.email}</Label>
                                </div>
                              </div>
                            </ScrollArea>
                          ))
                        )}
                      </RadioGroup>
                    )}

                    {filter && (
                      <div>
                        <br />
                        <br />
                        <RadioGroup defaultValue="comfortable">
                          <div className="flex ">
                            {" "}
                            <h1 className="mr-2  font-bold text-black">
                              Gender
                            </h1>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">Male</Label>
                            </div>
                            <div className="flex ml-2 items-center space-x-2">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Female</Label>
                            </div>
                            <div className="flex ml-2 items-center space-x-2">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Other</Label>
                            </div>
                          </div>
                        </RadioGroup>
                        <br />
                        <div className="flex items-center  ">
                          <h1 className="mr-2 font-bold text-black">
                            Treatment Type
                          </h1>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {emailList?.map((patient: any, index) => (
                                  <SelectItem value={`${index}`} key={index}>
                                    {patient.treatmenttype}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <br />
                        <RadioGroup defaultValue="comfortable">
                          <div className="flex ">
                            {" "}
                            <h1 className="mr-2 font-bold text-black">
                              Visit Type
                            </h1>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">On-site</Label>
                            </div>
                            <div className="flex ml-2 items-center space-x-2">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Off-site</Label>
                            </div>
                          </div>
                        </RadioGroup>
                        <br />
                        <div className="flex items-center  ">
                          <h1 className="mr-2  font-bold text-black ">
                            Location
                          </h1>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {/* <SelectLabel>Fruits</SelectLabel> */}
                                {locationList?.map((location, index) => (
                                  <SelectItem
                                    key={index}
                                    value={`${location.locationid}`}
                                  >
                                    {location.Locations.title}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <br />
                        <Button>Apply</Button>
                      </div>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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
                  className="flex flex-col w-[20%] rounded p-2 justify-center m-3 border border-gray-300 items-center mb-4"
                >
                  <Image
                    src={template.src}
                    alt={template.name}
                    className=" h-[100px]  w-[100px] "
                  />
                  <RadioGroup className="my-5">
                    <div className="flex w-full items-center justify-center ">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1" className="ml-1">
                        {template.name}
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex">
                    <Link href={`/template/${template.id}`} passHref>
                      <Button>Preview</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <br />
          <Button
            // className="border-gray-800 bg-black cursor-pointer mb-3 mt-3 text-white rounded text-sm px-4 py-2"
            formAction={sendEmail}
          >
            Submit
          </Button>
        </form>
      </div>
      {/* <div className="w-[40%] flex flex-col items-center justify-start space-y-2"></div> */}
    </main>
  );
};

export default EmailBroadcast;
