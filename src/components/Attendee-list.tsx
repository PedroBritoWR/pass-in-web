import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IconButtonRow } from "./IconButtonRow";
import { Table } from "./table/Table";
import { TableHeader } from "./table/TableHeader";
import { TableCell } from "./table/TableCell";
import { TableRow } from "./table/TableRow";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

 export function Participantes () {

    const [search, setSearch] = useState(() => {
    const url = new URL (window.location.toString());

      if (url.searchParams.has('search')) {
        return  (url.searchParams.get('search'))  ?? ""
      }

      return ""
    })
    const [page, setPage] = useState (() => {
    const url = new URL (window.location.toString())

      if(url.searchParams.has('page')) {
        return Number (url.searchParams.get("page")); 
      }

      return 1

    })
    const [total, setTotal] = useState (0)
    const [attendees, setAttendees] = useState<attendee[]>([])
    const totalPages = Math.ceil(total / 10)

    useEffect(() => {
      const url = new URL(
        'http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?'
      );

      url.searchParams.set("pageIndex", String (page - 1));
      if (search.length > 1) {
        url.searchParams.set("query", search )
      }


      fetch(url)
      .then(response => response.json())
      .then(data => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
    }, [page, search] )

    function setCurrentSearch(search: string){
      const url = new URL(window.location.toString())
      url.searchParams.set('search', search)
      window.history.pushState({}, "", url)
      setSearch(search)
    }

    function setCurrentPage (page: number) {
      const url = new URL(window.location.toString());
      url.searchParams.set("page", String (page))
      window.history.pushState({}, "", url)
      setPage(page)

    }

    function InputChange(event:ChangeEvent <HTMLInputElement> ) {
        setCurrentSearch(event.target.value)
        setCurrentPage (1)
    }


    function goToFirstPage() {
      setCurrentPage (1)
    }

    function goToPreviousPage () {
      setCurrentPage (page -1)
    }

    function goToNextPage () {
      setCurrentPage( page + 1)
    }

    function goToLastPage () {
      setCurrentPage (totalPages)

    }

    return (
            <div>
              <div className="flex gap-5 items-center">
                <h1 className="font-Roboto text-2xl ">Participantes</h1>
              <div className=" w-72 px-3 py-1.5  border-white/10  border rounded-lg text-sm flex gap-3 items-center ">
                <Search className="size-4 text-emerald-300 " />
                <input onChange={InputChange} className="bg-transparent border-0 px-2 text-sm focus:ring-0" placeholder="Buscar participante..." 
                value={search}
                />
              </div>
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
              {attendees.map((attendee) => {
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
                    <TableCell>{attendee.checkedInAt === null ? <span className="text-zinc-400">não fez check-in</span> : dayjs().to(attendee.checkedInAt)} </TableCell>
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
                <TableCell colSpan={3}>Mostrando {attendees.length} de { total } itens </TableCell>
                <TableCell className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
                <div>
                  <span>Página {page} de {totalPages} </span>
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