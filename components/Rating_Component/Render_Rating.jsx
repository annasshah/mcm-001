import React from 'react'
import { Rating } from 'flowbite-react'

export const Render_Rating = ({rating}) => {
    return (
        <Rating>
            {Array(5).fill({}).map(({}, index)=>{

                return <Rating.Star key={index} filled={index + 1 <= rating ? true : false} />
            })}
            
        </Rating>
    )
}

