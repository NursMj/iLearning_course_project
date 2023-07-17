import { toast } from "react-toastify"

export const showErrorToast = (e : any) => {
    const message = e.response ? e.response.data.message : e.message
    toast.error(message, {autoClose: false})
}

export const showSuccessToast = (message: string) => {
    toast.success(message, {autoClose: 1500})
}

export const showInfoToast = (message: string) => {
    toast.info(message, {autoClose: 1500})
}