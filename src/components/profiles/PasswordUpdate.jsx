import React, { useState } from 'react';

const PasswordUpdate = () => {

    const [formData, setFormData] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data or handle it as needed
        console.log('Password Updated : ', formData);
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Updated successfully"
        });
    };


    return (
        <div className='p-2'>
            <form onSubmit={handleSubmit}>
              

                <div className="mt-4 ">
                    <label htmlFor="oldPass" className="block font-medium mb-1">Old Password</label>
                    <input
                        type="password"
                        id="oldPass"
                        name="oldPass"
                        placeholder="1700001111"
                        value={formData.oldPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="newPass" className="block font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        id="newPass"
                        name="newPass"
                    
                        value={formData.newPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
                    />
                </div> <div className="mt-4">
                    <label htmlFor="confirmPass" className="block font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPass"
                        name="confirmPass"
                     
                        value={formData.confirmPass}
                        onChange={handleChange}
                        className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
                    />
                </div>
                <div className='flex  justify-end'>
                    <button

                        type="submit"
                        disabled={!formData.oldPass && !formData.newPass && !formData.confirmPass}
                        className={`${!formData.oldPass && !formData.newPass && !formData.confirmPass
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-bg-blue hover:bg-[#4ed9c4]'
                            } text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}

                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordUpdate;