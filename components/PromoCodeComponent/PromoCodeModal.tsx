import { Button } from 'flowbite-react';
import React, { FC, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PromoCodeDataInterface } from '@/types/typesInterfaces';

interface Props {
    closeModal: () => void;
    checkPromoLoading?: boolean;
    applyOnSuccess: (code: PromoCodeDataInterface, discount: number) => void; // Pass discount on success
    patientId: number; // The patient's ID
}

const PromoCodeModal: FC<Props> = ({ closeModal, checkPromoLoading = false, applyOnSuccess, patientId }) => {
    const [inputVal, setInputVal] = useState('');
    const [loading, setLoading] = useState(false); // State to handle loading

    const applyPromoHandle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Set loading state

        try {
            const response = await axios.post('/api/promocode/validate', {
                promocode: inputVal,
                patientid: patientId
            });

            if (response.status === 200) {
                const { discount, promocodeId } = response.data.data;
                applyOnSuccess({ code: inputVal, id: promocodeId }, discount); // Send the discount to parent
                toast.success('Promo code applied successfully!');
                closeModal(); // Close modal on success
            } else {
                toast.error(response.data.message || 'Failed to apply promo code');
            }
        } catch (error: any) {
            // Check if error is from Axios and extract relevant info
            if (axios.isAxiosError(error)) {
                // Error message from the server (e.g. 400 status)
                const errorMessage = error.response?.data?.message || 'Failed to apply promo code';
                toast.error(errorMessage);
            } else {
                // Generic error fallback
                toast.error('An error occurred while applying the promo code');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='fixed bg-black/70 h-screen w-full left-0 top-0 z-20 flex justify-center items-center'>
            <div className='bg-white max-w-[450px] w-[100%] py-3 px-3 rounded-md'>
                <div className='flex justify-between pt-2 py-5'>
                    <h1 className='text-xl font-semibold'>
                        Apply Promo code
                    </h1>
                    <IoCloseOutline className='pointer-events-auto cursor-pointer' size={24} onClick={closeModal} />
                </div>
                <div>
                    <form onSubmit={applyPromoHandle} className='space-y-6'>
                        <div className='flex items-center space-x-3'>
                            <div className='border-2 text-sm rounded-md px-2 py-2 flex items-center flex-1'>
                                <input
                                    value={inputVal}
                                    required
                                    onChange={(e) => setInputVal(e.target.value)}
                                    className='w-full focus:outline-none placeholder-gray-400'
                                    placeholder='Enter Promo code'
                                />
                            </div>
                            <Button
                                type='submit'
                                disabled={loading || checkPromoLoading}
                                className='disabled:opacity-60 w-32'
                                color="info"
                            >
                                {loading ? 'Checking...' : 'Apply'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PromoCodeModal;
