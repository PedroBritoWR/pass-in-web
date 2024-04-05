import { ComponentProps } from "react";

interface NavLinksProps extends ComponentProps <'a'> {
    text: string
}

export function NavLink (props:NavLinksProps) {
    return(
        <div>
            <a {...props} className="font-medium text-sm" >{props.text} </a>
        </div>
    );
}
