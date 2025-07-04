import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FlaskConical, BookOpen, Calculator, Home, User, CreditCard } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-3 h-12 w-12 overflow-hidden rounded-full bg-blue-600 flex items-center justify-center">
              <img 
                src="/images/inkwell-logo.jpeg" 
                alt="Inkwell Academy Labs Logo" 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    `;
                  }
                }}
              />
            </div>
            <Link href="/">
              <div className="flex flex-col cursor-pointer">
                <span className="font-bold text-2xl text-blue-900">Inkwell Academy</span>
                <span className="text-sm text-blue-600 font-medium tracking-wide">Labs</span>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start space-x-2 md:space-x-4">
              <li>
                <Link href="/">
                  <Button 
                    variant={isActive("/") ? "default" : "ghost"} 
                    className="flex items-center space-x-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Button>
                </Link>
              </li>

              {/* Science Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant={location.startsWith("/science") ? "default" : "ghost"}
                      className="flex items-center space-x-2"
                    >
                      <FlaskConical className="h-4 w-4" />
                      <span>Science</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/science">
                        <span>Science Labs</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/science/experiments">
                        <span>Experiments</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/science/ar">
                        <span>AR Experiments</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* English Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant={location.startsWith("/english") ? "default" : "ghost"}
                      className="flex items-center space-x-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>English</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/english">
                        <span>English Hub</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/english/reading">
                        <span>Reading</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/english/writing">
                        <span>Writing</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* Math Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant={location.startsWith("/math") ? "default" : "ghost"}
                      className="flex items-center space-x-2"
                    >
                      <Calculator className="h-4 w-4" />
                      <span>Math</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/math">
                        <span>Math Hub</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/math/algebra">
                        <span>Algebra</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/math/geometry">
                        <span>Geometry</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <Link href="/dashboard">
                  <Button 
                    variant={isActive("/dashboard") ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/subscribe">
                  <Button 
                    variant={isActive("/subscribe") ? "default" : "outline"}
                    className="flex items-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Subscribe</span>
                  </Button>
                </Link>
              </li>

              <li>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Register
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}