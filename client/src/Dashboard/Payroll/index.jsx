import { useEffect, useState } from 'react';
import { getEmployees } from '../../api';
import { CreateEmployeeForm } from '../components/CreateEmployee';
import { PayrollList } from '../components/PayrollList';

export const Payroll = () => {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('fetching employees');
    getEmployees().then((response) => console.log('fetched ', response));
  }, []);

  return (
    <div className="">
      {/* <h1>Payroll</h1> */}
      <section className="grid grid-cols-3">
        <aside className=" col-span-2">
          <PayrollList />
        </aside>
        <aside className=" py-5 flex justify-end items-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            class="py-2 px-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Add Employee Details
          </button>
        </aside>
      </section>
      {isOpen && <CreateEmployeeForm />}
    </div>
  );
};
