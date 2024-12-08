import React from "react";
import { FaCreditCard, FaDownload } from "react-icons/fa";
import { ReadOnlySection } from "./ReadOnlySection";
export const TuitionSection = ({ studentInfo }) => {
  return (
    <ReadOnlySection title="Tuition Information" icon={FaCreditCard}>
      {/* Payment summary cards */}
      {/* Payment history table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            Current Balance
          </h3>
          <p className="text-2xl font-bold text-green-900">
            ₱{studentInfo.tuition.currentBalance.toLocaleString()}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Next Due Date
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            {new Date(studentInfo.tuition.nextDueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800 mb-2">
            Next Due Amount
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            ₱{studentInfo.tuition.nextDueAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <h3 className="font-semibold mb-4">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">
                Reference No.
              </th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {studentInfo.tuition.payments.map((payment, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">{payment.referenceNo}</td>
                <td className="px-4 py-3 text-right">
                  ₱{payment.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      window.open(`/path/to/receipt/${payment.referenceNo}.pdf`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReadOnlySection>
  );
};
