import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getInfo, getTransactions } from '../../api';
import { BalanceCard } from '../components/BalanceCard';
import { HistoryTable } from '../components/HistoryTable';
import { ActiveChannelCard } from '../components/ActiveChannelCard';
import { PeersCard } from '../components/PeersCard';

let tnxs = [
  {
    id: 1,
    employeeId: 1,
    timeCreated: '2022-03-28T01:14:01.632Z',
    timePaid: '2022-03-28T01:14:01.721Z',
    isPaid: true,
    description: 'Transaction for employId MINUTES at 3/28/2022, 2:14:01 AM',
    paymentRequest:
      'lnbcrt120n1p3yzz7epp5yq3w33r7zu9k9zqu6xx8j0yh0v5hs6fpqwjsax3sw8faaea9c3uqdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5nnqwd9za3e9397z30nc3l7rkluaslrex46ug5nps4zwdu2t4u90q9qyyssqjug2ap3qc2k7fp6wq8zu0gejgf4sm39xpeedejtde0d6wx5lfaupykrkahufzcy589zcexhcmtgfta93nac2xvgqfy4w5230kw2xhvsprtrj24',
    paymentHash: 'ICLoxH4XC2KIHNGMeTyXeyl4aSEDpQ6aMHHT3uelxHg=',
    amount: 12,
  },
  {
    id: 2,
    employeeId: 1,
    timeCreated: '2022-03-28T01:15:01.798Z',
    timePaid: '2022-03-28T01:15:01.919Z',
    isPaid: false,
    description: 'Transaction for employId MINUTES at 3/28/2022, 2:15:01 AM',
    paymentRequest:
      'lnbcrt120n1p3yzrq4pp54twlp66z45fgzzh9mtgft9jqndn5y6fkeps579ws8rxv47va5c2sdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp50duxqwsxrnmvejjtxevnptkskr5mjg5fp645f9xtpsawtk8ntd9q9qyyssq9cfm8eaetyx5j2mjftds8eh8jwddgzzhq2xu6650th0vmxkq7zpkr08ga7tq534gp2epyzmw3rrnma2v06e47dfadydzuzrs79ehkrsqs5n6lv',
    paymentHash: 'qt3w60KtEoEK5drQlZZAm2dCaTbIYU8V0DjMyvmdphU=',
    amount: 12,
  },
  {
    id: 3,
    employeeId: 1,
    timeCreated: '2022-03-28T01:16:01.068Z',
    timePaid: '2022-03-28T01:16:01.473Z',
    isPaid: true,
    description: 'Transaction for employId MINUTES at 3/28/2022, 2:16:01 AM',
    paymentRequest:
      'lnbcrt120n1p3yzrz3pp5qgarhsx7e0het2vjwwug069dy680jktv9fs24qyxwfncnzf6jrksdqaf35hgsnfwssy6j2w242y25eq2pshjcqzpgxqzpusp5stxs9nudc9f8sgmyphpqy5jcw47ajmxunthpxj97at5mx3l4f9xq9qyyssqm3z0d7ez29k2zvwqzpsdkf5ry4xcn6u0wz9ufd2uphjff5m8zstqcy02acrsdz4dntmkqr27mal9fujqvzmpsq7t77wlmhj4avuz0yqpcja08r',
    paymentHash: 'Ajo7wN7L75WpknO4h+itJo75WWwqYKqAhnJniYk6kO0=',
    amount: 12,
  },
];

export const DashboardHome = () => {
  let [balance, setBalance] = useState('');
  let [info, setInfo] = useState('');
  let [transactions, setTransactions] = useState([...tnxs]);

  const handleGetInfo = () => {
    getInfo().then((res) => {
      let data = res.data;
      setBalance(data.balance);
      setInfo(data.info);
    });
  };

  const handleGetTransactions = () => {
    getTransactions().then((res) => {
      let data = res.data.data;

      setTransactions(data);
    });
  };

  useEffect(() => {
    handleGetInfo();
    handleGetTransactions();
    const intervalId = setInterval(() => {
      handleGetTransactions();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="pt-5">
      <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
        Hi there, admin
      </h1>
      <h2 class="text-md text-gray-400">
        Here&#x27;s what&#x27;s happening with your LitBit dashboard today.
      </h2>
      <div className="grid grid-cols-5 gap-4 my-6">
        <BalanceCard balance={balance} />
        <ActiveChannelCard info={info} />
        <PeersCard info={info} />
      </div>
      <section className="">
        <aside className="pt-8 flex justify-between max-w-5xl mb-5">
          <div className=" text-2xl font-semibold">Payment History</div>

          <button
            type="button"
            className="py-2 px-8 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <Link to="payroll">Add Payroll</Link>
          </button>
        </aside>
        <HistoryTable transactions={transactions} />
      </section>
    </main>
  );
};
