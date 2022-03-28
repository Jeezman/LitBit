import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ListBox } from './Listbox';

export function CreateEmployeeForm(props) {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  const handleSetSelected = (e) => {
    console.log('e here is e', e);
    props.setRate(e.name);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.handleFormSubmit();
  };

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
                <div class="w-full max-w-sm p-3 m-auto ">
                  <h1 class="text-2xl font-semibold text-center dark:text-gray-500">
                    Add Payment Details
                  </h1>

                  <form onSubmit={handleFormSubmit} class="mt-6">
                    <div>
                      <label
                        for="username"
                        class="block text-sm dark:text-gray-500"
                      >
                        Name
                      </label>
                      <input
                        onChange={(e) => props.setName(e.target.value)}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div class="mt-4">
                      <div class="flex items-center justify-between">
                        <label
                          for="password"
                          class="block text-sm dark:text-gray-500"
                        >
                          Amount (in sats)
                        </label>
                      </div>

                      <input
                        onChange={(e) => props.setAmount(e.target.value)}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div class="mt-4">
                      <div class="flex items-center justify-between">
                        <label
                          for="password"
                          class="block text-sm dark:text-gray-500"
                        >
                          Payment schedule
                        </label>
                      </div>

                      <div className="relative">
                        <ListBox handleSetSelected={handleSetSelected} />
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
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
