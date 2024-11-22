import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useContext, useState } from 'react';
import DateRangeModal from './DateRangeModal';
import { fetch_content_service } from '@/utils/supabase/data_services/data_services';
import { LocationContext } from '@/context';
import { toast } from 'react-toastify'; // Import the toast library

interface TableData {
    orderId: string;
    date: string;
    patientName: string;
    totalAmount: string;
    paymentType: string;
}

interface ExportAsPDFProps {}

const ExportAsPDF: React.FC<ExportAsPDFProps> = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const { selectedLocation } = useContext(LocationContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Function to generate the PDF
    const generatePDF = async (startDate: string, endDate: string) => {
        setLoading(true);

        try {
            // Fetch the data with date range filter
            const fetched_data = await fetch_content_service({
                table: 'sales_history',
                language: '',
                selectParam: `,
                    orders(pos:pos (
                    lastname,
                    firstname,
                    locationid
                )),
                date_sold,
                quantity_sold,
                total_price
                `,
                matchCase: { key: 'orders.pos.locationid', value: selectedLocation.id },
                filterOptions: [
                    { column: 'created_at', operator: 'gte', value: startDate },
                    { column: 'created_at', operator: 'lte', value: endDate },
                    { column: 'orders.pos', operator: 'not', value: null },
                    { column: 'orders', operator: 'not', value: null },
                ]
            });

            // If data fetch fails or is empty
            if (!fetched_data || fetched_data.length === 0) {
                toast.error('No data found for the selected date range');
                setLoading(false);
                return;
            }

            // Define table column headers
            const tableColumn = ['Order ID', 'Date', 'Patient Name', 'Total Amount', 'Payment Type'];
            const tableRows: string[][] = [];

            let totalAmount = 0;

            // Loop through fetched data and prepare rows
            fetched_data.forEach((item: any) => {
                const patientName = `${item.orders.pos.firstname} ${item.orders.pos.lastname}`;
                const rowData = [
                    item.sales_history_id.toString(),
                    new Date(item.date_sold).toLocaleString(), // Formatting date
                    patientName,
                    `$${item.total_price.toFixed(2)}`, // Formatting total price
                    item.paymentcash ? 'Cash' : 'Card', // Assuming boolean for payment type
                ];
                tableRows.push(rowData);
                totalAmount += parseFloat(item.total_price);
            });

            // Add total amount row
            const totalRow = [
                { content: 'Total', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
                { content: `$${totalAmount.toFixed(2)}`, colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
            ];
            // @ts-ignore
            tableRows.push(totalRow);

            // Create PDF document
            const doc = new jsPDF();

            // Title Section: Heading, Date Range, and Location
            doc.setFontSize(16);
            doc.text('Sales History Report', 14, 20);
            doc.setFontSize(12);

            // Date Range
            doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 30);
            
            // Location Title
            doc.text(`Location: ${selectedLocation.title}`, 14, 40);  // Adjust for the selectedLocation name

            // Add some space before the table
            doc.setLineWidth(0.5);
            doc.line(14, 45, 195, 45); // Horizontal line after the header

            // Generate the table in the PDF
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 50,  // Starting point for the table
                margin: { top: 20 },
                theme: 'grid', // Optional theme for styling
            });

            // Save the generated PDF
            doc.save('sales_history_report.pdf');
            setLoading(false);
            toast.success('PDF generated successfully!');

            // Close the modal after PDF is generated
            handleClose();
        } catch (error) {
            setLoading(false);
            console.error('Error generating PDF:', error);
            toast.error('An error occurred while generating the PDF');
        }
    };

    return (
        <>
            <DateRangeModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                generatePdfHandle={generatePDF}
                loading={loading}
            />
        </>
    );
};

export default ExportAsPDF;
