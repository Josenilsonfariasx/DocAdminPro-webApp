import React, { useContext, useState } from "react";
import { Api } from "../services/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ICreateUser, ILoginRequest, IUser, IuserEdir } from "../types/userTypes";
import { IDocs } from "../types/docTypes";

interface Props {
  children: React.ReactNode;
}

interface IUserContext {
  registerUser: (form: ICreateUser) => Promise<void>;
  login: (form: ILoginRequest) => Promise<void>;
  getDataForDashboard: () => Promise<void>;
  getDocsForUser: () => Promise<void>;
  getUserInSystem: () => Promise<void>;
  saveDocument: (file: File) => Promise<void>;
  deleteDocs: (id_doc: string) => Promise<void>;
  renameDocument: (name:string, id_doc: string) => Promise<void>;
  updatedUser: (obj:IuserEdir) => Promise<void>;
  SearchDocs: (searchTerm:string) => Promise<void>;
  forgotPass: (email:string) => Promise<void>;
  code: (email:string, code:string) => Promise<void>;
  resetPass: (email:string, password:string) => Promise<void>;
  user: IUser | null;
  chartData: { date: string; documentos: number }[];
  files: IDocs[]; 
  searchData: IDocs[]; 
  sizeDocs:  Number; 
}

export const UserContext = React.createContext<IUserContext>({
  registerUser: async () => {},
  login: async () => {},
  getDataForDashboard: async () => {},
  getDocsForUser: async () => {},
  getUserInSystem: async () => {},
  saveDocument: async () => {},
  deleteDocs: async () => {},
  updatedUser: async () => {},
  renameDocument: async () => {},
  SearchDocs: async () => {},
  forgotPass: async () => {},
  code: async () => {},
  resetPass: async () => {},
  chartData: [],
  files: [],
  searchData: [],
  user: null,
  sizeDocs: 0,
});

