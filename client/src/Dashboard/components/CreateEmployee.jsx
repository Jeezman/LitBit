import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ListBox } from './Listbox';

export function CreateEmployeeForm() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8  text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title> */}

                <div class="w-full max-w-sm p-3 m-auto ">
                  <h1 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">
                    Employee Details
                  </h1>

                  <form class="mt-6">
                    <div>
                      <label
                        for="username"
                        class="block text-sm text-gray-800 dark:text-gray-200"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div class="mt-4">
                      <div class="flex items-center justify-between">
                        <label
                          for="password"
                          class="block text-sm text-gray-800 dark:text-gray-200"
                        >
                          Amount
                        </label>
                        {/* <a
                          href="#"
                          class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                        >
                          Forget Password?
                        </a> */}
                      </div>

                      <input
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div class="mt-4">
                      <div class="flex items-center justify-between">
                        <label
                          for="password"
                          class="block text-sm text-gray-800 dark:text-gray-200"
                        >
                          Payment schedule
                        </label>
                        {/* <a
                          href="#"
                          class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
                        >
                          Forget Password?
                        </a> */}
                      </div>

                      {/* <input
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      /> */}
                      {/* <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        <option>HOURLY</option>
                        <option>DAILY</option>
                        <option>WEEKLY</option>
                        <option>MONTHLY</option>
                      </select> */}
                      <div className="relative">
                        <ListBox />
                      </div>
                    </div>

                    <div class="mt-6 z-0">
                      <button
                        onClick={closeModal}
                        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      >
                        Submit
                      </button>
                    </div>
                  </form>

                  {/* <div class="flex items-center justify-between mt-4">
                    <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                    <a
                      href="#"
                      class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or login with Social Media
                    </a>

                    <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                  </div> */}

                  {/* <div class="flex items-center mt-6 -mx-2">
                    <button
                      type="button"
                      class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                    >
                      <svg
                        class="w-4 h-4 mx-2 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
                      </svg>

                      <span class="hidden mx-2 sm:inline">
                        Sign in with Google
                      </span>
                    </button>

                    <a
                      href="#"
                      class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200"
                    >
                      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
                      </svg>
                    </a>
                  </div> */}

                  {/* <p class="mt-8 text-xs font-light text-center text-gray-400">
                    {' '}
                    Don't have an account?{' '}
                    <a
                      href="#"
                      class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
                    >
                      Create One
                    </a>
                  </p> */}
                </div>

                {/* <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
