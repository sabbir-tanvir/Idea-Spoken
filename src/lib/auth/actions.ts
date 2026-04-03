'use server';

import { redirect } from 'next/navigation';
import { setAuthToken, removeAuthToken, getAuthToken } from './session';
import { ActionResult, AuthResponse, RegisterRequest, LoginRequest, ForgotPasswordRequest, UpdatePasswordRequest } from './types';

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

/**
 * Server Action: Forgot Password
 */
export async function forgotPassword(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // Extract form data
  const email = formData.get('email') as string;

  // Basic validation
  const errors: ActionResult['errors'] = {};

  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address'];
  }

  // Return errors if validation fails
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Prepare request body
  const requestBody: ForgotPasswordRequest = {
    email: email.trim().toLowerCase(),
  };

  try {
    // Call backend API
    const response = await fetch(`${BASE_URL}/auth/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data: AuthResponse = await response.json();
    console.log('Forgot password response:', response);

    if (!response.ok || !data.success) {
      return {
        success: false,
        errors: {
          general: [data.error || data.message || 'Failed to send reset link. Please try again.'],
        },
      };
    }

    // Return success message
    return {
      success: true,
      message: 'A password reset link has been sent to your account',
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      errors: {
        general: ['Network error. Please check your connection and try again.'],
      },
    };
  }
}

/**
 * Server Action: Update password
 */
export async function updatePassword(
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<ActionResult> {
  // Basic validation
  const errors: ActionResult['errors'] = {};

  if (!email || !email.includes('@')) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!currentPassword || currentPassword.length < 6) {
    errors.password = ['Current password must be at least 6 characters'];
  }

  if (!newPassword || newPassword.length < 6) {
    errors.password = ['New password must be at least 6 characters'];
  }

  if (currentPassword === newPassword) {
    errors.password = ['New password must be different from current password'];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const requestBody: UpdatePasswordRequest = {
    email: email.trim().toLowerCase(),
    currentPassword,
    newPassword,
  };

  try {
    const response = await fetch(`${BASE_URL}/auth/updatepassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        errors: {
          general: [data.error || data.message || 'Failed to update password. Please try again.'],
        },
      };
    }

    // Update the stored token if a new one is returned
    if (data.token) {
      await setAuthToken(data.token);
    }

    return {
      success: true,
      message: 'Password updated successfully!',
    };
  } catch (error) {
    console.error('Update password error:', error);
    return {
      success: false,
      errors: {
        general: ['Network error. Please check your connection and try again.'],
      },
    };
  }
}

/**
 * Server Action: Logout user
 */
export async function logoutUser(): Promise<void> {
  const token = await getAuthToken();

  if (token) {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
  }

  await removeAuthToken();
  redirect('/auth/login');
}
