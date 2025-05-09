import Image from "next/image";

const DataNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Image className="h-[300px] w-[300px] " height={676} width={1200} src="https://i.postimg.cc/PJX8X2QK/46524b382087d63a209441765be9eb5b-removebg-preview.png" alt="gift" />
            <h3 className="text-[20px] font-semibold text-gray-500 mt-5 ml-3">You Have Not Added Any Book 🤔</h3>
        </div>
    );
};

export default DataNotFound;