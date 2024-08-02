
interface Action_Button_Props {
    bg_color: string;
    label: string;
    onClick?: () => void;
}

export const Action_Button: React.FC<Action_Button_Props> = ({ bg_color, label, onClick }) => {
    const bg_class = `${bg_color}`

    return <button onClick={onClick} className={`text-[17px] text-white ${bg_class}  py-1 px-4 rounded-lg`} >
        {label}
    </button>
}

