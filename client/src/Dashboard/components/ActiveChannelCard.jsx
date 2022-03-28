import { commaify } from '../../utils/formatters';

export const ActiveChannelCard = (props) => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white box-content inline-block">
      <div className="flex items-center">
        <span className="rounded-xl relative p-4 bg-purple-100 text-4xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            data-v-4fa90e7f=""
            className="text-purple-800 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          >
            <path d="M3.5 8.5a1 1 0 011-1h8v2h-8a1 1 0 01-1-1v0zM14.5 7.5h5a1 1 0 011 1v0a1 1 0 01-1 1h-5v-2zM3.5 12.5a1 1 0 011-1h5v2h-5a1 1 0 01-1-1v0zM11.5 11.5h8a1 1 0 011 1v0a1 1 0 01-1 1h-8v-2zM3.5 16.5a1 1 0 011-1h11v2h-11a1 1 0 01-1-1v0zM17.5 15.5h2a1 1 0 011 1v0a1 1 0 01-1 1h-2v-2z"></path>
          </svg>
        </span>
        <p className="text-md text-black dark:text-gray-600 ml-2">
          Active channels
        </p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-700 dark:text-gray-800 text-4xl text-left font-bold mt-4">
          {commaify(props?.info?.numActiveChannels || 0)}
        </p>
      </div>
    </div>
  );
};
