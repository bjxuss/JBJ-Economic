import React, { ChangeEvent } from "react"


interface Props {
    labelName: string,
    inputName: string,
    value?: number | string,
    type: string
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    className: string,
    disabled?: boolean,
    style?: string ,

}


const InputControl: React.FC<Props> = (props) => {
    return (
        <div>
            
            <label htmlFor="" className={`text-stone-900 ${props.style}`} >{props.labelName}</label>
                <input type={props.type} name={props.inputName} id=""
                    className={props.className} 
                    onChange={e => props.handleInputChange(e)}
                    value={props.value} 
                    disabled={props.disabled}    />
        </div> 
    )
}

export default InputControl