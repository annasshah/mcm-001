import React from 'react'
import { Rating } from 'flowbite-react'
interface RenderRatingProps {
    rating: number
    unfill_color?: string

}

export const Render_Rating = ({ rating, unfill_color }: RenderRatingProps) => {
    return (
        <Rating>
            {Array(5).fill({}).map(({ }, index) => {
                const filled = index + 1 <= rating
                const color = !filled ? 'white' : undefined

                return <Rating.Star color={color} key={index} filled={filled ? true : false} />
            })}

        </Rating>
    )
}

