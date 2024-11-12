import { LuPlus } from "react-icons/lu";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
const TableRow = () => {
    return (
        <tr>
            <td className='px-0 md:px-4 py-3'>
                <div className="w-full">
                    <div className="flex w-full overflow-hidden">
                        <Link href={"/#"}>
                            <div className="h-full w-16 sm:min-w-24 sm:w-24 hover:opacity-80 relative rounded">
                                <Image width={500} height={5000} className='object-contain rounded absolute h-full w-full inset-0 text-transparent' src="https://pathokpoint.com/_next/image?url=https%3A%2F%2Fpathokpoint.s3.ap-southeast-1.amazonaws.com%2Fbook%2F202-2057.jpg&w=1920&q=75" alt="" />
                            </div>
                        </Link>
                        <div className="flex flex-col ml-3">
                            <Link href={"/#"}>
                                <h1 className='font-semibold hover:underline'>বসন্ত কারাগারে বারোমাস<span className='ml-1 text-xs text-[rgb(54,55,57)] font-normal text-opacity-100'>(hardcover) </span> </h1>
                            </Link>
                            <h3 className="flex gap-x-1 items-center mt-1.5 text-xs text-[rgb(120,121,123)] font-bn">by <span>তৌহিদুর রহমান</span></h3>
                            <div className="mt-2">
                                <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                    Old good enough
                                </div>
                            </div>
                            <h3 className='mt-1.5 text-[rgb(242,33,58)] text-xs'>1 Items in stock</h3>
                        </div>
                    </div>
                </div>
            </td>
            <td className='px-0 md:px-4 py-3'>
                <div className="flex flex-col lg:flex-row md:justify-between gap-4">
                    <div className="flex lg:flex-col items-baseline justify-end lg:justify-center gap-1">
                        <div className="flex">
                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                            <span className='block text-sm'>90</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-end">
                            <button className='btn btn-xs bg-slate-200 rounded w-[30px] h-[30px]'>
                                <LuPlus />
                            </button>
                            <input className="text-center bg-slate-200 rounded text-xs w-[42px] h-[30px] mx-1 outline-none border-none" readOnly value="1" />
                            <button className='btn btn-xs bg-slate-200 rounded w-[30px] h-[30px]'>
                                <LuPlus />
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-5 lg:gap-7">
                            <div className="font-semibold text-secondary">
                                <div className="flex items-center">
                                    <TbCurrencyTaka className='text-lg -mr-0.5' />
                                    <span className='text-base'>90</span>
                                </div>
                            </div>
                            <div className="cursor-pointer text-gray-600 hover:text-gray-700">
                                <MdDeleteForever className='text-2xl' />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default TableRow;