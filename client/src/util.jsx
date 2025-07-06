import {toast} from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg,{
    position: 'top-right'
    })
}
export const handleError = (msg) => {
    toast.error(msg, {
    position: 'top-right'
    })
}

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}