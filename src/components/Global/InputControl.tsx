import React, { ChangeEvent } from "react"


interface Props {
    divName?: string;
    labelName: string,
    inputName: string,
    value?: number | string,
    defaultValue?: string
    type: string
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
    className: string,
    disabled?: boolean,
    style?: string,
    required?: boolean

}


const InputControl: React.FC<Props> = (props) => {
    return (
        <div className={props.divName}>
            
            <label htmlFor="" className={`text-stone-900 ${props.style}`} >{props.labelName}</label>
                <input type={props.type} name={props.inputName} id=""
                    className={props.className} 
                    onChange={e => props.handleInputChange(e)}
                    value={props.value} 
                    disabled={props.disabled}
                    required={props.required}
                    defaultValue={props.defaultValue}    />
        </div> 
    )
}

export default InputControl