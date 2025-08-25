import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "If I have seen further it is by standing on the shoulders of Giants.", author: "Isaac Newton" },
  { text: "What we know is a drop, what we don’t know is an ocean.", author: "Isaac Newton" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
];

const COLORS = [
  "#0ea5e9", // sky
  "#22c55e", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#e11d48", // rose
  "#10b981", // emerald
  "#3b82f6", // blue
  "#f97316", // orange
];

function pickRandom(arr, excludeIndex = -1) {
  if (!arr.length) return undefined;
  let i = Math.floor(Math.random() * arr.length);
  if (arr.length > 1 && i === excludeIndex) {
    i = (i + 1) % arr.length;
  }
  return [arr[i], i];
}

export default function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [colorIndex, setColorIndex] = useState(() => Math.floor(Math.random() * COLORS.length));

  const current = QUOTES[quoteIndex];
  const color = COLORS[colorIndex];

  // Compute tweet URL whenever quote changes
  const tweetHref = useMemo(() => {
    const text = `"${current.text}" — ${current.author}`;
    const url = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(text)}`;
    return url;
  }, [quoteIndex]);

  // Change document background and smooth transition
  useEffect(() => {
    document.body.style.transition = "background 500ms ease";
    document.body.style.background = color;
  }, [colorIndex]);

  const nextQuote = () => {
    const [, nextQ] = pickRandom(QUOTES, quoteIndex) || [];
    const [, nextC] = pickRandom(COLORS, colorIndex) || [];
    if (typeof nextQ === "number") setQuoteIndex(nextQ);
    if (typeof nextC === "number") setColorIndex(nextC);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "transparent" }}>
      {/* Card */}
      <motion.div
        id="quote-box"
        className="w-full max-w-xl rounded-2xl shadow-2xl p-8 bg-white/95 backdrop-blur-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ borderTop: `6px solid ${color}` }}
      >
        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={quoteIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="space-y-4"
          >
            <p id="text" className="text-2xl leading-snug font-semibold text-slate-900">
              “{current.text}”
            </p>
            <footer id="author" className="text-right text-slate-600">— {current.author}</footer>
          </motion.blockquote>
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <a
            id="tweet-quote"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 transition"
            href={tweetHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Tweet this quote"
            title="Tweet this quote"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 7.5v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
            Tweet
          </a>

          <button
            id="new-quote"
            onClick={nextQuote}
            className="ml-auto rounded-xl px-5 py-2.5 font-medium text-white shadow hover:shadow-md transition"
            style={{ background: color }}
          >
            New Quote
          </button>
        </div>

        {/* Tiny helper line to visually match theme */}
        <div className="mt-6 h-1 w-full rounded-full" style={{ background: color, opacity: 0.2 }} />
      </motion.div>
    </div>
  );
}
