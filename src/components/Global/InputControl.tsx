import React, { ChangeEvent } from "react"


interface Props {
    labelName: string,
    inputName: string,
    value?: number,
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void

}


const InputControl: React.FC<Props> = (props) => {
    return (
        <>
            
            <label htmlFor="" className="text-stone-900">{props.labelName}</label>
                <input type="number" name={props.inputName} id=""
                    className="bg-slate-200 text-stone-900 px-3 py-2 rounded-lg block mb-2 w-full" 
                    onChange={e => props.handleInputChange(e)}
                    value={props.value} />
        </> 
    )
}

export default InputControl