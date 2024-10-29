import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { Div, StyledForm } from "../styles";
import kidSchema from "@/schemas/IKid";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export default function Register({ onClose }: { onClose: () => void }) {
    const form = useForm<z.infer<typeof kidSchema>>({
        defaultValues: {},
        resolver: zodResolver(kidSchema),
    });

    const { toast } = useToast()

    const parentsQuery = useQuery({
        queryKey: ['parents'],
        queryFn: () => fetch(`http://localhost:3000/parents`)
        .then(res => res.json())
    })

    const mutation = useMutation({
        mutationFn: (parentId:number) => fetch(`http://localhost:3000/kids`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gender: form.watch('gender'),
                parentId: parentId,
            })
        }).then(res => res.json()),
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Success",
                description: "Activity Type created successfully",
                duration: 2000
            })
            setTimeout(() => onClose(), 1000)
            form.reset()
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message
            })
        }
    })


    const onSubmit = () => {        
        mutation.mutate(form.getValues('parentId') as number);
    }
    const modalRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <Div>
            <Form {...form}>
                <StyledForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" ref={modalRef}>
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Atividade</FormLabel>
                                <FormControl>
                                    <Input placeholder="Gênero" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="parentId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Atividade</FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger className="w-[200px]">
                                                <SelectValue placeholder="Responsável" {...field}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent ref={modalRef}>
                                            {parentsQuery.data?.map((parent: { id: number, userName: string, role: string }) =>
                                                <SelectItem value={String(parent.id)} key={parent.id}>
                                                    {parent.userName}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Enviar</Button>
                </StyledForm>
            </Form>
            <Toaster />
        </Div>
    )    
}