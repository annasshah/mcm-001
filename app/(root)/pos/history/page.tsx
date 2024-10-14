'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetch_content_service } from '@/utils/supabase/data_services/data_services';
import { currencyFormatHandle } from '@/helper/common_functions';
import { CircularProgress } from '@mui/material';
import OrderDetailsModal from './OrderDetailsModal'; // Import the modal
import { CiSearch } from 'react-icons/ci';
import TableComponent from '@/components/TableComponent';

interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}

const tableHeader = [
  // Same table headers as before
  {
    id: 'order_id',
    label: 'Order ID',
    align: 'text-center',
    flex: 'flex-1',
  },
  {
    id: 'order_date',
    label: 'Date',
    render_value: (val: string, elem: any) => moment(val, 'YYYY-MM-DD h:mm s').format('DD-MMMM-YYYY'),
  },
  {
    id: 'name',
    label: 'Patient Name',
    render_value: (val: any, elem?: any) => `${elem.pos.firstname} ${elem.pos.lastname}`,
  },
  {
    id: 'total_price',
    label: 'Total Amount',
    render_value: (val: any, elem?: any) => {
      const totalVal = elem.saleshistory.reduce((a: number, b: { total_price: number }) => a + b.total_price, 0);
      return currencyFormatHandle(totalVal);
    }
  },
  {
    id: 'payment_type',
    label: 'Payment Type',
    render_value: (val: any, elem?: any) => "Cash", // static value for now
  },
  {
    id: 'last_updated',
    label: 'Action',
    render_value: (val: string, elem: any, openModal: Function) => (
      <button onClick={() => openModal(elem)} className='bg-[#B8C8E1] text-base px-2 py-1 rounded-md'>
        Details
      </button>
    ),
    align: 'text-center',
    flex: 'flex-1',
  },
];

const SalesHistory = () => {
  const [dataList, setDataList] = useState<DataListInterface[]>([]);
  const [allData, setAllData] = useState<DataListInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DataListInterface | null>(null);

  const fetch_handle = async () => {
    setLoading(true);
    const fetched_data = await fetch_content_service({
      table: 'orders',
      language: '',
      selectParam: `,pos(
        firstname,
        lastname
      ),
      saleshistory (
        sales_history_id,
        product_id,
        date_sold,
        quantity_sold,
        total_price
      )
    `
    });
    setDataList(fetched_data);
    setAllData(fetched_data);
    setLoading(false);
  };

  const openModal = (orderDetails: DataListInterface) => {
    setSelectedOrder(orderDetails);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const onChangeHandle = (e: any) => {
    const val = e.target.value;
    if (val === '') {
      setDataList([...allData]);
    } else {
      const filteredData = allData.filter((elem) => elem.order_id === +val);
      setDataList([...filteredData]);
    }
  };

  useEffect(() => {
    fetch_handle();
  }, []);

  return (
    <main className="w-full h-full font-[500] text-[20px]">
      <div className='flex justify-between items-center px-4 py-4 space-x-2'>
        <h1 className='text-xl font-bold'>Sales History</h1>
        <div>
          <button className='bg-black text-base px-3 py-2 text-white rounded-md'>Export as PDF</button>
        </div>
      </div>

      <div className='w-full min-h-[82dvh] h-[100%] overflow-auto py-2 px-2'>
        <TableComponent
          tableHeader={tableHeader}
          loading={loading}
          dataList={dataList}
          openModal={openModal}
          searchHandle={onChangeHandle}

        />
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal isOpen={modalOpen} onClose={closeModal} orderDetails={selectedOrder} />
      )}
    </main>
  );
};

export default SalesHistory;
