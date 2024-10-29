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
import parentSchema from "@/schemas/IParent";
  

export default function Register({ onClose }: { onClose: () => void }) {
    const form = useForm<z.infer<typeof parentSchema>>({
        defaultValues: {},
        resolver: zodResolver(parentSchema),
    });

    const { toast } = useToast()

    const mutation = useMutation({
        mutationFn: () => fetch(`http://localhost:3000/parents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: form.watch('userName'),
                role: form.watch('role')
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

    return (
        <Div>
            <Form {...form}>
                <StyledForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" ref={modalRef}>
                    <FormField
                        control={form.control}
                        name="userName"
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
                     <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Atividade</FormLabel>
                                <FormControl>
                                    <Input placeholder="Papel" {...field} />
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