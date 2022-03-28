import { useEffect, useState } from 'react';
import { createEmployee, getEmployees } from '../../api';
import { CreateEmployeeForm } from '../components/CreateEmployee';
import { PayrollList } from '../components/PayrollList';

export const Payroll = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('MINUTES');
  const [pubKey, setPubKey] = useState('hgkwerwqjhgkj');

  const handleGetEmployees = () => {
    getEmployees().then((response) => {
      let data = response.data.data || [];
      let sortedData = data.sort((a, b) => b?.id - a?.id);
      setEmployees(sortedData);
    });
  };

  const handleAddEmployees = () => {
    let data = {
      name,
      payInSatoshi: amount,
      paymentScheduleRate: rate,
      publicKey: pubKey,
    };
    createEmployee(data).then((response) => {
      handleGetEmployees();
    });
  };

  useEffect(() => {
    handleGetEmployees();
  }, []);

  return (
    <div className="pt-5">
      <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
        Hi there, admin
      </h1>
      <h2 class="text-md text-gray-400">
        Here&#x27;s what&#x27;s happening with your LitBitPay dashboard today.
      </h2>
      <section className="grid grid-cols-3">
        <aside className=" col-span-2">
          <PayrollList employees={employees} />
        </aside>
        <aside className=" py-5 flex justify-end items-start mr-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            class="py-2 px-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Add Employee Details
          </button>
        </aside>
      </section>
      {isOpen && (
        <CreateEmployeeForm
          setName={setName}
          setAmount={setAmount}
          setRate={setRate}
          handleFormSubmit={handleAddEmployees}
          setIsOpen={setIsOpen}
          name={name}
          amount={amount}
        />
      )}
    </div>
  );
};
