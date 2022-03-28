import { commaify } from '../../utils/formatters';

export const BalanceCard = (props) => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white box-content inline-block">
      <div className="flex items-center">
        <span className="rounded-xl relative p-4 bg-purple-100 text-4xl">
          {/* <svg
            width="40"
            fill="currentColor"
            height="40"
            className="text-purple-500 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-4fa90e7f=""><rect width="17" height="6" x="3.5" y="9" rx="3"></rect><path d="M5.5 12a1 1 0 011-1H13v2H6.5a1 1 0 01-1-1v0zM15 11h2.5a1 1 0 011 1v0a1 1 0 01-1 1H15v-2z"></path></svg>
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-purple-800 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            data-v-4fa90e7f=""
            width="40"
            height="40"
          >
            <rect width="17" height="6" x="3.5" y="9" rx="3"></rect>
            <path d="M5.5 12a1 1 0 011-1H13v2H6.5a1 1 0 01-1-1v0zM15 11h2.5a1 1 0 011 1v0a1 1 0 01-1 1H15v-2z"></path>
          </svg>
        </span>
        <p className="text-md text-black dark:text-gray-600 ml-2">Balance</p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-700 dark:text-gray-800 text-4xl text-left font-bold mt-4">
          <span className="text-sm inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              data-v-4fa90e7f=""
              className="h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.037 19.26a7.43 7.43 0 004.578-.22 7.489 7.489 0 003.6-2.86 7.59 7.59 0 001.259-4.443 7.556 7.556 0 00-1.54-4.308 7.551 7.551 0 00-3.787-2.622 7.462 7.462 0 00-2.185-.323c-2.433 0-4.086.92-5.37 2.362-1.11 1.249-1.54 2.783-1.54 3.965 0 3.462 3.315 5.704 6.736 5.704 1.527 0 2.948-1 2.948-2.179 0-3.26-5.632-1.813-5.632-4.628 0-1.234 1.173-2.222 2.687-2.222 1.513 0 2.56.9 2.732 1.686"
              ></path>
            </svg>
          </span>
          {commaify(props.balance)}
        </p>
      </div>
    </div>
  );
};
