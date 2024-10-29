/* eslint-disable react-hooks/rules-of-hooks */
import { DataTable } from "@/components/hand/TableData";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Dialog } from "@/components/hand/Dialog";
import { useToast } from "@/hooks/use-toast";
import Edit from "./edit";
import Register from "./register";

interface IParent {
  id: number
  userName: string
  role: string
}

export default function Parents() {
    const query = useQuery({
        queryKey: ['parents'],
        queryFn: () => fetch(`http://localhost:3000/parents`)
        .then(res => res.json())
    })

    const [visible, setVisible] = useState(false)


    const columns: ColumnDef<IParent>[] = [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "userName",
          header: "Nome",
        },
        {
          accessorKey: "role",
          header: "Papel",
        },
        {
            accessorKey: " ",
            header: " ",
            cell: ({row}) => {    

              const [visible, setVisible] = useState(false)
              const [visibleEdit, setVisibleEdit] = useState(false)

              const { toast } = useToast()

              const mutation = useMutation({
                  mutationFn: (id:number) => fetch(`http://localhost:3000/parents/${id}`, {
                      method: 'DELETE',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }).then(res => res.json()),
                  onSuccess: () => {
                      query.refetch()
                      setTimeout(() => setVisible(false), 2000)
                  },
                  onError: (error) => {
                      toast({
                          variant: "destructive",
                          title: "Error",
                          description: error.message
                      })
                  }
              })

              return (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setVisibleEdit(true)}>
                          <Pencil className="h-4 w-4" color="blue" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setVisible(true)}>
                        <Trash2 className="h-4 w-4"  color="red" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Dialog
                    title="Excluir Atividade"
                    description="Tem certeza que deseja excluir esta atividade?"
                    buttonTriggerText="Excluir"
                    buttonCancelText="Cancelar"
                    buttonConfirmText="Excluir"
                    isOpen={visible}
                    onConfirm={() => mutation.mutate(row.original.id)}
                    showTrigger={false}
                    onCancel={() => setVisible(false)}
                  />
                  {
                    visibleEdit && <Edit onClose={()=> { setVisibleEdit(false); query.refetch(); }} data={row.original} />
                  }
                </>
              )
            },
          },
    ]
    

    return (
    <div className="flex flex-col gap-4">
        <Button onClick={() => setVisible(true)}>
            <CirclePlusIcon className="h-4 w-4" />
            Adicionar
        </Button>
        {query.isFetched &&
        <>
          <DataTable columns={columns} data={query.data || []} />
          {visible && <Register onClose={()=> {setVisible(false); query.refetch()}} />}
        </>}
        {!query.isFetched && <div>Carregando...</div>}
    </div>
    )
}