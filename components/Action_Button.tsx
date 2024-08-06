import { Spinner } from "flowbite-react";

interface Action_Button_Props {
    bg_color: string;
    label: string;
    isLoading?: boolean;
    onClick?: () => void;
}

export const Action_Button: React.FC<Action_Button_Props> = ({ bg_color, label, onClick, isLoading }) => {
    const bg_class = `${bg_color}`

    return <button disabled={isLoading} onClick={onClick} className={`text-[17px] text-white ${bg_class}  py-1 px-4 rounded-lg disabled:opacity-70`} >
        {isLoading ? <Spinner /> : label}
    </button>
}

