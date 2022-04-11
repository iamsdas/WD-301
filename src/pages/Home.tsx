import { Link, navigate, useQueryParams } from 'raviger';
import { useEffect, useState, useCallback, useContext } from 'react';
import Modal from '../components/common/Modal';
import CreateForm from '../components/CreateForm';
import { listForms, userContext } from '../utils';
import Paginate from '../components/common/Paginate';

export const saveLocalForms = (localForms: IFormData[]) => {
  localStorage.setItem('forms', JSON.stringify(localForms));
};

const FormList = () => {
  const [forms, setForms] = useState<IFormItem[]>(() => []);
  const [{ search, page }, setQuery] = useQueryParams();
  const [newForm, setNewForm] = useState(false);
  const [searchString, setSearchString] = useState(search ?? '');
  const [pageNum, setPageNum] = useState(page ?? 1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = useContext(userContext);

  const fetchForms = useCallback(async () => {
    setLoading(true);
    try {
      const response: IPaginated<IFormItem> = await listForms({
        offset: (page - 1) * 4,
        limit: 4,
      });
      setForms(response.results);
      setCount(response.count);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [page, setCount]);

  const addNewForm = () => {
    setNewForm(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery({ search: searchString, page: pageNum });
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [pageNum, searchString, setQuery]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  return (
    <div>
      <input
        type='text'
        aria-label='search'
        placeholder='Search Form'
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        className='w-full mb-4 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
      />
      {loading ? (
        <div className='flex w-full justify-center items-center py-6'>
          <svg
            aria-hidden='true'
            role='status'
            className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-300'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'></path>
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'></path>
          </svg>
        </div>
      ) : (
        <div className='divide-y-2 border-y-2 mb-2'>
          {forms.length > 0 ? (
            forms
              .filter((form) =>
                form.title.toLowerCase().includes(search?.toLowerCase() || '')
              )
              .map((form) => (
                <div
                  className='flex justify-between items-center py-2'
                  key={form.id}>
                  <Link href={`/preview/${form.id}`}>
                    <div className='flex flex-col'>
                      <div className='text-lg hover:text-blue-600'>
                        {form.title}
                      </div>
                      {/* <div className='text-gray-500 text-sm'>{`${form.formFields.length} quizes`}</div> */}
                    </div>
                  </Link>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => {
                        navigate(`/form/${form.id}`);
                      }}
                      disabled={!currentUser || !currentUser?.username}
                      className='border-blue-500 border-2 hover:border-blue-700 text-blue-500 hover:text-blue-700 disabled:text-gray-300 disabled:border-gray-300 text-md py-1 px-2 rounded-lg items-center font-semibold'>
                      Edit
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className='text-center py-4 capitalize'>No Forms</div>
          )}
        </div>
      )}
      <div className='capitalize flex pt-1 items-center justify-between'>
        <button
          onClick={addNewForm}
          disabled={!currentUser || !currentUser?.username}
          className='border-blue-500 border-2 hover:border-blue-700 disabled:border-gray-300 text-blue-500 hover:text-blue-700 disabled:text-gray-300 text-md py-1 px-2 rounded-lg items-center font-semibold'>
          New Form
        </button>
        <Paginate
          count={count}
          page={parseInt(page)}
          setPageCB={(page) => setPageNum(page)}
        />
      </div>
      <Modal open={newForm} closeModalCB={() => setNewForm(false)}>
        <CreateForm></CreateForm>
      </Modal>
    </div>
  );
};

export default FormList;
