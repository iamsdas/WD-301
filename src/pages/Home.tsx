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
  const currentUser = useContext(userContext);

  const fetchForms = useCallback(async () => {
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
        placeholder='Search Form'
        value={searchString}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
        className='w-full mb-4 border-2 border-gray-200 rounded-lg p-2  focus:outline-none focus:border-blue-500'
      />
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
