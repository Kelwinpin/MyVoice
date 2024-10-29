import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { Div, StyledForm } from "../styles";
import kidSchema from "@/schemas/IKid";

interface IKid {
    id: number
    gender: string
    parent: {
      id: number
      userName: string
      role: string
    }
  }


export default function Edit({ onClose, data }: { onClose: () => void, data: IKid }) {
    const form = useForm<z.infer<typeof kidSchema>>({
        defaultValues: {},
        resolver: zodResolver(kidSchema),
    });

    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: () => fetch(`http://localhost:3000/kids/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gender: form.watch('gender'),
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
        mutation.mutate();
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

    useEffect(() => {
        form.setValue('gender', data.gender)
    }, [])

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
                                <Input placeholder="Nome" {...field} />
                            </FormControl>
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