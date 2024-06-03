import { Rating } from "@mui/material"
import { Checkbox, TimePicker } from "antd"
import { useState } from "react"
import Moment from 'moment';

export const fields_list_components = {
    input: {

        Component_Render: ({ on_change_handle, label, key_id, data }) => {
            return <div>
                <p className='font-bold text-primary_color'>{label} :</p>
                <input
                    value={data[key_id] || ''}
                    type="text"
                    className='w-full  p-3 rounded-lg bg-input_bg'
                    onChange={(e) => on_change_handle(key_id, e.target.value)}
                />
            </div>
        }
    },
    textarea: {
        Component_Render: ({ on_change_handle, label, key_id, data }) => {
            return <div>
                <p className='font-bold text-primary_color'>{label} :</p>
                <textarea
                    className='rounded-lg w-full  bg-input_bg resize-none outline-none border-none'
                    rows={8} cols={51}
                    value={data[key_id] || ''}
                    onChange={(e) => on_change_handle(key_id, e.target.value)}
                ></textarea>
            </div>
        }
    },
    rating: {
        Component_Render: ({ on_change_handle, label, key_id, data }) => {
            return <div>
                <p className='font-bold text-primary_color'>{label} :</p>
                <Rating
                    size='large'
                    name="simple-controlled"
                    value={data[key_id] || 0}
                    onChange={(event, newValue) => {
                        on_change_handle(key_id, newValue)
                    }}

                />
            </div>
        }
    },
    timer: {
        Component_Render: ({ on_change_handle, label, key_id, data }) => {
            const [checked, setChecked] = useState(false);

            const onChange = (e) => {
                // console.log('checked = ', e.target.checked);
                const val = e.target.checked
                const save_value = val ? 'Closed' : ''
                setChecked(val)
                on_change_handle(key_id, save_value)
            };

            const render_time = (val) => {
                if (val?.toLocaleLowerCase() === 'closed') {
                    return ['', '']
                }
                else if (val === '') {
                    return ['', '']

                }

                else if (val) {
                    const split_time = val.split('-')
                    return [Moment(split_time[0] || '', 'LT'), Moment(split_time[1] || '', 'LT')]
                }
                else {
                    return ['', '']
                }
            }

            const time_change_handle = (e) => {

                if(data[key_id]){
                    on_change_handle(key_id, '')
                }
                
                let value = ''
                if (e) {

                    const start_time = Moment(e[0]['$d']).format('LT')

                    const end_time = Moment(e[1]['$d']).format('LT')
                    console.log({
                        start_time,
                        end_time
                    })
                    value = `${start_time}-${end_time}`
                }

                on_change_handle(key_id, value)

            }
            return <div className="">

               <div className="flex gap-2 justify-between items-end">
                    <p className='font-bold text-primary_color '>{label} :</p> {key_id !== 'mon_timing' &&  <Checkbox
                        className="font-bold"
                        checked={checked || data[key_id] && data[key_id] == "Closed" }
                        onChange={onChange}

                    >
                        Closed
                    </Checkbox>}
                </div>

                <div className="flex items-center space-x-3 w-full">
                    <TimePicker.RangePicker onChange={time_change_handle} disabled={checked || data[key_id] && data[key_id] == "Closed" }
                        use12Hours
                        
                        defaultValue={render_time(data[key_id])}
                        format="hh:mm A"
                        className="py-3 border-gray-800 w-full" size="large" />

                </div>
            </div>
        }
    }

}


export const find_fields = {
    text: 'textarea',
    title: 'input',
    content: 'textarea',
    rating: 'rating',
    name: 'input',
    mon: 'timer',
    sunday: 'timer',
    saturday: 'timer',
    review: 'textarea',
    answer: "textarea",
    phone: 'input'
}


