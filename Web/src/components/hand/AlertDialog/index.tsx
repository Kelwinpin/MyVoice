import {
    AlertDialog as ShadcnAlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"


  interface IDialogProps {
    title: string
    description: string
    buttonTriggerText: string
    buttonCancelText?: string
    buttonConfirmText?: string
    isOpen: boolean
    onConfirm: () => void
    onClose: () => void
  }
   
  export function AlertDialog({ 
        title, 
        description, 
        onClose, 
        buttonTriggerText, 
        onConfirm, 
        buttonCancelText = "Cancelar", 
        buttonConfirmText = "Confirmar", 
        isOpen = false,
    }: IDialogProps) {

    return (
      <ShadcnAlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{buttonTriggerText}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>{buttonCancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>{buttonConfirmText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ShadcnAlertDialog>
    )
  }