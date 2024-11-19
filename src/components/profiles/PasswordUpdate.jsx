import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';

const PasswordUpdate = () => {
    const session = useSession();
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const email = session?.data?.user?.email;
    const [formData, setFormData] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Password Updated : ', formData);
        if (formData?.newPass !== formData?.confirmPass) {
            return toast.error('Your Confirm Password is wrong😢')
        }
        const result = await axiosPublic.put(`/updatePass/${email}`, formData)
        console.log(result)

        if (result?.data?.modifiedCount) {
            setLoading(false)
            toast.success('Updated successfully 👌')
            e.target.reset()
        }
        else {
            return toast.error('Your Credentials was wrong😢')
        }
    };


    return (
        <div className='p-2'>
            <form onSubmit={handleSubmit}>


                <div className="mt-4 ">
                    <label htmlFor="oldPass" className="block font-medium mb-1">Old Password</label>
                    <input
                        type="tel"
                        id="oldPass"
                        name="oldPass"
                        placeholder="1700001111"
                        value={formData.oldPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full lg:w-[300px] transition-all duration-300 focus:outline-none "
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="newPass" className="block font-medium mb-1">New Password</label>
                    <input
                        type="tel"
                        id="newPass"
                        name="newPass"

                        value={formData.newPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full lg:w-[300px] transition-all duration-300 focus:outline-none "
                    />
                </div> <div className="mt-4">
                    <label htmlFor="confirmPass" className="block font-medium mb-1">Confirm Password</label>
                    <input
                        type="tel"
                        id="confirmPass"
                        name="confirmPass"

                        value={formData.confirmPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full lg:w-[300px] transition-all duration-300 focus:outline-none "
                    />
                </div>
                <div className='flex  justify-end'>
                    <button

                        type="submit"
                        disabled={!formData.oldPass || !formData.newPass || !formData.confirmPass}
                        className={`${!formData.oldPass || !formData.newPass || !formData.confirmPass
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-bg-blue hover:bg-[#4ed9c4]'
                            } text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}

                    >

                        {
                            loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Update"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordUpdate;