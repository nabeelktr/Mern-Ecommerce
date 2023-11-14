import { ArrowDownTrayIcon, BackspaceIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Axios from '../../../axiosInterceptors/axios'
import { useEffect, useRef, useState } from "react";

const InvoicePdf = ({setreport, report}) => {
  const pdfRef = useRef();
  const [orders, setorders] = useState()
    
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`sale-${report.startDate}.pdf`);
    })
  }

  const fetchdata = async() => {
    const {data} = await Axios.post('/admin/salesreport', {report});

    setorders(data);
  }
  

  useEffect(() => {
    fetchdata();
  }, [])
  return (
    <>
     <div className="w-[58rem] bg-white rounded-sm shadow dark:bg-gray-800 p-4 md:p-6 max-h-[30rem]" ref={pdfRef}>
  <div className="flex justify-between row mb-4">
    <div className="col-6">
      <img width={30} src='../../../../src/assets/lastlogo.png' className="m-3" />
    </div>
    <div className="text-xs font-bold col-6 uppercase">
      <span>Sales Report</span>
    </div>
  </div>
  <table className="w-full table-auto">
    <thead>
      <tr className="font-bold text-xs">
        <th className="border p-2">Order ID</th>
        <th className="border p-2">Date</th>
        <th className="border p-2">Total Amount</th>
        <th className="border p-2">Payment Mode</th>
      </tr>
    </thead>
    <tbody>
      {orders && orders.map((order, i) => (
        <tr key={i} className="text-xs ">
          <td className="border p-2 text-center">{order.orderId}</td>
          <td className="border p-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
          <td className="border p-2 text-center">{order.totalOfferPrice}</td>
          <td className="border p-2 text-center">{order.paymentMethod}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <div>
        <Button
        onClick={downloadPDF}
          variant="gradient"
          type="#"
          className="flex text-[0.6rem] items-center gap-1 h-9 bg-gray-300 hover:bg-gray-400 text-gray-200 font-bold py-0 px-3 rounded-sm shadow "
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Download
        </Button>

        <Button
          onClick={() => setreport()}
          variant="gradient"
          type="#"
          className="flex text-[0.6rem] items-center gap-1 h-9 mt-2 ml-[1.9rem] bg-gray-300 hover:bg-gray-400 text-gray-200 font-bold py-0 px-3 rounded-sm shadow "
        >
          <BackspaceIcon className="h-4 w-4" />
          Back
        </Button>
      </div>
    </>
  );
};

export default InvoicePdf;
