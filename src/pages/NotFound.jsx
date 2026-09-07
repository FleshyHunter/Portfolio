import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-zinc-100 flex flex-col">
      <Nav />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 dark:text-zinc-500 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
