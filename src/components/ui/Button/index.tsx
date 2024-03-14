import React from "react"

interface ButtonInterface {
    text: string,
    callback: () => void,
    type?: "submit" | "reset" | "button",
    cssclass?:string
}

const Button = ({text, callback, type = "button", cssclass="button"} : ButtonInterface) => {
    return (
        <button type={type} onClick={callback} className={cssclass}>
            {text}
        </button>
    );
}
export default Button;

