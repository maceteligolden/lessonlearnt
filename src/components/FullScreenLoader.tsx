import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Loader2 className="animate-spin h-12 w-12 text-white" />
    </div>
  );
}
