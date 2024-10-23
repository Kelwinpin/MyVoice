import { DataTable } from "@/components/hand/TableData";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, CirclePlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import Register from "..";

interface IActivityType {
  id: number
  name: string
}


const columns: ColumnDef<IActivityType>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
        accessorKey: " ",
        header: " ",
        cell: () => {     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem className="cursor-pointer">
                    <Pencil className="h-4 w-4" color="blue" /> Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash2 className="h-4 w-4"  color="red" /> Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]

export default function ActivityTypes() {
    const query = useQuery({
        queryKey: ['activityTypes'],
        queryFn: () => fetch(`http://localhost:3000/activityTypes`)
        .then(res => res.json())
    })

    const [visible, setVisible] = useState(false)
    

    return (
    <div className="flex flex-col gap-4">
        <Button onClick={() => setVisible(true)}>
            <CirclePlusIcon className="h-4 w-4" />
            Adicionar
        </Button>
        <DataTable columns={columns} data={query.data || []} />
        {visible && <Register onClose={()=> setVisible(false)} />}
    </div>
    )
}