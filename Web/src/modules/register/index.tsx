import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {Div, StyledForm} from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import activityTypeSchema from "@/schemas/IActivityType";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface RegisterProps {
    controller: string;   
}
  

export default function Register({controller = "TCC"}: RegisterProps) {
    const form = useForm<z.infer<typeof activityTypeSchema>>({
        defaultValues: {},
        resolver: zodResolver(activityTypeSchema),
    });

    const { toast } = useToast()


    // const query = useQuery({ queryKey: ['activityTypes'], queryFn: () => fetch(`http://localhost:3000/activityTypes`)
    //     .then(res => res.json())
    // })

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
            })
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

    return (
        <Div>
            <h1>Registro de {controller.toUpperCase()}</h1>
            <Form {...form}>
                <StyledForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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