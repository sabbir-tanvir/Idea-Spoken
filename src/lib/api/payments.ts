'use server';

import { getAuthToken } from '@/lib/auth/session';

const BASE_URL = process.env.BASE_URL;

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'brac_bank';

export interface PaymentRequest {
  transactionId: string;
  courseId: number;
  paymentMethod: PaymentMethod;
  amount: number;
  currency: string;
}

export interface PaymentResponseData {
  id: number;
  amount: string;
  currency: string | null;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt: string;
  userId: number;
  courseId: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: PaymentResponseData;
}

export interface PaymentActionResult {
  success: boolean;
  message: string;
  data?: PaymentResponseData;
}

/**
 * Server Action: Submit a payment request
 */
export async function submitPayment(
  payload: PaymentRequest
): Promise<PaymentActionResult> {
  const token = await getAuthToken();

  if (!token) {
    return {
      success: false,
      message: 'You must be logged in to make a payment.',
    };
  }

  try {
    const response = await fetch(`${BASE_URL}/payments/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data: PaymentResponse = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || 'Payment request failed. Please try again.',
      };
    }

    return {
      success: true,
      message: data.message || 'Payment request submitted successfully!',
      data: data.data,
    };
  } catch (error) {
    console.error('Payment error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}
