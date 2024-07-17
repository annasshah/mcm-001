import React from 'react'
import { Rating } from 'flowbite-react'

export const Render_Rating = ({rating, unfill_color}) => {
    return (
        <Rating>
            {Array(5).fill({}).map(({}, index)=>{
                const filled = index + 1 <= rating 

                return <Rating.Star color={!filled && 'white'} key={index} filled={filled? true : false} />
            })}
            
        </Rating>
    )
}

