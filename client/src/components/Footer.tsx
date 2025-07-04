import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons text-white text-3xl mr-2">science</span>
              <h2 className="font-roboto font-bold text-xl">Inkwell Labs</h2>
            </div>
            <p className="text-gray-400 mb-4">Bringing hands-on science education to South African classrooms through curriculum-aligned experiments.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="material-icons">youtube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-roboto font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Experiments</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade Levels</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Curriculum</span>
                </Link>
              </li>
              <li>
                <Link href="/subscription">
                  <span className="text-gray-400 hover:text-white">Subscribe</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Mobile App</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-roboto font-medium text-lg mb-4">Grade Levels</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 7</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 8</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 9</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 10</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 11</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-gray-400 hover:text-white">Grade 12</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-roboto font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2">email</span>
                <span className="text-gray-400">info@inkwellacademy.org</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2">phone</span>
                <span className="text-gray-400">+27714404293</span>
              </li>
              <li className="flex items-start">
                <span className="material-icons text-gray-400 mr-2">location_on</span>
                <span className="text-gray-400">Inkwell Labs, Pretoria, South Africa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Inkwell Labs. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/">
              <span className="text-gray-500 hover:text-white text-sm">Privacy Policy</span>
            </Link>
            <Link href="/">
              <span className="text-gray-500 hover:text-white text-sm">Terms of Service</span>
            </Link>
            <Link href="/">
              <span className="text-gray-500 hover:text-white text-sm">Cookie Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
