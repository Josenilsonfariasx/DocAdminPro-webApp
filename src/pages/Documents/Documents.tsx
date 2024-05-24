import { useEffect, useState } from "react";
import { BiSolidFolderPlus } from "react-icons/bi";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../providers/UserContext";
import { ListDocs } from "../../components/ListDocs/ListDocs";
import { useLocation } from "react-router-dom";
import DeactivateAccountModal from "../../components/ModalCreateDoc/ModalCreate";

export const Documents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { getDocsForUser, files } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    const fetchDocs = async () => {
      await getDocsForUser();
    };

    fetchDocs();
  }, [location]);

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="max-w-6xl flex-col mx-auto text-start">
        <div className="bg-white w-full pl-10 flex justify-between">
          <div className="max-w-60">
            <p className="font-bold text-3xl">Documentos</p>
            <p>Numero de documentos: {files.length}</p>
          </div>
          <div className="mr-4 ">
            <button className="hover:border-gray-200" onClick={() => setModalOpen(true)}>
              <BiSolidFolderPlus color="orange" />
            </button>
          </div>
        </div>
        <ListDocs documents={files} visible={true}/>
      </div>
      <DeactivateAccountModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
