import { Link, useLocation } from 'react-router-dom';
import {  ChevronRightIcon, HomeIcon} from "lucide-react"

const Breadcrumb = () => {
  const location = useLocation();
  // A simple static example. A real app would generate this dynamically.
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-400 hover:text-gray-500">
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name}>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <Link to={routeTo} className={`ml-2 text-sm font-medium ${isLast ? 'text-gray-800' : 'text-gray-500 hover:text-gray-700'}`} aria-current={isLast ? 'page' : undefined}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;