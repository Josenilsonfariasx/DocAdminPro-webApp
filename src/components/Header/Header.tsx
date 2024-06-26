import {  useState } from 'react'
import logo from "../../assets/fabrica.png"
import { Dialog, Disclosure, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navi = useNavigate()

  return (
    <header className="bg-white fixed w-9/12 top-4 left-0 right-0 mx-auto mb-0">
      <nav className="mx-auto flex w-9/12 items-center justify-between gap-9" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src={logo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">

          <a href="/docs" className="text-sm font-semibold leading-6 text-gray-900 border-b-2 hover:text-amber-200">
            Documentos
          </a>
          <a href="/filter" className="text-sm font-semibold leading-6 text-gray-900 border-b-2 hover:text-amber-200">
            Buscas
          </a>
          <a href="/profile" className="text-sm font-semibold leading-6 text-gray-900 border-b-2 hover:text-amber-200">
            Perfil
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <div className="py-6">
                <a
                  href="#"
                  onClick={()=>{
                    localStorage.clear()
                    navi('/')
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-amber-200"
                >
                  Sair
                </a>
              </div>
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between w-full  ">
            <a href="/home" className="-m-1.5 p-1.5">
              <img
                className="h-10 w-auto"
                src={logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                </Disclosure>
                <a
                  href="/docs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-amber-200"
                >
                  Documentos
                </a>
                <a
                  href="/filter"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-amber-200"
                >
                  Filtros
                </a>
                <a
                  href="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-amber-200"
                >
                  Perfil
                </a>
              </div>
              <div className="py-6">
                <a
                  onClick={()=>{
                    localStorage.clear()
                    navi('/')
                  }}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-amber-200"
                >
                  Sair
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
