"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFilePromptToOpenAI } from "@/lib/openaiClient";
import { useUploadReducer } from "@/hooks/useUploadReducer";
import FullScreenLoader from "./FullScreenLoader";
import ResponseDisplay from "./ResponseDisplay";
import { useRef } from "react";

export default function FileUploadForm() {
  const [state, dispatch] = useUploadReducer();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    dispatch({ type: "START_LOADING" });

    try {
      const result = await sendFilePromptToOpenAI(file);
  
      dispatch({ type: "SET_RESPONSE", payload: result });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
      <div className="flex space-x-2">
        <Input type="file" ref={fileRef} className="w-64" />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>

      {state.loading && <FullScreenLoader />}
      {!state.loading && (state.response || state.error) && (
        <div className="mt-24 w-full flex justify-center">
          <ResponseDisplay
            response={state.response}
            error={state.error}
          />
        </div>
      )}
    </div>
  );
}
