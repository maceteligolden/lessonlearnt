"use client";
import FileUploadForm from "@/components/FileUploadForm";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [showUploaderFull, setShowUploaderFull] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const uploadRef = useRef<HTMLDivElement | null>(null);

  const handleCTAClick = () => {
    setShowUploaderFull(true);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
   <div className="flex flex-col min-h-screen bg-slate-900 text-white font-sans">
      {/* Hero Section */}
      <header className="bg-slate-900 px-6 pt-24 pb-12 md:px-12 md:pt-32 text-center relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              From Project Issues to <span className="text-cyan-400">Lessons Learned</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8">
              Upload your project issues and receive smart, structured lessons that offer real insights.
              Get a downloadable PDF report in seconds.
            </p>
            <Button onClick={handleCTAClick} size="lg" className="text-lg bg-cyan-500 hover:bg-cyan-600">
              Try for Free
            </Button>
          </div>
          <div className="hidden md:block">
            <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-2xl text-black">
              <h2 className="text-xl font-bold text-center mb-4 text-cyan-800">Quick Upload</h2>
              <FileUploadForm  />
            </div>
          </div>
        </div>
      </header>

      {/* Upload Section */}
      <main
        id="upload"
        ref={uploadRef}
        className="relative z-10 w-full bg-gradient-to-br from-cyan-900 to-blue-800 px-4 sm:px-8 md:px-16 border-t border-blue-700 shadow-inner py-16"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showUploaderFull ? 'full' : 'default'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full flex items-center justify-center"
          >
            <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow-2xl text-black">
              <h2 className="text-2xl font-bold text-center mb-6 text-cyan-800">Upload Your File</h2>
              <FileUploadForm  />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Features Section */}
      <section className="bg-slate-800 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Why You’ll Love It</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">🔍 Clear, Concise Insights</h3>
              <p className="text-gray-300">
                Your issues become actionable lessons, ideal for retrospectives, knowledge sharing, and strategic improvement.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">📄 Beautiful PDF Reports</h3>
              <p className="text-gray-300">
                Receive a downloadable PDF formatted with professional HTML styling—perfect for reports and record keeping.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">⚡ Fast and Intuitive</h3>
              <p className="text-gray-300">
                Upload your file, wait seconds, and get high-quality outputs—no complex forms or signups required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">🔐 Private & Secure</h3>
              <p className="text-gray-300">
                Your data is never stored or shared. Processed only temporarily for your session.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button onClick={handleCTAClick} className="bg-cyan-500 hover:bg-cyan-600">
              Start Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 text-center py-8 px-6">
        <p>© {new Date().getFullYear()} LessonsLearned.ai</p>
        <p className="text-sm mt-2">Empowering better projects through reflection and intelligence.</p>
      </footer>
    </div>
  );
}
