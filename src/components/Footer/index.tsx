import { GitHub } from "react-feather";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 flex h-16 w-full items-center justify-between px-4">
      <p>
        Designed and developed by{" "}
        <a
          href="https://github.com/nullc0der"
          className="text-blue-600 underline"
        >
          Prasanta Kakati
        </a>{" "}
      </p>
      <div className="flex items-center">
        <GitHub size={14} />
        <a
          href="https://github.com/nullc0der/flexinotes"
          className="ml-2 text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </div>
    </footer>
  );
}
