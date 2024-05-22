import React, { createContext, useContext, useState } from "react";
import { Api } from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ICreateUser, ILoginRequest, IUser} from "../types/userTypes";

interface Props {
  children: React.ReactNode;
}

interface IUserContext {
  registerUser: (form: ICreateUser) => Promise<void>;
  login: (form: ILoginRequest) => Promise<void>;
  user: IUser | null;
}

export const UserContext = React.createContext<IUserContext>({
  registerUser: async () => {},
  login: async () => {},
  user: null,
});

export const UserProvider:React.FC<Props> = ({ children }) => {
  const navi = useNavigate();
  const [user, setUser] = useState<IUser | null>(null)

  const login = async (form:ILoginRequest) => {
    try {
      const { data } = await Api.post("auth/login", form);
      const dataUser = data as IUser
      setUser(dataUser)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user-doc", JSON.stringify(data.user));
      navi("/home");
      toast.success("Login efetuado com sucesso ✅");
    } catch (error) {
      toast.warning("Email ou senha incorretos ❌");
    }
  };

  const registerUser = async (form:ICreateUser) => {
    try {
      const { data } = await Api.post("users/create", form);
      console.log(data)
      toast.success('Cadastro concluido ✅');
    } catch (error:any) {
      console.log(error.response.data.errors);
      if (error.response.data.errors.email) {
        toast.warning('Este email já está em uso ❌');
        navi("/register");
      }
    }
  };

  return (
    <UserContext.Provider value={{ registerUser, login, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
