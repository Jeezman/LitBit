import { useState, Fragment, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addNode } from '../../api';
import { Dialog, Transition } from '@headlessui/react'

export const Node = (props) => {
    const [host, setHost] = useState('');
    const [macaroon, setMacaroon] = useState('');
    const [cert, setCert] = useState('');
    const [pubKey, setPubKey] = useState('');
    const [open, setOpen] = useState(false)


    let navigate = useNavigate()
    let params = useParams();


    const handleAddNode = (e) => {
        e.preventDefault()
        let data = {
            host,
            cert,
            macaroon,
            publickey: pubKey,
        };

        addNode(params.id, data).then(res => {
            setOpen(true)
            setMacaroon("")
            setHost("")
            setCert("")
            setPubKey("")
            setTimeout(() => {
                navigate("/dashboard/payroll", { replace: true });
            }, 2000)
        })
    }


    return (
        <div className="pt-5">
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Register Node
            </h1>
            <h2 className="text-md text-gray-400">
                Register employee node details
            </h2>
            <section className="grid grid-cols-3 my-6">
                <aside className=" col-span-2">

                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
                        <h2 className="text-2xl font-semibold dark:text-gray-500 capitalize">Node details</h2>

                        <form onSubmit={handleAddNode}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="dark:text-gray-500" htmlFor="username">Host</label>
                                    <input required onChange={(e) => setHost(e.target.value)} id="host" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='127.0.0.1:10001' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="emailAddress">Cert (HEX)</label>
                                    <textarea required onChange={(e) => setCert(e.target.value)} id="cert" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='2d2d2d2d2d424547494e20434552544946494341544...' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="password">Macaroon (HEX)</label>
                                    <textarea required onChange={(e) => setMacaroon(e.target.value)} id="macaroon" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='0201036c6e6402f801030a10fe589c297ad5b3fb...' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="passwordConfirmation">Public Key</label>
                                    <textarea required onChange={(e) => setPubKey(e.target.value)} id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='02befa4d7455d284bdcb3a26b152cca84017e21...' />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                            </div>
                        </form>
                    </section>
                </aside>
                <aside className="flex justify-end items-start">
                    {/* <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div class="flex items-center justify-center w-12 bg-emerald-500">
                            <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                            </svg>
                        </div>

                        <div class="px-4 py-2 -mx-3">
                            <div class="mx-3">
                                <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                                <p class="text-sm text-gray-600 dark:text-gray-200">Your account was registered!</p>
                            </div>
                        </div>
                    </div> */}
                    <Example open={open} setOpen={setOpen} text="Node added!" />
                </aside>
            </section>

        </div>
    );
};




export function Example(props) {
    useEffect(() => {
        setTimeout(() => {
            props.setOpen(false)
        }, 2000)

    }, [props])

    return (
        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={props.setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    {/* <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child> */}
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex ">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto relative w-screen max-w-md">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="flex pt-6 pr-2 sm:-ml-10 sm:pr-4">
                                    </div>
                                </Transition.Child>
                                <div class="flex w-72 mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                                    <div class="flex items-center justify-center w-12 bg-emerald-500">
                                        <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                                        </svg>
                                    </div>

                                    <div class="px-4 py-2 -mx-3">
                                        <div class="mx-3">
                                            <span class="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                                            <p class="text-sm text-gray-600 dark:text-gray-200">{props.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}