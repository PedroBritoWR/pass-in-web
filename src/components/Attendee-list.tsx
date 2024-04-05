import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButtonRow } from "./IconButtonRow";
import { Table } from "./table/Table";
import { TableHeader } from "./table/TableHeader";
import { TableCell } from "./table/TableCell";
import { TableRow } from "./table/TableRow";
import { ChangeEvent, useState } from "react";
import { attendees } from "./data/attendee";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

 export function Participantes () {

    const [input, setInput] = useState('')
    const [page, setPage] = useState (1)
    const totalPages = Math.ceil(attendees.length / 10)

    function InputChange(event:ChangeEvent <HTMLInputElement> ) {
        setInput(event.target.value)
    }

    function goToFirstPage() {
      setPage(1)
    }

    function goToPreviousPage () {
      setPage (page -1)
    }

    function goToNextPage () {
      setPage(page + 1)
    }

    function goToLastPage () {
      setPage(totalPages)
    }

    return (
            <div>
              <div className="flex gap-5 items-center">
                <h1 className="font-Roboto text-2xl ">Participantes</h1>
              <div className=" w-72 px-3 py-1.5  border-white/10  border rounded-lg text-sm flex gap-3 items-center ">
                <Search className="size-4 text-emerald-300 " />
                <input onChange={InputChange} className="bg-transparent border-0 px-2 text-sm focus:ring-0" placeholder="Buscar participante..." />
              </div>
              {input}
            </div>
            <Table>
              <thead>
                <TableRow>
                <TableHeader style={{ width: 48 }}>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                </TableHeader>
                <TableHeader>Código</TableHeader>
                <TableHeader>Participante</TableHeader>
                <TableHeader>Data de inscrição</TableHeader>
                <TableHeader>Data do check-in</TableHeader>
                <TableHeader style={{ width: 64 }}>
                </TableHeader>
                </TableRow>
                </thead>
            <tbody>
              {attendees.slice((page -1) *10, page*10 ).map((attendee) => {
                return (
                  <TableRow key={attendee.id}>
                    <TableCell className="py-3 px-4 text-sm text-zinc-300">
                      <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                    </TableCell>
                    <TableCell> {attendee.id} </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">
                          {attendee.name}
                        </span>
                        <span>{attendee.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs().to(attendee.createdAt)} </TableCell>
                    <TableCell>{dayjs().to(attendee.checkedInAt)} </TableCell>
                    <TableCell>
                      <IconButtonRow transparent={true}>
                        <MoreHorizontal className="size-5" />
                      </IconButtonRow>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={3}> Mostrando 10 de { attendees.length } itens </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                <div>
                  <span>Página {page} de {} </span>
                <div className="inline-flex items-center gap-2 mx-4">
                    <IconButtonRow onClick={goToFirstPage} disabled={page === 1}
                        transparent={false}>              
                        <ChevronsLeft className="size-5 " />
                    </IconButtonRow>
                    <IconButtonRow onClick={goToPreviousPage} disabled={page === 1}
                        transparent={false} >
                        <ChevronLeft className="size-5 " /> 
                    </IconButtonRow>
                    <IconButtonRow onClick={goToNextPage}  disabled={page === 20}
                        transparent={false} >
                        <ChevronRight className="size-5 " />
                    </IconButtonRow>
                    <IconButtonRow onClick={goToLastPage} disabled={page === 20}
                        transparent={false} >
                        <ChevronsRight className="size-5 " />
                    </IconButtonRow>
                </div>
                </div>    
              </TableCell>
            </tr>
          </tfoot>
        </Table>
      </div>
  );
}