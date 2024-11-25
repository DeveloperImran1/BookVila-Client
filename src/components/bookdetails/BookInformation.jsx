"use client"
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const BookInformation = ({ book }) => {

    console.log("book information theke book", book)
    const axiosPublic = useAxiosPublic()
    const { data: writer = {} } = useQuery({
        queryKey: ['writerDetail', book?.authorInfo?.authorID],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getSingleWriter/${book?.authorInfo?.authorID}`)

            return res?.data[0]
        }
    })
    console.log("writer info", writer)


    return (
        <div className='mt-7'>
            <Tabs className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 " >
                <TabList>
                    <Tab><h2 className="text-base font-semibold">Summary</h2></Tab>
                    <Tab><h2 className="text-base font-semibold">Author </h2></Tab>
                </TabList>

                <TabPanel>
                    <div className="">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">{book?.bookName?.[0]}</h2>
                        <h2 className='text-sm text-gray-800 text-start mb-2'>by <Link className='hover:underline text-primary' href={`/writer/${book?.authorInfo?.authorID}`}>{book?.authorInfo?.name?.[0]}</Link></h2>
                        <h2 className='text-sm my-4 text-gray-800 text-start mb-2'>{book?.description || "No description for this book"}</h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>

                                </thead>
                                <tbody>
                                    <tr className="border-b transition duration-200">

                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">লেখক</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.authorInfo?.name?.[0] || 'Not Mention'}</td>

                                    </tr>
                                    <tr className="border-b transition duration-200">

                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">প্রকাশনী</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.publisher || "Not Mention"}</td>

                                    </tr>
                                    <tr className="border-b transition duration-200">

                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">বিষয়</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.subject?.[0] || 'Not Mention'}</td>

                                    </tr>
                                    <tr className="border-b transition duration-200">
                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">সংস্করণ</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.edition || 'Not Mention'}</td>
                                    </tr>

                                    <tr className="border-b transition duration-200">
                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">কভার</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.binding || 'hardcover'}</td>
                                    </tr>

                                    <tr className="border-b transition duration-200">
                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">ভাষা</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.language || 'বাংলা'}</td>
                                    </tr>

                                    <tr className="border-b transition duration-200">
                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">Book ID</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.bookID || 'Id not found'}</td>
                                    </tr>

                                    <tr className="border-b transition duration-200">
                                        <td className="py-2 w-[200px] hover:bg-gray-50  px-4  text-left text-gray-700">পৃষ্ঠা সংখ্যা</td>
                                        <td className="py-2 px-4  text-left text-gray-700">: {book?.pages || 'Not mention'}</td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col md:flex-row items-start gap-3  p-3 lg:p-4">
                        <Image height={676} width={1200} src={`${writer?.photo || 'https://i.postimg.cc/tgSnXdKk/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'}`} alt="featured books" className="h-[100px] md:h-[140px] lg:h-[190px] w-[100px] md:w-[140px] lg:w-[190px] rounded-2xl border-[4px] "></Image>
                        <div className="flex flex-col p-2 md:p-6 lg:p-0">
                            <h1 className="text-[22px] font-bold">{writer?.name?.[1]}</h1>
                            <h1 className="mb-4 ">Total Books Available: {writer?.books?.length}</h1>
                            <p className="text-gray-600">{writer?.about}</p>

                            
                            <Link href={`/writer/${writer?.authorID}`} type="submit"
                                className={`bg-bg-blue hover:bg-[#4ed9c4] w-[100px] text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`} >
                                    All Books
                            </Link>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>



        </div>
    );
};

export default BookInformation;