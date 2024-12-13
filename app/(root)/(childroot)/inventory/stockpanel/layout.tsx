import Location_Component from '@/components/Location_Component';
import React, { ReactNode } from 'react'
interface LayoutProps {
    children: ReactNode;
}

const layout: React.FC<LayoutProps> = ({
    children,
}) => {
    return (
        <div className='mt-16' >
            {children}
        </div>
    )
}


export default layout;
