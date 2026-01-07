'use client';

import { useState } from 'react';

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
      
      <div className="space-y-4 mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="bkash"
            checked={paymentMethod === 'bkash'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <span className="font-medium">bKash</span>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="nagad"
            checked={paymentMethod === 'nagad'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <span className="font-medium">Nagad</span>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4"
          />
          <span className="font-medium">Credit/Debit Card</span>
        </label>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span>Subtotal:</span>
          <span className="font-semibold">৳2,500</span>
        </div>
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
