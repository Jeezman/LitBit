import { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  XIcon,
  ChartSquareBarIcon,
  ReceiptTaxIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { BitcoinLogo } from '../../assets/icons';
import { useAuth } from '../../Auth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  let auth = useAuth();
  let navigate = useNavigate();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: ChartSquareBarIcon,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Payroll',
      href: '/dashboard/payroll',
      icon: ReceiptTaxIcon,
      current: location.pathname === '/dashboard/payroll',
    },
  ];

  const handleLogout = () => {
    auth.signout(() => {
      navigate('/,', { replace: true });
    });
  };

  return (
    <Fragment>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
          open={sidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 lb-blue-500 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transfrom"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-lb-blue-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only text-white">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src="" alt="Log" />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-lb-blue-800 text-white'
                          : 'text-lb-blue-200 hover:bg-lb-blue-600 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-lb-blue-200'
                            : 'text-lb-blue-300 group-hover:text-lb-blue-200',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              {/* <div className="flex-shrink-0 flex bg-lb-blue-600 p-4">
                <a
                  href={`http://twitter.com/${process.env.REACT_APP_TWITTER_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 group block"
                >
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src={`https://unavatar.io/twitter/${process.env.REACT_APP_TWITTER_USERNAME}`}
                        alt="Twitter avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">
                        @{process.env.REACT_APP_TWITTER_USERNAME}
                      </p>
                      <p className="text-sm font-medium text-lb-blue-300 group-hover:text-lb-blue-200">
                        Follow on Twitter
                      </p>
                    </div>
                  </div>
                </a>
              </div> */}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-lb-blue-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 text-lb-blue-200 w-20">
              <BitcoinLogo className="text-base" />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-lb-blue-800 text-white'
                      : 'text-lb-blue-200 hover:bg-lb-blue-600 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-lb-blue-200'
                        : 'text-lb-blue-300 group-hover:text-lb-blue-200',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex bg-lb-blue-600 p-4">
            <a
              href=""
              rel="noreferrer"
              className="flex-shrink-0 w-full group block"
              onClick={() => handleLogout()}
            >
              <div className="flex items-center">
                <LogoutIcon className="text-white h-8" />
                <div className="ml-3">
                  <p className="text-1xl font-medium text-lb-blue-200 group-hover:text-lb-blue-100">
                    Logout
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
