'use server';

import { redirect } from 'next/navigation';
import { setAuthToken, removeAuthToken, getAuthToken } from './session';
import { ActionResult, AuthResponse, RegisterRequest, LoginRequest, ForgotPasswordRequest, UpdatePasswordRequest, User } from './types';

const BASE_URL = (process.env.BASE_URL || 'https://api.idealessons.com/api/v1').replace(/\/+$/, '');

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

/**
 * Server Action: Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success) {
      const user = (data.data || data.user) as User;
      return user || null;
    }
    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Server Action: Update profile details (and optionally avatar)
 */
export async function updateProfileDetails(formData: FormData): Promise<ActionResult & { user?: User }> {
  const token = await getAuthToken();
  if (!token) return { success: false, errors: { general: ['Not authenticated'] } };

  try {
    const newFormData = new FormData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const avatar = formData.get('avatar');
    if (name) newFormData.append('name', name);
    if (phone) newFormData.append('phone', phone);
    if (avatar && avatar instanceof Blob && avatar.size > 0) {
      newFormData.append('avatar', avatar);
    }
    
    const response = await fetch(`${BASE_URL}/auth/updatedetails`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      return { 
        success: true, 
        message: data.message || 'Profile updated successfully!',
        user: (data.data || data.user) as User
      };
    }
    return { success: false, errors: { general: [data.message || data.error || 'Failed to update profile'] } };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, errors: { general: ['Network error'] } };
  }
}

/**
 * Server Action: Update avatar only
 */
export async function updateAvatar(formData: FormData): Promise<ActionResult & { user?: User }> {
  const token = await getAuthToken();
  if (!token) return { success: false, errors: { general: ['Not authenticated'] } };

  try {
    const file = formData.get('avatar');
    if (!file) {
      return { success: false, errors: { general: ['No file provided'] } };
    }
    
    const newFormData = new FormData();
    newFormData.append('avatar', file);

    const response = await fetch(`${BASE_URL}/auth/avatar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      return { 
        success: true, 
        message: data.message || 'Avatar updated successfully!',
        user: (data.data || data.user) as User
      };
    }
    return { success: false, errors: { general: [data.message || data.error || 'Failed to update avatar'] } };
  } catch (error) {
    console.error('Update avatar error:', error);
    return { success: false, errors: { general: ['Network error'] } };
  }
}

/**
 * Server Action: Delete avatar
 */
export async function deleteAvatar(): Promise<ActionResult> {
  const token = await getAuthToken();
  if (!token) return { success: false, errors: { general: ['Not authenticated'] } };

  try {
    const response = await fetch(`${BASE_URL}/auth/avatar`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      return { success: true, message: data.message || 'Avatar removed successfully!' };
    }
    return { success: false, errors: { general: [data.message || data.error || 'Failed to remove avatar'] } };
  } catch (error) {
    console.error('Delete avatar error:', error);
    return { success: false, errors: { general: ['Network error'] } };
  }
}

