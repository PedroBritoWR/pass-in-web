import { NavLink } from "./NavLinks";

export function Header () {
    return (
        <div className="flex items-center gap-5 py-2 ">
           <img className="peer-first: w-8 h-8 " src="https://cf-vectorizer-live.s3.amazonaws.com/vectorized/anon/2eY9LlyvFHq8jisZ2urgYBbrzag.svg" />

           <nav className="flex items-center gap-5">
                <NavLink href="/eventos" text="Eventos"/>
                <NavLink href="/Participantes" text="Participantes"/>
           </nav>
        </div>
        
    );
}