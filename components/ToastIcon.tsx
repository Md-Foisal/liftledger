import { Check, X } from "lucide-react";

// round icon for toasts: green tick for success, red cross for error
export default function ToastIcon({ type }: { type: "success" | "error" }) {
  const isSuccess = type === "success";
  return (
    <span
      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-white ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {isSuccess ? <Check size={12} strokeWidth={3.5} /> : <X size={12} strokeWidth={3.5} />}
    </span>
  );
}
