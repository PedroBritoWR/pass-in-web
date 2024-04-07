import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonRowProps extends ComponentProps <'button'> {
    transparent: boolean
}

// ? "bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-black/80" 
// : "bg-white/10 border border-white/10 rounded-md p-1.5 hover:bg-black/80 " }>

export function IconButtonRow ({transparent, ...props}:IconButtonRowProps) {
    return(
        <button 
        {...props}
            className={twMerge(
                "bg-black/20 border border-white/10 rounded-md p-1.5",
                transparent ? 'bg-black/20' : 'bg-white/10',
                props.disabled ? 'opacity-50' : null

            )}
        />
     )
}