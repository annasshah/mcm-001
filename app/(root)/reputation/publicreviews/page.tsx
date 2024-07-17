'use client'

import { useState } from "react";
import { Select, Spinner } from "flowbite-react";
import { useLocationClinica } from '@/hooks/useLocationClinica'
import moment from "moment";
import { Render_Rating } from "@/components/Rating_Component/Render_Rating";


export interface Location {
  id: number
  title: string
}



export interface Review_Interface {
  id: number
  location_id: number
  first_name: string
  last_name: string
  rating: number
  review: string
  date: string
}


const data_demo: Review_Interface[] = [
  {
    id: 1,
    location_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    rating: 4,
    review: 'If you need urgent medical attention in Garland Clinica San Miguel is the place to go! My 75 year old dad was in bad shape and the staff took such great care of him and solved his problem. The care and attention he displayed I have rarely seen and is very admirable.Their charges were also reasonable at the end of it all. Thank you once again!',
    date: '2024-06-28 21:28:52.532542+00'
  },
  {
    id: 1,
    location_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    rating: 4,
    review: 'If you need urgent medical attention in Garland Clinica San Miguel is the place to go! My 75 year old dad was in bad shape and the staff took such great care of him and solved his problem. The care and attention he displayed I have rarely seen and is very admirable.Their charges were also reasonable at the end of it all. Thank you once again!',
    date: '2024-06-28 21:28:52.532542+00'
  },
  {
    id: 1,
    location_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    rating: 4,
    review: 'If you need urgent medical attention in Garland Clinica San Miguel is the place to go! My 75 year old dad was in bad shape and the staff took such great care of him and solved his problem. The care and attention he displayed I have rarely seen and is very admirable.Their charges were also reasonable at the end of it all. Thank you once again!',
    date: '2024-06-28 21:28:52.532542+00'
  },
  {
    id: 1,
    location_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    rating: 4,
    review: 'If you need urgent medical attention in Garland Clinica San Miguel is the place to go! My 75 year old dad was in bad shape and the staff took such great care of him and solved his problem. The care and attention he displayed I have rarely seen and is very admirable.Their charges were also reasonable at the end of it all. Thank you once again!',
    date: '2024-06-28 21:28:52.532542+00'
  },
  {
    id: 1,
    location_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    rating: 4,
    review: 'If you need urgent medical attention in Garland Clinica San Miguel is the place to go! My 75 year old dad was in bad shape and the staff took such great care of him and solved his problem. The care and attention he displayed I have rarely seen and is very admirable.Their charges were also reasonable at the end of it all. Thank you once again!',
    date: '2024-06-28 21:28:52.532542+00'
  },
]



const List_Item = ({ data }: { data: Review_Interface }) => {
  const { id, first_name, last_name, date, review } = data


  return <div className={`${'bg-[#D9D9D9]'}   px-3 py-3 rounded-lg  cursor-pointer pointer-events-auto`}>

    <div className="flex justify-between">
      <div className="space-y-3">
        <h1 className={`${'text-text_primary_color'}  font-bold text-2xl`}>
          {`${first_name || '-'} ${last_name || '-'}`}
        </h1>
        <Render_Rating unfill_color="#ffff" rating={4} />
      </div>
      <div className="text-end">
        <h3 className={`${'text-text_primary_color'} font-normal text-lg`}>
          {moment(date, 'YYYY-MM-DD h:mm s').format('YYYY-MM-DD')}
        </h3>
      </div>
    </div>
    <h3 className="text-[#27272B] text-lg">
      {review}
    </h3>
  </div>
}



const PublicReviews = () => {

  const { locations } = useLocationClinica()

  const [data_list, setData_list] = useState(data_demo)

  const select_change_handle = async (e: any) => {
    const value = e.target.value

  }





  return (
    <main className="relative mt-20 w-full h-full text-[#B6B6B6] font-[500] text-[20px] space-y-5">



      <div className="flex justify-end items-end ps-3 gap-3 ">


        <div className="w-1/4 ">
          <div >
            <Select onChange={select_change_handle} style={{ backgroundColor: '#D9D9D9' }} id="locations" required>
              <option disabled selected value=''>All locations</option>
              {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.title}</option>)}
            </Select>

          </div>
        </div>

      </div>


      <div className=" h-[80vh] space-x-5 ">

        <div className="w-full bg-[#EFEFEF] h-full overflow-scroll px-3 py-3 rounded-lg space-y-5">


          {false ? <div className="flex h-full flex-1 flex-col justify-center items-center">
            <Spinner size='xl' />


          </div> : data_list.length === 0 ? <div className="flex h-full flex-1 flex-col justify-center items-center">
            <h1>No Review added yet!</h1>
          </div> : data_list.map((data: Review_Interface, index: any) => <List_Item key={index} data={data} />)}


        </div>

      </div>






    </main>
  );
};

export default PublicReviews;
