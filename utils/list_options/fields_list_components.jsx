import { Rating } from "@mui/material"

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

}


export const find_fields = {
    text: 'textarea',
    title: 'input',
    content: 'textarea',
    rating:'rating',
    name:'input',
    // mon_timing:'timings',
    // sunday_timing:'timings',
    // saturday_timing:'timings',
    review:'textarea',
    answer:"textarea"
}


