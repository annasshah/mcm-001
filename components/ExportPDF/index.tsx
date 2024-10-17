import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React from 'react';

interface TableData {
    orderId: string;
    date: string;
    patientName: string;
    totalAmount: string;
    paymentType: string;
}

interface ExportAsPDFProps {
    tableData: TableData[];
}

const ExportAsPDF: React.FC<ExportAsPDFProps> = ({ tableData }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text('Sales History', 14, 20);

        // Define table column headers
        const tableColumn = ['Order ID', 'Date', 'Patient Name', 'Total Amount', 'Payment Type'];
        const tableRows: string[][] = [];

        // Loop through table data and push into rows
        tableData.forEach((item) => {
            const rowData = [
                item.orderId,
                item.date,
                item.patientName,
                item.totalAmount,
                item.paymentType,
            ];
            tableRows.push(rowData);
        });

        // Generate table in the PDF
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            // styles: {
            //     cellPadding: { top: 10, bottom: 10 }, // Adds vertical padding (top and bottom)
            // },
            startY: 30,
        });

        // Save the generated PDF
        doc.save('sales_history.pdf');
    };

    return (
        <button onClick={generatePDF} className='bg-black text-base px-3 py-2 text-white rounded-md'>Export as PDF</button>
    );
};

export default ExportAsPDF;
