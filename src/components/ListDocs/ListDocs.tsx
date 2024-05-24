import { MdOutlineDocumentScanner } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IDocs } from "../../types/docTypes";
import { useUserContext } from "../../providers/UserContext";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import EditFileNameModal from "../ModalEditDoc/ModalEditDoc";


interface Props {
  documents: IDocs[];
  visible: boolean;
}

export const ListDocs = ({documents, visible} : Props) => {
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const {deleteDocs} = useUserContext()

  return (
    <div className="md:max-w-7xl px-4 sm:pl-10">
      <ul role="list" className="max-w-6xl mx-auto mt-8 min-w-72">
        {documents.length === 0 && <p className="text-center text-gray-500">Nenhum documento encontrado</p>}
        {Array.isArray(documents) && documents.map((doc, index) => (
          <li key={index} className="flex flex-col sm:flex-row rounded-lg border bg-gray-50 justify-between items-start sm:items-center gap-4 sm:gap-x-6 py-2 mb-4 hover:border-gray-400 transition-colors">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto ml-4">
                <p className="text-sm font-semibold leading-6 text-gray-900">{doc.file_name}</p>
              </div>
            </div>
            <a  target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-0 shrink-0 sm:flex sm:flex-row sm:items-end pr-2">
              <button className="hover:border-gray-200" onClick={()=>{
                window.open(`http://localhost/api/users/storage/pdfs/${doc.file_name}`, "_blank");
              }}> <MdOutlineDocumentScanner color="orange"/> </button>
              <button className="hover:border-gray-200" onClick={()=>{
                deleteDocs(doc.id);
              }}> <MdDelete color="orange" /> </button>
              {visible? (
              <button className="hover:border-gray-200" onClick={() => setEditingDocId(doc.id)}><BsPencilSquare color="orange" /></button>
              ):null}
              {visible && editingDocId === doc.id && (
                <EditFileNameModal isOpen={true} onClose={() => setEditingDocId(null)} fileId={doc.id} fileName={doc.file_name} key={doc.id}/>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>  
  );
}
