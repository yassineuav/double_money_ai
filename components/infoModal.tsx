import { MessageType } from "@/types";

interface InfoModalProps {
    closeModal: () => void;
    info: MessageType; 
}

const InfoModal = ({ closeModal, info }:InfoModalProps ) => {
    return (
        <div id="popup-modal" tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-screen">
      <div className="bg-gray-800 rounded-lg shadow mx-4 w-full border border-gray-500">
        <div className="flex justify-end">
          <button
            type="button"
            className="text-white hover:text-gray-400"
            onClick={closeModal}
          >
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >    
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.293 10l-2.147 2.146a1 1 0 101.415 1.415L10.414 11l2.147 2.146a1 1 0 101.415-1.415L11.414 10l2.146-2.146a1 1 0 10-1.415-1.415L10.414 9l-2.147-2.146a1 1 0 10-1.415 1.415L9.414 10z"
                />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mb-1">
        { info.isSuccess ? (
            <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20 text-green-400">
              <path d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
            </svg>)  : (
            <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-16 h-16 text-yellow-500">
          <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
        </svg>
        )}
        </div>
        <h3 className="mx-4 mb-2 text-lg font-bold text-gray-100 ">{info.title}</h3>
        <p className="text-gray-300 m-4">{info.message}</p>
        
        <div className="flex justify-end my-2 mx-1">
         
         <button
            type="button"
            className="m-2 text-gray-200 bg-gray-700 rounded-lg border border-gray-500 text-sm font-medium px-2 py-1"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    );
  };
    

export default InfoModal
