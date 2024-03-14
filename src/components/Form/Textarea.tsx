import React from "react"
import "./form.css";

interface TextAreaInterface {
    label: string,
    value?: string,
    placeholder?: string,
    callback: (value:string) => void
}

const Textarea = ({label, value = '', placeholder = '', callback} : TextAreaInterface) => {
    return (
        <div className="form-group">
            <label>{ label }</label>
            <textarea 
                defaultValue={value}
                placeholder={placeholder} 
                onChange={(e) => callback(e.target.value)} 
            ></textarea>
        </div>
    );
}
export default Textarea;