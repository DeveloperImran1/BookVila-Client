import TableRow from "./TableRow";

const LeftSide = () => {
    return (
        <div className='bg-white w-full p-4 sm:p-6 md:p-7 lg:p-10'>
            <h1 className="text-sm sm:text-xl font-inter font-semibold">My cart</h1>
            <div className="mt-3 sm:mt-5 md:mt-6 lg:mt-8 overflow-scroll">
                <table className='table table-px-0 border-t'>
                    <tbody>
                        {[1, 2,1,1,1,1,1,].map((item, index) => (
                            <TableRow key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeftSide;