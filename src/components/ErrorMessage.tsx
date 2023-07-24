import { AlertCircle } from "lucide-react";

interface Props {
  message?: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="p-4 rounded-full  bg-red-50">
        <AlertCircle size={24} className="text-red-600" />
      </div>
      <p className="text-gray-500">{message || "Something went wrong"}</p>
    </div>
  );
}
