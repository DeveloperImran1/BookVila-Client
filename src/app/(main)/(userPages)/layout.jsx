import Sidebar from "@/components/profiles/Sidebar";


const layout = ({ children }) => {


    return (
        <div className='flex justify-between gap-2 container bg-bg-gray py-8'>
            <div className="w-[20%] ">

            <Sidebar></Sidebar>
            </div>
            <div className="w-[78%] ">
                {children}
            </div>
        </div>
    );
};

export default layout;