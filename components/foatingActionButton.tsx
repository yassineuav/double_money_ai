
 const FloatingActionButton = () => {
    return (
        <button className="flex fixed bottom-20  right-8 items-center justify-center w-10 h-10 font-medium bg-green-700 rounded-full">
        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
        </svg>
      </button>
      
    );
};

export default FloatingActionButton;
