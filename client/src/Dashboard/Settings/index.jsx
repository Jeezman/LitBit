import { Link } from 'react-router-dom';
import { BalanceCard } from '../components/BalanceCard';
import { HistoryTable } from '../components/HistoryTable';

export const DashboardHome = () => {
  return (
    <main>
      <div className="flex">
        <BalanceCard />
      </div>
      <section className="">
        <aside className="pt-8 flex justify-between max-w-3xl">
          <div className=" text-3xl font-semibold">Payment History</div>

          <button
            type="button"
            class="py-2 px-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <Link to="payroll">Add Payroll</Link>
          </button>
        </aside>
        <HistoryTable />
      </section>
    </main>
  );
};
