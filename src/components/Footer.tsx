import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-600">
        <div className="flex items-center space-x-3">
          <span>© {new Date().getFullYear()} Akwasi Nyarko</span>
          <span className="hidden sm:inline">• Built with React</span>
        </div>

        <div className="mt-3 sm:mt-0 flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/akwasinyarko"
            aria-label="LinkedIn"
            className="text-indigo-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/AkwasiNyarko"
            aria-label="GitHub"
            className="text-indigo-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;