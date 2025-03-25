import React, { useEffect, useState, useRef } from 'react';
import { Copy, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import ActionButton from '@/components/Buttons/ActionButton';
import TransparentButton from '@/components/Buttons/TransparentButton';
import { useModal } from '@/util/Modals/ModalsContext';

const CreateOrderLinkModal: React.FC = () => {
  const { closeModal } = useModal();
  const [orderLink, setOrderLink] = useState('');
  const qrCodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const currentEnvironment = process.env.NODE_ENV;
    const baseUrl = currentEnvironment === 'production' 
      ? 'https://xyz-ntrinsic.com' 
      : 'http://localhost:3000';
    setOrderLink(`${baseUrl}/create-new-order`);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderLink)
      .then(() => toast.success('Order link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy order link. Please try again.'));
  };

  const generateQRCodePDF = (): Promise<jsPDF> => {
    return new Promise((resolve) => {
      const pdf = new jsPDF();
      
      if (qrCodeRef.current) {
        const svgElement = qrCodeRef.current;
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 20, 20, 100, 100);
            pdf.text(orderLink, 20, 130);
            resolve(pdf);
          };
          img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        } else {
          resolve(pdf);
        }
      } else {
        resolve(pdf);
      }
    });
  };

  const downloadPDF = async () => {
    const pdf = await generateQRCodePDF();
    pdf.save('order-qrcode.pdf');
  };

  const sharePDF = async () => {
    const pdf = await generateQRCodePDF();
    const pdfBlob = pdf.output('blob');
    
    if (navigator.share) {
      try {
        await navigator.share({
          files: [new File([pdfBlob], 'order-qrcode.pdf', { type: 'application/pdf' })],
          title: 'Order QR Code',
          text: 'Here is the QR code for the order link',
        });
        console.log('Thanks for sharing!');
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Failed to share the PDF. Please try again.');
      }
    } else {
      toast.error('Web Share API is not supported in your browser');
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center">
      <div className="relative w-[85%] md:w-[500px]">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-5 md:-right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full">
          <X className='text-primary-normal' />
        </button>

        <div className="bg-white p-6 rounded-xl shadow-md max-h-full overflow-auto">
          <h2 className="font-medium tracking-wider text-[#434343] text-xl my-5 text-center">Create a New Order Link</h2>

          <p className="text-center text-sm text-gray-600 mb-4">
            Customers can use order link to create orders from their devices,
            and your company receives the order.
          </p>

          <div className="bg-gray-100 p-3 rounded-md flex items-center justify-center gap-3 font-semibold text-sm mb-4">
            <span className="text-sm text-gray-700">{orderLink}</span>
            <Copy className='tex-sm cursor-pointer' onClick={copyToClipboard} />
          </div>

          <div className='flex justify-center items-center flex-col gap-5 mb-5'>
            <ActionButton text="Send via Email" customPadding='py-4 px-3 w-[65%]' />
            <TransparentButton text="Share Order Link" customPadding='py-4 px-3 w-[65%]' onClick={sharePDF} />
          </div>

          <button className="w-full text-[0.90rem] text-purple-600 py-2 hover:underline" onClick={downloadPDF}>
            Print QR Code
          </button>

          <div>
            <div className='items-center mt-5 justify-center flex flex-row'>
              <hr className="w-full border-gray-2 mx-2" />
              <p>or</p>
              <hr className="w-full border-gray-2 mx-2" />
            </div>

            <div className="flex justify-center mt-5">
              <QRCodeSVG ref={qrCodeRef} value={orderLink} size={150} />
            </div>

            <div className='mt-3 text-[#434343] flex justify-center items-center'>
              <p>Scan QR Code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderLinkModal;