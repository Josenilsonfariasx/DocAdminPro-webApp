import React, { useContext, useState } from "react";
import { Api } from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ICreateUser, ILoginRequest, IUser } from "../types/userTypes";
interface Props {
  children: React.ReactNode;
}

interface IUserContext {
  registerUser: (form: ICreateUser) => Promise<void>;
  login: (form: ILoginRequest) => Promise<void>;
  getDataForDashboard: () => Promise<void>;
  getUserInSystem: ()=> Promise<void>;
  user: IUser | null;
  chartData: { date: string, documentos: number }[];
}

export const UserContext = React.createContext<IUserContext>({
  registerUser: async () => {},
  login: async () => {},
  getDataForDashboard: async () => {},
  getUserInSystem: async () => {},
  user: null,
  chartData: [],
});

export const UserProvider: React.FC<Props> = ({ children }) => {
  const userStorageItem = localStorage.getItem('user-doc');
  const userStorage = userStorageItem ? JSON.parse(userStorageItem) : null;
  const [user, setUser] = useState<IUser | null>(userStorage);
  const [chartData, setChartData] = useState<{ date: string, documentos: number }[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const login = async (form: ILoginRequest) => {
    try {
      const { data } = await Api.post("auth/login", form);
      const dataUser = data as IUser;
      setUser(dataUser);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user-doc", JSON.stringify(data.user));
      toast.success("Login efetuado com sucesso ✅");
      navigate("/home");
    } catch (error: any) {
      toast.warning(error);
      toast.warning("Email ou senha incorretos ❌");
    }
  };

  const registerUser = async (form: ICreateUser) => {
    try {
      const { data } = await Api.post("users/create", form);
      console.log(data);
      toast.success('Cadastro concluido ✅');
    } catch (error: any) {
      console.log(error.response.data.errors);
      if (error.response.data.errors.email) {
        toast.warning('Este email já está em uso ❌');
        navigate("/register");
      }
    }
  };

  const convertDataForChart = (data: { date: string; count: number }[]) => {
    return data.map(item => ({
      date: new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
      documentos: item.count,
    }));
  };

  const getDataForDashboard = async () => {
    try {
      const { data } = await Api.get(`/users/filter/docs/dash/${userStorage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const convertedData = convertDataForChart(data);
      const totalDocuments = convertedData.reduce((total, item) => total + item.documentos, 0);
      localStorage.setItem("docs", totalDocuments.toString());
      setChartData(convertedData);
      localStorage.setItem("dashboard", JSON.stringify(convertedData));
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUserInSystem = async() =>{
    try {
      const {data} = await Api.get('/users/');
      localStorage.setItem('users_', JSON.stringify(data.length));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider value={{ registerUser, login, user, getDataForDashboard, chartData, getUserInSystem }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
