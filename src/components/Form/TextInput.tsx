import React, { KeyboardEvent } from "react"
import "./form.css";

interface TextInputInterface {
    type: string,
    value?: string,
    label: string,
    placeholder?: string,
    callback: (value:string) => void,
   
}

const TextInput = ({label, type, value = '', placeholder = '', callback} : TextInputInterface) => {

    return (
        <div className="form-group">
            <label>{ label }</label>
            <input 
                defaultValue={value}
                type={type} 
                placeholder={placeholder} 
                onChange={(e) => callback(e.target.value)} 
            />
        </div>
    );
}
export default TextInput;