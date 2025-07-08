import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

function OrderPDFModal({ show, handleClose, order }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (show && order) {
      generatePdfPreview();
    }
  }, [show, order]);

  const generatePdf = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    let y = 20;

    // ===== Invoice Header =====
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("Shoppers Stop - Invoice", marginLeft, y);
    doc.setFontSize(11);
    doc.setTextColor(150);
    y+=8;
    doc.text("Generated on: " + new Date().toLocaleString(), 140, y, { align: "right" });
    y += 10;

    doc.setDrawColor(200);
    doc.setLineWidth(0.8);
    doc.line(marginLeft, y, 190, y);
    y += 8;

    // ===== Customer Details =====
    const a = order.AddressDetails;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text("Bill To:", marginLeft, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${a.FirstName} ${a.LastName}`, marginLeft, y); y += 5;
    doc.text(`${a.HouseNo}, ${a.StreetName}`, marginLeft, y); y += 5;
    doc.text(`${a.TownCity}, ${a.CountryRegion} - ${a.PostalCodeZip}`, marginLeft, y); y += 5;
    doc.text(`Phone: ${a.PhoneNO}`, marginLeft, y); y += 5;
    doc.text(`Email: ${a.EmailAddress}`, marginLeft, y); y += 10;

    // ===== Product Table Header =====
    doc.setFont("helvetica", "bold");
    doc.setFillColor(230, 230, 230);
    doc.rect(marginLeft, y - 5, 170, 8, "F");
    doc.setTextColor(0);
    doc.text("No.", marginLeft + 2, y);
    doc.text("Product", marginLeft + 15, y);
    doc.text("Qty", marginLeft + 105, y);
    doc.text("Price", marginLeft + 125, y);
    doc.text("Total", marginLeft + 155, y);
    y += 6;

   
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    order.CartDetails.forEach((item, index) => {
      const title = item.cartProductTitle || item.productTitle || "Unnamed";
      const qty = item.cartProductQuantity || 1;
      const price = item.cartProductPrice || 0;
      const total = qty * price;

      doc.text(String(index + 1), marginLeft + 2, y);
      doc.text(title, marginLeft + 15, y, { maxWidth: 85 });
      doc.text(String(qty), marginLeft + 107, y);
      doc.text(`₹${price}`, marginLeft + 125, y);
      doc.text(`₹${total}`, marginLeft + 155, y);
      y += 6;

 
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 5;


    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setFillColor(245, 245, 245);
    doc.rect(marginLeft, y, 170, 25, "F");

    const summaryY = y + 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: ₹${order.CartItemSubTotal}`, marginLeft + 5, summaryY);
    doc.text(`Shipping: Free`, marginLeft + 5, summaryY + 6);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ₹${order.CartItemSubTotal}`, marginLeft + 5, summaryY + 12);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment: ${order.paymentMethod}`, marginLeft + 110, summaryY + 6);
    y += 30;

    doc.setFont("helvetica", "italic");
    doc.setTextColor(120);
    doc.setFontSize(10);
    doc.text("Thank you for shopping with ShopEase!", 105, y, { align: "center" });

    return doc;
  };

  const generatePdfPreview = () => {
    const doc = generatePdf();
    const blob = doc.output("blob");
    const previewUrl = URL.createObjectURL(blob);
    setPdfUrl(previewUrl);
  };

  const handleDownload = () => {
    const doc = generatePdf();
    doc.save("order_invoice.pdf");
    handleClose();
    navigate('/');
  };

  return (
    <Modal  show={show} onHide={handleClose} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Order PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalinvoice">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc" }}
          />
        ) : (
          <p>Generating PDF...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleDownload} disabled={!pdfUrl}>Download PDF</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderPDFModal;
