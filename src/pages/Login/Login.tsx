import logo from "../../assets/fabrica.png"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ValidationLogin } from "./ValidationLogin"
import { useUserContext } from "../../providers/UserContext"
import { ILoginRequest } from "../../types/userTypes"
import { Input } from "../../components/Input/Input"

export default function Login() {
    const {login} = useUserContext()
    const userStorage = localStorage.getItem('user-doc')
    const [loading, setLoading] = useState<boolean>(false)
    const navi = useNavigate()
    
    useEffect(()=>{
      if(userStorage){
        navi('/home')
      }
    })

    const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({
      resolver: zodResolver(ValidationLogin),
  })
  const submit = async(dataForm: object) => {
    const data = dataForm as ILoginRequest
    setLoading(true)
    await login(data)
    return setLoading(false)
}
const mapError = (error: any) => {
  if (typeof error === "string") {
    return { message: error };
  }
  if (error && error.message) {
    return error;
  }
};
return (
  <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-10 w-auto" src={logo} alt="Sua empresa" />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Faça Login na Sua Conta
              </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSubmit(submit)}>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Endereço de email
                      </label>
                      <div className="mt-2">
                          <Input id="email" type="email" {...register('email')} error={mapError(errors.email?.message)} />
                      </div>
                  </div>

                  <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-amber-400 hover:text-amber-200">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input id="password" type="password" {...register('password')} error={mapError(errors.password?.message)} />
              </div>
            </div>

                  <div>
                      <button
                          type="submit"
                          className="mb-2 flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-200"
                      >
                          {loading ? 'Carregando...' : 'Entrar'}
                      </button>
                  </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                  Nao tem conta cadastrada? cadastre-se clicando {' '}
                  <a href="/register" className="font-semibold leading-6 text-amber-400 hover:text-amber-200">
                      aqui
                  </a>
              </p>
          </div>
      </div>
  </>
);
}