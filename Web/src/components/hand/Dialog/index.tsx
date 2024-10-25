import { Button } from "@/components/ui/button"
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface IDialogProps {
    title: string
    description: string
    buttonTriggerText?: string
    triggerElement?: React.ReactNode
    buttonCancelText?: string
    buttonConfirmText?: string
    component?: React.ReactNode
    isOpen?: boolean
    showTrigger?: boolean
    onConfirm: () => void
    onCancel: () => void
}

export function Dialog(
    {
        buttonTriggerText = "Abrir Modal", 
        onCancel, 
        buttonConfirmText = "Confirmar", 
        buttonCancelText = "Cancelar",
        onConfirm, 
        title, 
        description, 
        component,
        triggerElement,
        showTrigger = true,
        isOpen = false,
    }: IDialogProps
) {
  return (
    <ShadcnDialog open={isOpen} onOpenChange={onCancel}>
      {showTrigger && 
        <DialogTrigger asChild>
            {
                triggerElement
                ? triggerElement
                : <Button variant="outline">{buttonTriggerText}</Button>
            }
        </DialogTrigger>
      }
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {component}
        <DialogFooter>
          <Button onClick={onCancel}>
            {buttonCancelText}
          </Button>
          <Button onClick={onConfirm}>
            {buttonConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  )
}
