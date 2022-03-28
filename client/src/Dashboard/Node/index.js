import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { addNode } from '../../api';

export const Node = (props) => {
    const [host, setHost] = useState('');
    const [macaroon, setMacaroon] = useState('');
    const [cert, setCert] = useState('');
    const [pubKey, setPubKey] = useState('');


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
            navigate("/dashboard/payroll", { replace: true });
        })
    }


    return (
        <div className="">
            <h1>Register Node</h1>
            <section className="grid grid-cols-3">
                <aside className=" col-span-2">

                    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
                        <h2 className="text-2xl font-semibold dark:text-gray-500 capitalize">Node details</h2>

                        <form onSubmit={handleAddNode}>
                            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                <div>
                                    <label className="dark:text-gray-500" htmlFor="username">Host</label>
                                    <input onChange={(e) => setHost(e.target.value)} id="host" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='127.0.0.1:10001' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="emailAddress">Cert (HEX)</label>
                                    <textarea onChange={(e) => setCert(e.target.value)} id="cert" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='2d2d2d2d2d424547494e20434552544946494341544...' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="password">Macaroon (HEX)</label>
                                    <textarea onChange={(e) => setMacaroon(e.target.value)} id="macaroon" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='0201036c6e6402f801030a10fe589c297ad5b3fb...' />
                                </div>

                                <div>
                                    <label className="dark:text-gray-500" htmlFor="passwordConfirmation">Public Key</label>
                                    <textarea onChange={(e) => setPubKey(e.target.value)} id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  text-black dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" placeholder='02befa4d7455d284bdcb3a26b152cca84017e21...' />
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                            </div>
                        </form>
                    </section>
                </aside>
                <aside className=" py-5 flex justify-end items-start">
                    {/* <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        class="py-2 px-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        Add Employee Details
                    </button> */}
                </aside>
            </section>

        </div>
    );
};
