import { useEffect, } from "react";
import { Card, LineChart } from "@tremor/react";
import Header from "../../components/Header/Header";
import { ProgressBarStorage } from "../../components/ProgressBar/ProgressBar";
import { useUserContext } from "../../providers/UserContext";

export const Dashboard = () => {
  const { chartData, getDataForDashboard, getUserInSystem, getDocsForUser, user, sizeDocs } = useUserContext();
  const documents = localStorage.getItem('docs');
  const users = localStorage.getItem('users_');

  useEffect(() => {
    getDocsForUser();
    getDataForDashboard();
    getUserInSystem();
  }, [location, user]);
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="bg-white w-full md:w-9/12 mx-auto px-4 md:px-44 text-start flex justify-between flex-wrap">
        <div>
          <p className="font-bold text-3xl">Dashboard</p>
          <p className="text-gray-400">Panorama geral dos seus dados</p>
        </div>
        <div className=""> 
          <p className="text-gray-400">Total de Arquivos enviados: {documents}</p>
        </div>
      </div>
      <div className="mx-auto flex w-full md:w-9/12 items-center justify-between gap-9 min-w-32">
        <LineChart
          className="mx-auto flex w-full md:w-9/12 items-start justify-start"
          data={chartData}
          index="date"
          categories={['documentos']}
          colors={['yellow']}
          yAxisWidth={30}
          showAnimation={true}
          connectNulls={true}
          aria-label="Gráfico de linhas de documentos enviados por dia"
        />
      </div>
      <div className="mx-auto mt-10 flex flex-wrap w-full md:w-9/12 items-center justify-between gap-8">
        <ProgressBarStorage value={sizeDocs}/>
        <Card className="mx-auto max-w-xs flex-col items-center">      
          <p className="text-center text-amber-400">Numero de Usuarios do Sistema: {users}</p>
        </Card>
      </div>
    </>
  );
};
