import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Logo with image */}
          <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
            <img 
              src="/images/inkwell-logo.jpeg" 
              alt="Inkwell Labs Logo" 
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                // Add a simple SVG or icon if needed
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  // Create element safely instead of using innerHTML
                  const iconSpan = document.createElement('span');
                  iconSpan.className = 'material-icons text-navy text-3xl';
                  iconSpan.textContent = 'science';
                  parent.appendChild(iconSpan);
                }
              }}
            />
          </div>
          <Link href="/">
            <div className="flex flex-col cursor-pointer">
              <span className="font-roboto font-bold text-2xl text-navy">Inkwell Academy</span>
              <span className="font-roboto text-xs text-gold-dark font-medium tracking-wide">Labs</span>
            </div>
          </Link>
        </div>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-4 md:space-x-6">
            <li>
              <Link href="/">
                <span className="font-roboto font-medium text-navy">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/science">
                <span className="font-roboto font-medium text-darkText hover:text-navy">Science</span>
              </Link>
            </li>
            <li>
              <Link href="/english">
                <span className="font-roboto font-medium text-darkText hover:text-navy">English</span>
              </Link>
            </li>
            <li>
              <Link href="/math">
                <span className="font-roboto font-medium text-darkText hover:text-navy">Math</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <span className="font-roboto font-medium text-darkText hover:text-navy">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/subscribe">
                <span className="font-roboto font-medium text-darkText hover:text-navy">Subscribe</span>
              </Link>
            </li>
            <li className="ml-2">
              <Link href="/register">
                <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white rounded-full px-4 py-2 font-roboto font-medium">
                  Register
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
