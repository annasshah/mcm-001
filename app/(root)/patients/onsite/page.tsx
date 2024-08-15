"use client";
import React, { useState } from "react";
import { Select } from "flowbite-react";
import { CiFilter } from "react-icons/ci";
import { useLocationClinica } from "@/hooks/useLocationClinica";
import moment from "moment";

interface DataListInterface {
  id: number;
  type: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  treatment_type: string;
  gender: string;
  created_at: string;
  last_visit: string;
}

const dataList: DataListInterface[] = [
  {
    id: 8472,
    type: "In-Patient",
    patient_name: "Mack Martinez",
    patient_phone: "+1 (847) 876 2947",
    patient_email: "MackMartinezj24@gmail.com",
    treatment_type: "Diabetes",
    gender: "Male",
    created_at: "2024-06-28 21:28:52.532542+00",
    last_visit: "2024-06-28 21:28:52.532542+00",
  },
  {
    id: 8473,
    type: "In-Patient",
    patient_name: "Mack Martinez",
    patient_phone: "+1 (847) 876 2947",
    patient_email: "MackMartinezj24@gmail.com",
    treatment_type: "Diabetes",
    gender: "Male",
    created_at: "2024-06-28 21:28:52.532542+00",
    last_visit: "2024-06-28 21:28:52.532542+00",
  },
  {
    id: 8474,
    type: "In-Patient",
    patient_name: "Mack Martinez",
    patient_phone: "+1 (847) 876 2947",
    patient_email: "MackMartinezj24@gmail.com",
    treatment_type: "Diabetes",
    gender: "Male",
    created_at: "2024-06-28 21:28:52.532542+00",
    last_visit: "2024-06-28 21:28:52.532542+00",
  },
  {
    id: 8475,
    type: "In-Patient",
    patient_name: "Mack Martinez",
    patient_phone: "+1 (847) 876 2947",
    patient_email: "MackMartinezj24@gmail.com",
    treatment_type: "Diabetes",
    gender: "Male",
    created_at: "2024-06-28 21:28:52.532542+00",
    last_visit: "2024-06-28 21:28:52.532542+00",
  },
  {
    id: 8478,
    type: "In-Patient",
    patient_name: "Mack Martinez",
    patient_phone: "+1 (847) 876 2947",
    patient_email: "MackMartinezj24@gmail.com",
    treatment_type: "Diabetes",
    gender: "Male",
    created_at: "2024-06-28 21:28:52.532542+00",
    last_visit: "2024-06-28 21:28:52.532542+00",
  },
];

const Patients = () => {
  const { locations } = useLocationClinica();
  const [patientDetails, setPatientDetails] =
    useState<DataListInterface | null>(null);

  const select_change_handle = async (e: any) => {
    // const value = e.target.value
  };

  const detailsViewHandle = (param_data: DataListInterface) => {
    setPatientDetails(param_data);
  };

  return (
    <main className="w-full  h-full font-[500] text-[20px]">
      <div className="flex justify-between items-center px-4 py-4 space-x-2">
        <h1 className="text-xl font-bold">All pateints</h1>

        <div>
          <Select
            onChange={select_change_handle}
            style={{ backgroundColor: "#D9D9D9" }}
            id="locations"
            required
          >
            <option disabled selected value="">
              All locations
            </option>
            {locations.map((location: any, index: any) => (
              <option key={index} value={location.id}>
                {location.title}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="w-full min-h-[81.5dvh] h-[100%] py-2 px-2 grid grid-cols-3 gap-2">
        <div className="bg-[#B8C8E1] h-[100%]  col-span-2 rounded-md py-2   ">
          <div className="space-y-6 px-3 pb-4 flex justify-between">
            <div>
              <h1 className="text-xl font-bold">search</h1>
              <input
                type="text"
                placeholder=""
                className=" px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white"
              />
            </div>

            <div>
              <CiFilter size={30} />
            </div>
          </div>
          <div className="h-[1px] w-full bg-black" />

          <div className="px-3 pt-5">
            {/* Table goes here */}

            <div className="flex items-center flex-1 font-semibold">
              <h1 className="flex-1 text-start">Patient ID</h1>
              <h1 className="flex-1 text-center">Patient Name</h1>
              <h1 className="flex-1 text-end">Created at</h1>
            </div>

            <div className="mt-5 space-y-5">
              {dataList.map((elem) => {
                const { id, patient_name, created_at } = elem;
                return (
                  <div
                    key={id}
                    onClick={() => detailsViewHandle(elem)}
                    className="cursor-pointer hover:bg-text_primary_color hover:text-white flex items-center flex-1 font-semibold bg-white px-3 py-4 rounded-md "
                  >
                    <h1 className="flex-1 text-start">{id}</h1>
                    <h1 className="flex-1 text-center">{patient_name}</h1>
                    <h1 className="flex-1 text-end">
                      {moment(created_at, "YYYY-MM-DD h:mm s").format(
                        "MMM DD, YYYY"
                      )}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-[#B8C8E1] h-[100%] rounded-md overflow-hidden flex flex-col">
          <div className="px-4 py-4 bg-[#11252C80]  border-b-[1px] border-b-[#817B7B] flex items-center">
            <h1 className="text-xl font-normal text-white text-center w-full">
              Patient Detail
            </h1>
          </div>

          {/* Right side content goes here */}

          {patientDetails && (
            <div className="overflow-auto h-[100%] px-4 py-4">
              <div className="flex items-start justify-between font-semibold mb-4">
                <dl>
                  <dd className="font-bold text-2xl">{patientDetails?.id}</dd>
                  <dt className="text-lg text-[#707070]">Patient ID</dt>
                </dl>
                {/* <div>
                <p className='px-2 py-[2px] text-[16px] rounded-md  bg-text_primary_color text-white'>{patientDetails?.type}</p>
              </div> */}
              </div>

              <dl>
                <dd className="font-bold text-2xl">
                  {patientDetails?.patient_name}
                </dd>
                <dt className="text-lg text-[#707070]">Patient Name</dt>
              </dl>

              <div className="h-[1px] w-full bg-black my-3" />

              <div className="space-y-7 ">
                <dl>
                  <dd className="font-semibold text-lg">
                    {patientDetails?.patient_phone}
                  </dd>
                  <dt className="text-sm text-[#707070]">Patient Phone</dt>
                </dl>
                <dl>
                  <dd className="font-semibold text-lg">
                    {patientDetails?.patient_email}
                  </dd>
                  <dt className="text-sm text-[#707070]">Patient Email</dt>
                </dl>
                <dl>
                  <dd className="font-semibold text-lg">
                    {patientDetails?.treatment_type}
                  </dd>
                  <dt className="text-sm text-[#707070]">Treatment Type</dt>
                </dl>
                <dl>
                  <dd className="font-semibold text-lg">
                    {patientDetails?.gender}
                  </dd>
                  <dt className="text-sm text-[#707070]">Gender</dt>
                </dl>

                <div className="flex items-center flex-1">
                  <dl className="flex-1">
                    <dd className="font-semibold text-lg">
                      {moment(
                        patientDetails?.created_at,
                        "YYYY-MM-DD h:mm s"
                      ).format("MMM DD, YYYY")}
                    </dd>
                    <dt className="text-sm text-[#707070]">Created at</dt>
                  </dl>
                  <dl className="flex-1">
                    <dd className="font-semibold text-lg">
                      {moment(
                        patientDetails?.last_visit,
                        "YYYY-MM-DD h:mm s"
                      ).format("MMM DD, YYYY")}
                    </dd>
                    <dt className="text-sm text-[#707070]">Last Visit</dt>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Patients;
