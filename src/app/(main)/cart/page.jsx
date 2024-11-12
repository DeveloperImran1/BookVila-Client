import LeftSide from '@/components/cart/LeftSide';
import RightSide from '@/components/cart/RightSide';
import React from 'react';

const cart = () => {
    return (
        <div>
            <div className=' md:w-11/12 mx-auto xl:container px-0 mt-5 md:mt-10 '>
                <div className="flex flex-col md:flex-row flex-wrap gap-x-2.5">
                    <div className="flex-1 bg-white">
                        <LeftSide />
                    </div>
                    <div className="bg-white w-full md:w-64 lg:w-96 p-4 sm:p-6 md:p-7 lg:p-10">
                        <RightSide />
                    </div>
                </div>
            </div>

            {/* Bottom Side */}
            <div className=""></div>
        </div>
    );
};

export default cart;