import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps <'tr'> {}

export function TableRow (props:TableRowProps) {
    return(  
        <tr  className="border-b border-white/10 hover:bg-gray-900/80" {...props} />
    );
}