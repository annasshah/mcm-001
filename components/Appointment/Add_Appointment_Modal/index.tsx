import { Input_Component_Appointment } from '@/components/Appointment/Add_Appointment_Modal/Input_Component';
import { useLocationClinica } from '@/hooks/useLocationClinica';
import { Label, Modal, Radio, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import ScheduleDateTime from './ScheduleDateTime';
import { supabase } from '@/services/supabase';

interface RadioButtonOptionsInterface {
    label: string;
    value: string;
}

const RadioButton = ({ value, name, label, checked, onChange }: any) => (
    <div className="flex items-center justify-start gap-3">
        <input
            id={`${name}-${value}`}
            type="radio"
            value={value}
            name={name}
            checked={checked}
            onChange={onChange}
            className="w-[25px] h-[25px] !border-solid !border-[2px] !border-gray-300"
        />{" "}
        <label htmlFor={`${name}-${value}`} className="text-[16px] text-customGray font-poppins">{label}</label>
    </div>

)

const RadioButtons = ({
    name,
    options,
    label,
    selectedValue,
    onChange,
}: {
    name: string;
    options: RadioButtonOptionsInterface[];
    label: string;
    selectedValue: string;
    onChange: (value: string) => void;
}) => (
    <div className="flex flex-col md:flex-row items-start justify-start gap-4">
        <label className="text-[16px] text-customGray font-poppins font-bold">
            {label}:
        </label>
        <div className="flex flex-wrap gap-4">
            {options.map(({ label, value }, index) => (
                <RadioButton
                    key={index}
                    value={value}
                    name={name}
                    label={label}
                    checked={selectedValue === value}
                    onChange={() => onChange(value)}
                />
            ))}
        </div>
    </div>
);

// {
//     "id": 53,
//     "created_at": "2024-08-03T21:09:47.443957+00:00",
//     "location_id": 12,
//     "first_name": "Test",
//     "last_name": "User",
//     "email_Address": "mail@mail.com",
//     "dob": "2024-08-14",
//     "sex": "Male",
//     "service": "Thyroid Care",
//     "in_office_patient": true,
//     "new_patient": true,
//     "address": "123 street",
//     "phone": null,
//     "date_and_time": "12|31-08-2024 - 3:00 PM",
//     "location": {
//         "id": 12,
//         "title": "Clinica San Miguel Houston, TX Office",
//         "address": "12741 East Frwy, Houston, TX 77015"
//     }
// }


const in_office_patient_options: RadioButtonOptionsInterface[] = [
    {
        label: 'Office visit',
        value: 'true'
    },
    {
        label: 'Virtual visit',
        value: 'false'
    }
]
const patient_type_options: RadioButtonOptionsInterface[] = [
    {
        label: 'New',
        value: 'true'
    },
    {
        label: 'Coming back',
        value: 'false'
    }
]
const gender_options: RadioButtonOptionsInterface[] = [
    {
        label: 'Male',
        value: 'Male'
    },
    {
        label: 'Female',
        value: 'Female'
    },
    {
        label: 'Other',
        value: 'Other'
    }
]

// interface FormDataInterface {
//     location_id: number;
//     first_name: string;
//     last_name: string;
//     email_Address: string;
//     dob: string;
//     sex: string;
//     service: string;
//     in_office_patient: string;
//     new_patient: string;
//     address: string;
//     phone: string;
//     date_and_time: string;
// }

export const Add_Appointment_Modal = () => {

    const { locations } = useLocationClinica()
    const [formData, setFormData] = useState<any>({})
    const [open, setOpen] = useState(false)
  const [services, setServices] = useState<string[] | null | undefined>([]);



    const close_handle = () => {
        setOpen(false)
    }
    const open_handle = () => {
        setOpen(true)
    }
    const select_change_handle = (key: string, val: string | number) => {
        setFormData((pre:any) => {
            return { ...pre, [key]: val }
        })

    }
    const selectDateTimeSlotHandle = () => {
        // setFormData((pre) => {
        //     return { ...pre, [key]: val }
        // })

    }


    useEffect(() => {
        const fetchServices = async () => {
          let { data, error } = await supabase.from('services').select("title");
    
          if (data) {
            const serviceData = data.map((item) => item.title);
            setServices(serviceData);
          }
        };
    
        fetchServices();
      }, []);
      console.log(services)
    return (
        <div>
            <button onClick={open_handle} className='text-lg bg-gray-300 px-5 py-2 rounded-md font-bold text-black'>
                Add an Appointment
            </button>


            <Modal show={open} onClose={close_handle}>

                <Modal.Header>
                    <div className='flex items-center justify-between'>
                        <h1 className='font-bold'>Add an Appointment</h1>
                        {/* <IoCloseOutline size={25} /> */}
                    </div>

                </Modal.Header>

                <Modal.Body>
                    <div className="space-y-5">




                        <div className='space-y-8'>
                            <div className='flex flex-1 items-center gap-4'>
                                <Label htmlFor='locations' className='font-bold'>
                                    Locations
                                </Label>
                                <div className='flex-1'>
                                    <Select onChange={(e) => select_change_handle('location_id', e.target.value)} id="locations" required>
                                        <option selected value=''>All locations</option>
                                        {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.address}</option>)}
                                    </Select>
                                </div>
                            </div>

                            <div className='flex flex-1 items-center gap-4'>
                                <RadioButtons
                                    name='in_office_patient'
                                    label='Type of visit'
                                    options={in_office_patient_options}
                                    selectedValue={formData.in_office_patient}
                                    onChange={(e) => select_change_handle('in_office_patient', e)}

                                />
                            </div>
                            <div className='flex flex-1 items-center gap-4'>
                                <RadioButtons
                                    name='new_patient'
                                    label='Are you a new or returning patient?'
                                    options={patient_type_options}
                                    selectedValue={formData.new_patient}
                                    onChange={(e) => select_change_handle('new_patient', e)}

                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='w-full'>
                                    <Input_Component_Appointment onChange={(e: string) => select_change_handle('first_name', e)} placeholder='@peduarte' label='First Name' />
                                </div>
                                <div className='w-full'>
                                    <Input_Component_Appointment onChange={(e: string) => select_change_handle('last_name', e)} placeholder='@peduarte' label='Last Name' />
                                </div>
                            </div>

                            <div className='w-full'>
                                <Input_Component_Appointment onChange={(e: string) => select_change_handle('email', e)} placeholder='Enter you current email address' label='Email' />
                            </div>
                            <div className='w-full'>
                                <Input_Component_Appointment onChange={(e: string) => select_change_handle('phone_number', e)} placeholder='Enter you current email address' label='Phone number' />
                            </div>
                            <div className='w-full'>
                                <Input_Component_Appointment onChange={(e: string) => select_change_handle('phone_number', e)} placeholder='Your date of birth' label='Your date of birth' />
                            </div>
                            <div className='flex flex-1 items-center gap-4'>
                                <RadioButtons
                                    name='sex'
                                    label='Sex'
                                    options={gender_options}
                                    selectedValue={formData.sex}
                                    onChange={(e) => select_change_handle('sex', e)}

                                />
                            </div>

                            <div className='w-full'>
                                <Input_Component_Appointment onChange={(e: string) => select_change_handle('address', e)} placeholder='Enter your address with zipcode' label='Address' />
                            </div>


                            <div className='flex flex-1 items-center gap-4'>
                                <Label htmlFor='locations' className='font-bold'>
                                    Treatment
                                </Label>
                                <div className='flex-1'>
                                    <Select onChange={(e) => select_change_handle('service', e.target.value)} id="services" required>
                                        <option selected value=''>Select Treatment type</option>
                                        {services?.map((service: string, index: any) => <option key={index} value={service}>{service}</option>)}
                                    </Select>
                                </div>
                            </div>

                            {locations.length > 0 && <div>
                                <ScheduleDateTime data={locations[0]} selectDateTimeSlotHandle={selectDateTimeSlotHandle} />
                            </div>}
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <div className='flex w-full justify-end'>
                        <button className='bg-[#0F172A] w-40 py-3 rounded-lg text-white'>
                            Submit
                        </button>
                    </div>
                </Modal.Footer>

            </Modal>

        </div >
    )
}


