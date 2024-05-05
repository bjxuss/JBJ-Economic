interface Props {
    onClick: React.MouseEventHandler<HTMLDivElement>
}


const Card_initial: React.FC<Props> = (props) => {
    return (
        <div className="flex justify-start items-center">
            <div className="w-60 h-60 max-w-52 mb-[220px] ml-3 bg-[#fff] rounded-xl shadow-[0_2px_4px_#1e1b4b] flex flex-row justify-center items-center cursor-pointer transition-[transform_0.3s_ease] hover:-translate-y-1">

                <div className="text-5xl text-[#007bff]" onClick={props.onClick}>+</div>
            </div>

        </div>
    )
}

export default Card_initial