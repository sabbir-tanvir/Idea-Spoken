'use server';

import { redirect } from 'next/navigation';
import { setAuthToken } from './session';
import { ActionResult, AuthResponse, RegisterRequest, LoginRequest } from './types';

const BASE_URL = process.env.BASE_URL;

/**
 * Server Action: Register a new user
 */
export async function registerUser(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // Extract form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  // Basic validation
  const errors: ActionResult['errors'] = {};

  if (!name || name.trim().length < 2) {
    errors.name = ['Name must be at least 2 characters'];
  }

  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!phone || phone.trim().length < 10) {
    errors.phone = ['Please enter a valid phone number'];
  }

  if (!password || password.length < 6) {
    errors.password = ['Password must be at least 6 characters'];
  }

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Prepare request body
  const requestBody: RegisterRequest = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password,
    role: 'STUDENT',
  };

  try {
    // Call backend API
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        errors: {
          general: [data.message || 'Registration failed. Please try again.'],
        },
      };
    }

    // Set the token in HTTP-only cookie
    if (data.token) {
      await setAuthToken(data.token);
    }
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      errors: {
        general: ['Network error. Please check your connection and try again.'],
      },
    };
  }

  // Redirect to dashboard on success
  redirect('/dashboard');
}

/**
 * Server Action: Login user
 */
export async function loginUser(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // Extract form data
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation
  const errors: ActionResult['errors'] = {};

  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!password || password.length < 6) {
    errors.password = ['Password must be at least 6 characters'];
  }

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Prepare request body
  const requestBody: LoginRequest = {
    email: email.trim().toLowerCase(),
    password,
  };

  try {
    // Call backend API
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        errors: {
          general: [data.error || data.message || 'Login failed. Please try again.'],
        },
      };
    }

    // Set the token in HTTP-only cookie
    if (data.token) {
      await setAuthToken(data.token);
    }
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      errors: {
        general: ['Network error. Please check your connection and try again.'],
      },
    };
  }

  // Redirect to dashboard on success
  redirect('/dashboard');
}
