import { ComponentProps } from "react";

interface IconButtonRowProps extends ComponentProps <'button'> {
    transparent: boolean
}

export function IconButtonRow ({transparent, ...props}:IconButtonRowProps) {
    return(
        <button {...props}
         className={
            transparent 
            ? "bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-black/80" 
            : "bg-white/10 border border-white/10 rounded-md p-1.5 hover:bg-black/80 " }>
         </button>
    )
}