'use client';

import { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { Button } from 'rizzui';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { reportCardTranslations } from '@/translations/periodicReportsPage/report-card';
import { translate } from '@/translations/translate';

interface ReportCardProps {
  title: string;
  endpoint: string;
  shiftTime: string;
  token: string | null;
  station_serial?:any
}

interface ReportTotals {
  total_amount: number;
  total_volume: number;
  total_discount: number;
  net_amount: number;
}

interface ReportDates {
  start: string;
  end: string;
}

export default function ReportCard({ title, endpoint, shiftTime, token,station_serial }: ReportCardProps) {
  const [reportData, setReportData] = useState<any[]>([]);
  const [reportTotals, setReportTotals] = useState<ReportTotals | null>(null);
  const [reportDates, setReportDates] = useState<ReportDates | null>(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!token) return;

      setIsLoading(true)

      try {
        const res = await fetch(`/api/sales-reports/periodic-reports/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify(
            {
               shift_period: shiftTime,
              ...(station_serial ? { station_serial } : {}), // Only include if defined
            }
          ),
        });

        const data = await res.json();
        if (data?.status_code === 200 && Array.isArray(data.data)) {
          setReportData(data.data);
          setReportTotals(data.totals);
          setReportDates(data.dates);
        } else {
          console.error(`Invalid data for ${title}:`, data);
        }
      } catch (error) {
        console.error(`Failed to fetch ${title} report:`, error);
      }finally{
        setIsLoading(false)
      }
    };

    fetchReport();
  }, [endpoint, shiftTime, token, title]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !reportTotals || !reportDates) return;

    const totalAmount = reportTotals.total_amount.toLocaleString();
    const netAmount = reportTotals.net_amount.toLocaleString();
    const totalDiscount = reportTotals.total_discount.toLocaleString();
    const totalVolume = reportTotals.total_volume.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const { start, end } = reportDates;

    const htmlContent = `
            <html>
              <head>
                <title>${title} - Report</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    font-size: 14px;
                  }
                  .center {
                    text-align: center;
                  }
                  .header-box {
                    border: 1px solid #000;
                    padding: 20px;
                    margin-bottom: 20px;
                  }
                  .summary {
                    margin: 20px 0;
                  }
                  .summary div {
                    margin-bottom: 5px;
                  }
                  .bold {
                    font-weight: bold;
                  }
                  .table-container {
                    width: 100%;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                  }
                  th, td {
                    padding: 8px 12px;
                    border: 1px solid #000;
                  }
                  th {
                    background-color: #f2f2f2;
                  }
                  .start-end {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <div class="header-box center">
                  <div>*****START OF PERIODIC REPORT*****</div>
                  <h2>LAKE OIL LIMITED</h2>
                  <div>P.O BOX 5055, DAR ES SALAAM - TANZANIA</div>
                  <div>LAKE OIL</div>
                  <div>MOBILE: 0685729391</div>
                  <div>TIN: 104911757</div>
                  <div>VRN: 10019095T</div>
                  <div>SERIAL NUMBER: 10TZ101907</div>
                  <div>UIN: 342SVZ5433455-...TZ23423</div>
                  <div>TAX OFFICE: <strong>Large Taxpayer</strong></div>
                </div>

                <div class="start-end">
                  <div>START: ${start}</div>
                  <div>END: ${end}</div>
                </div>

                <div class="summary">
                  <div><strong>TOTAL LITRE:</strong> ${totalVolume} Ltr</div>
                  <div><strong>TOTAL AMOUNT:</strong> ${totalAmount}</div>
                  <div><strong>DISCOUNT AMOUNT:</strong> ${totalDiscount}</div>
                  <div><strong>NET AMOUNT:</strong> ${netAmount}</div>
                </div>

                <h3 class="center">Product-Wise Details</h3>

                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Volume (L)</th>
                      <th>Receipts</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${reportData
                      .map(
                        (item) => `
                      <tr>
                        <td>${item.product}</td>
                        <td>${item.total_amount.toLocaleString()}</td>
                        <td>${item.total_volume.toFixed(2)}</td>
                        <td>${item.total_receipts}</td>
                      </tr>`
                      )
                      .join('')}
                  </tbody>
                </table>
              </body>
            </html>
          `;


    printWindow.document.open();
    // printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

// for Translations
  const lang = useSelector((state:RootState)=>state.language.language)
  const receipts = translate(reportCardTranslations,lang,"receipts");
  const volume = translate(reportCardTranslations,lang,"volume");
  const amount = translate(reportCardTranslations,lang,"amount");
  const type = translate(reportCardTranslations,lang,"type");

  return (
    <WidgetCard title={title}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-500 border-solid"></div>
        </div>
      ) : (
        <>
          <table className="w-full mt-4 text-sm text-left border-t border-gray-200">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2 px-2 font-medium">{type.text}</th>
                <th className="py-2 px-2 font-medium"> {amount.text}</th>
                <th className="py-2 px-2 font-medium">{volume.text}</th>
                <th className="py-2 px-2 font-medium">{receipts.text}</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.product} className="border-b">
                  <td className="py-2 px-2 font-medium text-gray-700">{item.product}</td>
                  <td className="py-2 px-2">{item.total_amount.toLocaleString()}</td>
                  <td className="py-2 px-2">{item.total_volume.toFixed(3)}</td>
                  <td className="py-2 px-2">{item.total_receipts}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="mt-4 text-right">
            <Button className="hover:scale-95 transition-all duration-300" size="sm" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </>
      )}
    </WidgetCard>
  );
}
