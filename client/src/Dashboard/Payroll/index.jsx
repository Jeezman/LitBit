import { useEffect, useState } from 'react';
import { createEmployee, getEmployees } from '../../api';
import { CreateEmployeeForm } from '../components/CreateEmployee';
import { PayrollList } from '../components/PayrollList';

export const Payroll = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('HOURLY');
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
      console.log('response from data creation is ', response);
      handleGetEmployees();
    });
  };

  useEffect(() => {
    console.log('fetching employees');
    handleGetEmployees();
  }, []);

  return (
    <div className="">
      {/* <h1>Payroll</h1> */}
      <section className="grid grid-cols-3">
        <aside className=" col-span-2">
          <PayrollList employees={employees} />
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
      {isOpen && (
        <CreateEmployeeForm
          setName={setName}
          setAmount={setAmount}
          setRate={setRate}
          handleFormSubmit={handleAddEmployees}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
