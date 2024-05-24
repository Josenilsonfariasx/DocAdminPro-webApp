import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom'; 
import ModalProfile from '../../components/ModalAlert/ModalAlert';

export default function UserProfileForm() {
  const user = localStorage.getItem('user-doc');
  const userDoc = user ? JSON.parse(user) : {};
  const navigate = useNavigate();
  const [email, setEmail] = useState(userDoc.email || '');
  const [name, setName] = useState(userDoc.name || '');
  const [open, setOpen] = useState(false)
  const newObj = {name:name, email:email} 
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='mt-10 w-9/12 mx-auto sm:mx-auto sm:w-full sm:max-w-sm '>
        <UserCircleIcon className="h-12 w-12 mx-auto text-gray-300 " aria-hidden="true" />
        <form className="space-y-6" >
          <div>
            <label htmlFor="email" className="block text-sm text-start font-medium leading-6 text-gray-900">
              Endereço de email
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm text-start font-medium leading-6 text-gray-900">
              Nome
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mb-2 flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
              onClick={(event) => {
                event.preventDefault();
                setOpen(true)
              }}
            >
              Atualizar
            </button>
          </div>
        </form>
      </div>
      <ModalProfile open={open} setOpen={setOpen} value={newObj}/>
    </>
  );
}