export const UserProvider: React.FC<Props> = ({ children }) => {
  const userStorageItem = localStorage.getItem("user-doc");
  const userStorage = userStorageItem ? JSON.parse(userStorageItem) : null;
  const [sizeDocs, setSizeDocs] = useState<number>(0);
  const [searchData, setSearch] = useState<IDocs[]>([]);
  const [user, setUser] = useState<IUser | null>(userStorage);
  const [files, setFiles] = useState<IDocs[]>([]);
  const [chartData, setChartData] = useState<{ date: string; documentos: number }[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const navi = useNavigate()
  let isTokenExpiredErrorHandled = false;

Api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!isTokenExpiredErrorHandled && error.response.data.errors === "Token Expired") {
      isTokenExpiredErrorHandled = true;
      localStorage.clear()
      navigate('/');
      toast.error('Sua sessão expirou. Por favor, faça login novamente.');
    }
    return Promise.reject(error);
  }
);


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
      toast.success("Cadastro concluído ✅");
      navi('/')
    } catch (error: any) {
      if (error.response.data.errors.email) {
        toast.warning("Este email já está em uso ❌");
        navigate("/register");
      }
    }
  };
  
  const getUserInSystem = async () => {
    try {
      const { data } = await Api.get("/users/");
      localStorage.setItem("users_", JSON.stringify(data.length));
    } catch (error) {
    }
  };

  const convertDataForChart = (data: { date: string; count: number }[]) => {
    return data.map((item) => ({
      date: new Date(item.date + "T00:00:00").toLocaleDateString("pt-BR", {
        month: "short",
        day: "numeric",
      }),
      documentos: item.count,
    }));
  };

  const getDataForDashboard = async () => {
    try {
      getDataForUser()
      const { data } = await Api.get(`/users/filter/docs/dash/${userStorage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const convertedData = convertDataForChart(data);
      const totalDocuments = convertedData.reduce((total, item) => total + item.documentos, 0);
      localStorage.setItem("docs", totalDocuments.toString());
      setChartData(convertedData);
      localStorage.setItem("dashboard", JSON.stringify(convertedData));
    } catch (error: any) {
    }
  };



  const getDataForUser = async() =>{
    try {
      const {data} = await Api.get(`/users/filter/${userStorage.id}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setSizeDocs(data.space_used);
      localStorage.setItem("size", JSON.stringify(data.space_used));
    } catch (error) {
    }
  }

  const getDocsForUser = async () => {
    try {
      const { data } = await Api.get(`/users/filter/docs/${userStorage.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const transformedData: IDocs[] = [...data.documents];
      setFiles(transformedData); 
    } catch (error: any) {
    }
  };

  const saveDocument = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);
    const fileMb = file.size / 1024 / 1024;
    const size_user = userStorage.space_used + fileMb;
    if(size_user > 2000){
      toast.error("Espaço insuficiente para salvar o documento ❌");
      return;
    }
    const response = await Api.post(`/doc/save/${userStorage.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    setFiles(prevFiles => [...prevFiles, response.data]);
    await getDocsForUser()
    setTimeout(() => {
      toast.info("Pode levar alguns segundos até que o documento seja digitalizado");
    }, 5000);

    if (response.data.rename) {
      toast.info("O arquivo foi renomeado pois ja existe um com este nome 🔄");
    } else {
      toast.success("Documento salvo com sucesso ✅");
    }

    setUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, space_used: prevUser.space_used + response.data.space_used };
      }
      return prevUser;
    });
    localStorage.setItem('docs', files.length.toString());
  } catch (error: any) {
    toast.error("Erro ao salvar o documento ❌");
  }
};

  const deleteDocs = async (id_doc:string)=>{
    try {
      const {data} = await Api.delete(`/doc/delete/${id_doc}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id_doc));
      toast.success("Documento deletado com sucesso ");
    } catch (error) {
    }
  }

  const renameDocument= async(name:string,id_doc:string)=>{
    try {
      const {data} = await Api.put(`/doc/edit/${id_doc}`,{
        new_name: name
      },{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      setFiles((prevFiles) => prevFiles.map((file) => {
        if(file.id === id_doc){
          return {...file, file_name: `${name}.pdf`}
        }
        return file;
      }));
      setSearch((prevFiles) => prevFiles.map((file) => {
        if(file.id === id_doc){
          return {...file, file_name: `${name}.pdf`}
        }
        return file;
      }
      ));
      toast.success("Documento renomeado com sucesso");
    } catch (error) {
    }
  }

  const updatedUser = async (obj:IuserEdir) => {
    try {
      const { data } = await Api.put(`/users/${userStorage.id}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.clear()
      toast.success('Atualização concluida')
      toast.success('Faça login apos mudar suas informações')
    } catch (error) {
    }
    }
    const SearchDocs = async(searchTerm:string)=>{
      try {
      const {data} = await Api.get(`/users/filter/docs/search/${user?.id}`, {
      params: {
        query: searchTerm
      },
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
        setSearch(data)
        getDocsForUser()
      } catch (error) {
      }
    }

    const forgotPass = async(email:string)=>{
      try {
      const data = await Api.post('/auth/password/', {
        email: email
      })
      if(!data){
        toast.error('Email nao encontrado')
      }
    } catch (error:any) {
      if(error.response == undefined){
        toast.success('Email Enviado Com sucesso')
        navi('/code')
        return
      }
      if(error.response.data.errors){
        toast.error('Email não encontrado')
      }
    }
  }

  const code = async(email:string, code:string)=>{
    try {
      const {data} = await Api.post('/auth/password/confirm', {
        email: email,
        code: code
      })
      toast.success('Codigo confirmado com sucesso')
      navi('/password')
    } catch (error:any) {
      if(error.response.data.errors == 'Invalid code.'){
        toast.error('Codigo invalido')
      }else if( error.response.data.errors == 'User not found.'){
        toast.error('Usuario nao encontrado')
      }else if(error.response.data.errors == "Token Expired."){
        toast.error('Token expirado')
      }
    }
  }


  const resetPass = async(password:string, email:string)=>{
    try {
      const {data} = await Api.post('/auth/password/reset', {
        email: email,
        password: password
      })
        toast.success('Senha alterada com sucesso')
        navi('/')
      } catch (error:any) {
        if(error.response.data.errors == 'User not found.'){
          toast.error('Usuario nao encontrado')
        }else if(error.response.data.errors == 'Request a new code.'){
          toast.error('Solicite um novo codigo')
        }
      }
    }

  return (
    <UserContext.Provider
      value={{
        code,
        resetPass,
        renameDocument,
        SearchDocs,
        updatedUser,
        deleteDocs,
        sizeDocs,
        registerUser,
        getDocsForUser,
        saveDocument,
        login,
        user,
        getDataForDashboard,
        chartData,
        getUserInSystem,
        files,
        forgotPass,
        searchData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
