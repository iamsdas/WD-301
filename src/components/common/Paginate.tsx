import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export default function Paginate(props: {
  count: number;
  page: number;
  setPageCB: (page: number) => void;
}) {
  return (
    <div className='bg-white px-4 py-3 flex items-center justify-between sm:px-2'>
      <div className='flex-1 flex justify-between sm:hidden'>
        <button
          disabled={props.page === 1}
          onClick={() => props.setPageCB(props.page - 1)}
          className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
          Previous
        </button>
        <button
          disabled={props.page * 4 >= props.count}
          onClick={() => props.setPageCB(props.page + 1)}
          className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
          Next
        </button>
      </div>
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <nav
            className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
            aria-label='Pagination'>
            <button
              disabled={props.page <= 1}
              onClick={() => props.setPageCB(props.page - 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </button>
            <button
              aria-current='page'
              onClick={() => props.setPageCB(1)}
              className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
              First
            </button>
            <div>
              <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-indigo-600 text-sm font-medium'>
                {props.page}
              </span>
              <button
                onClick={() => props.setPageCB(Math.ceil(props.count / 4))}
                className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                Last
              </button>
            </div>
            <button
              disabled={props.page * 4 >= props.count}
              onClick={() => props.setPageCB(props.page + 1)}
              className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
