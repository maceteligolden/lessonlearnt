"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFilePromptToOpenAI } from "@/lib/openaiClient";
import { useUploadReducer } from "@/hooks/useUploadReducer";
import FullScreenLoader from "./FullScreenLoader";
import ResponseDisplay from "./ResponseDisplay";
import { useRef } from "react";

export default function FileUploadForm({ onResult }: { onResult?: () => void }) {
  const [state, dispatch] = useUploadReducer();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    dispatch({ type: "START_LOADING" });

    try {
      const result = await sendFilePromptToOpenAI(file);
      dispatch({ type: "SET_RESPONSE", payload: result });
      onResult?.();
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-b from-white via-cyan-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Upload Your Project Issues
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Instantly convert project problems into actionable lessons.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Input
            type="file"
            ref={fileRef}
            className="w-full sm:w-auto max-w-sm border border-gray-300 dark:border-zinc-700 rounded-md px-4 py-2 bg-white dark:bg-zinc-800 text-sm text-gray-800 dark:text-white"
          />
          <Button
            onClick={handleSubmit}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Submit
          </Button>
        </div>

        {state.loading && (
          <div className="mt-10">
            <FullScreenLoader />
          </div>
        )}

        {!state.loading && (state.response || state.error) && (
          <div className="mt-12">
            <ResponseDisplay response={state.response} error={state.error} />
          </div>
        )}
      </div>
    </section>
  );
}
