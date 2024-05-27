

"use client"
import React, { useEffect, useState } from 'react';
import WebsiteContentLayout from './Layout';
import { Button, Label, Select, Sidebar } from "flowbite-react";
import { fetchHeroSectionContent, updateHeroSectionContent } from '@/utils/supabase/data_services/data_services';

const Home = () => {
    const [default_data, setDefault_data] = useState(null)
    const [data, setData] = useState(null)
    const [is_edited, setIs_edited] = useState(false)

    const [update_loading, setUpdate_loading] = useState(false)
    const [selected_language, setSelected_language] = useState('')



    const select_language_handle = (language) => {
        const lan = language.target.value
        setSelected_language(()=>lan)
        setIs_edited(false)

        // console.log(language.target.value)
            ; (async function get_data() {
                const data = await fetchHeroSectionContent(lan)
                setDefault_data(data[0])
                setData(data[0])
            })()

    }
    const select_section_handle = (val) => {

        console.log(language)

    }


    const on_change_handle = (field, val) => {
        setIs_edited(true)
        setData((pre) => {
            return {
                ...pre,
                [field]: val
            }
        })


    }



    const handleUpdate = () => {
        ; (async function get_data() {
            setUpdate_loading(true)
            const res_data = await updateHeroSectionContent(selected_language, data)
            console.log(res_data)
            setUpdate_loading(false)
            // setDefault_data(data[0])
            // setData(data[0])
        })()

        



    };



    const reset_fields = () => {
        setIs_edited(false)
        setData(default_data)
    }




    useEffect(() => {
        ; (async function get_data() {
            const data = await fetchHeroSectionContent('')
            setDefault_data(data[0])
            setData(data[0])
        })()

    }, [])


    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-5 lg:flex-row lg:gap-24 my-5'>
                    <div >
                        <Label htmlFor="section" value="Section" className='font-bold' />
                        <Select className='h-auto' onChange={select_section_handle} style={{ backgroundColor: '#D9D9D9' }} id="section" required>
                            <option disabled selected value=''>Hero Section</option>
                            {/* <option value={'en'}>Hero Section</option> */}
                        </Select>

                    </div>
                    <div >
                        <Label htmlFor="language" value="Language" className='font-bold' />
                        <Select className='h-auto' onChange={select_language_handle} style={{ backgroundColor: '#D9D9D9' }} id="language" required>
                            <option selected value={''}>English</option>
                            <option value={'_es'}>Spanish</option>
                        </Select>

                    </div>
                </div>
                <div className="border-t my-3 border-black"></div>
                <div className='px-3 w-1/2 space-y-5'>
                    <h6 className='text-primary_color font-bold'>Content</h6>
                    <div>
                        <p className='text-primary_color'>Title :</p>
                        <input
                            value={data?.title}
                            type="text"
                            className='w-full  p-3 rounded-lg bg-input_bg'
                            onChange={(e) => on_change_handle('title', e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='text-primary_color'>Text :</p>
                        <textarea
                            // defaultValue={default_data?.content}
                            className='rounded-lg w-full  bg-input_bg resize-none outline-none border-none'
                            rows={8} cols={51}
                            value={data?.content}
                            onChange={(e) => on_change_handle('content', e.target.value)}
                        ></textarea>
                    </div>
                    <div className='flex justify-end' >
                        <div className='flex items-end gap-2 ' >
                            <button onClick={reset_fields}>
                                <span className='text-sm underline' >
                                    Reset
                                </span>
                            </button>
                            <Button onClick={handleUpdate} isProcessing={update_loading} disabled={!is_edited || update_loading} className='bg-primary_color px-3'>
                                <span className='text-sm' >
                                    Update
                                </span>
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </WebsiteContentLayout>
    );
}
export default Home;
