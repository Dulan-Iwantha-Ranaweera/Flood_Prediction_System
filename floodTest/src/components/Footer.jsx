function Footer() {
    return(
<div>

<footer className="  bg-black">
      <div className="py-6 border-t border-gray-200 dark:border-neutral-700 flex justify-center gap-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-xs text-gray-600 dark:text-neutral-400">
              © 2025 Kalu A Ranaweera. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap items-center">
            <li className="inline-block pe-4 text-xs">
              <a
                className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
                href="https://github.com/Dulan-Iwantha-Ranaweera"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>

</div>
    )
}
export default Footer;