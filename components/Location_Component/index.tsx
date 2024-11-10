import { LocationContext } from '@/context'
import { useLocationClinica } from '@/hooks/useLocationClinica'
import { Select } from 'flowbite-react'
import React, { useContext } from 'react'

const Location_Component = () => {
    const { locations, set_location_handle, selected_location } = useLocationClinica({ defaultSetFirst: true })

    const select_location_handle = (val: React.ChangeEvent<HTMLSelectElement>) => {
        const value = val.target.value
        set_location_handle(value)
    }

    return (
        <div >
            <Select onChange={select_location_handle} defaultValue={selected_location} style={{ backgroundColor: '#D9D9D9' }} id="locations" required>
                {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.title}</option>)}
            </Select>

        </div>
    )
}

export default Location_Component