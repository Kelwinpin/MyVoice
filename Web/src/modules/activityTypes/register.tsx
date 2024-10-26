import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import activityTypeSchema from "@/schemas/IActivityType";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { Div, StyledForm } from "./styles";
  

export default function Register({ onClose }: { onClose: () => void }) {
    const form = useForm<z.infer<typeof activityTypeSchema>>({
        defaultValues: {},
        resolver: zodResolver(activityTypeSchema),
    });

    const { toast } = useToast()

    const mutation = useMutation({
        mutationFn: () => fetch(`http://localhost:3000/activityTypes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.watch('name')
            })
        }).then(res => res.json()),
        onSuccess: () => {
            toast({
                variant: "success",
                title: "Success",
                description: "Activity Type created successfully",
                duration: 1000
            })
            setTimeout(() => onClose(), 2000)
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
                        name="name"
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