import React, { useState } from 'react';
import Modal from 'react-modal';
import { useUserContext } from '../../providers/UserContext';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

interface RenameFileModalProps {
  fileName: string;
  fileId: string;
  isOpen: boolean;
  onClose: () => void;
}

const RenameFileModal: React.FC<RenameFileModalProps> = ({ fileName, fileId, isOpen, onClose }) => {
  const [newFileName, setNewFileName] = useState(fileName);
  const {renameDocument} = useUserContext();
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFileName(event.target.value);
  };
const handleRename = async () => {
  let fileNameWithoutExtension = newFileName.replace(/\.pdf$/, '');
  if (fileNameWithoutExtension.trim() === "") {
    toast.warn('O campo não pode estar vazio');
    return;
  }
  if (fileNameWithoutExtension === fileName) {
    toast.warn('Você não pode colocar o mesmo nome que está no arquivo');
    return;
  }
  try {
    await renameDocument(fileNameWithoutExtension, fileId);
    onClose();
  } catch (error) {
    console.error("Erro ao renomear o arquivo:", error);
  }
};

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Renomear Arquivo"
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80"
        shouldCloseOnOverlayClick={true}
      >
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6 w-full max-w-md mx-auto">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Renomear Arquivo
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="newFileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Novo nome do arquivo
            </label>
            <input
              type="text"
              name="newFileName"
              id="newFileName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:amber-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder={fileName}
              value={newFileName}
              onChange={handleNameChange}
              required
            />
          </div>
          <button
            type="button"
            onClick={handleRename}
            className="w-full text-white bg-amber-400 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          >
            Renomear
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RenameFileModal;
