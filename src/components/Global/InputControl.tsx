import React, { ChangeEvent } from "react"


interface Props {
    labelName: string,
    inputName: string,
    value?: number | string,
    type: string
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    disabled?: boolean

}


const InputControl: React.FC<Props> = (props) => {
    return (
        <>
            
            <label htmlFor="" className="text-stone-900">{props.labelName}</label>
                <input type={props.type} name={props.inputName} id=""
                    className="bg-slate-200 text-stone-900 px-3 py-2 rounded-lg block mb-2 w-full" 
                    onChange={e => props.handleInputChange(e)}
                    value={props.value} 
                    disabled={props.disabled}    />
        </> 
    )
}

export default InputControl