import { TbCurrencyTaka, TbTruckDelivery } from 'react-icons/tb';

const OrderSummary = () => {
    return (
        <>
            <h1 className="font-semibold sm:text-lg md:text-xl">Order summary</h1>
            {/* Table */}
            <table className="mt-2 sm:mt-3 lg:mt-5 table text-xs table-px-0 dropdown">
                <tbody>
                    {/* Sub total (5 items)	 */}
                    <tr>
                        <td className='p-0 text-gray-700'>
                            <span className='mr-1'>Sum total </span>
                            <span>(4 Items)</span>
                        </td>
                        <td></td>
                        <td className='w-10'>
                            <div className="flex">
                                <TbCurrencyTaka className='text-lg -mr-0.5' />
                                <span className='block text-sm'>90</span>
                            </div>
                        </td>
                    </tr>
                    {/* Delivery charge	 */}
                    <tr>
                        <td className='p-0 text-gray-700'>
                            <div className="flex items-center">
                                <p className='mr-2'>Delivery charge </p>
                                <TbTruckDelivery className='text-base mt-1' />
                            </div>
                        </td>
                        <td></td>
                        <td className='w-10'>
                            <div className="flex">
                                <TbCurrencyTaka className='text-lg -mr-0.5' />
                                <span className='block text-sm'>0</span>
                            </div>
                        </td>
                    </tr>
                    {/* Grand total	 */}
                    <tr className='font-bold text-xs'>
                        <td className='p-0 text-gray-700'>
                            <p className=''>Grand total</p>
                        </td>
                        <td></td>
                        <td className='w-10'>
                            <div className="flex">
                                <TbCurrencyTaka className='text-lg -mr-0.5' />
                                <span className='block text-sm'>420</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default OrderSummary;