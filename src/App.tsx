import { Participantes } from "./components/Attendee-list";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="file: max-w-6xl mx-auto py-5 flex-col gap-5">
      <Header />
      <Participantes />
    </div>
  );
}


