"use client";

import { useState, useEffect, useCallback } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, KeyRound, Upload, Trash2, X } from 'lucide-react';
import { updatePassword, getCurrentUser, updateProfileDetails, updateAvatar, deleteAvatar } from '@/lib/auth/actions';
import { User as UserType } from '@/lib/auth/types';
import { getAvatarUrl } from '@/lib/auth/avatar';
import Cropper from 'react-easy-crop';

// Helper to create the cropped image
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<File | null> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(null);
        return;
      }
      resolve(new File([blob], "avatar.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  });
};

export default function ProfileSettingsPage() {
  /* ---- user state ---- */
  const [user, setUser] = useState<UserType | null>(null);
  const [name, setName] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarImageError, setAvatarImageError] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [profileResult, setProfileResult] = useState<{ success: boolean; message: string } | null>(null);

  const avatarUrl = getAvatarUrl(avatar);

  useEffect(() => {
    setAvatarImageError(false);
  }, [avatarUrl]);

  /* ---- crop state ---- */
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  /* ---- change-password state ---- */
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name || '');
        setEmailValue(currentUser.email || '');
        setPhone(currentUser.phone || '');
        setAvatar(currentUser.avatar || null);
        setEmail(currentUser.email || ''); // Pre-fill password email field
      }
    }
    loadUser();
  }, []);

  // Clear result message after 5 seconds
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setResult(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);
  
  useEffect(() => {
    if (profileResult) {
      const timer = setTimeout(() => setProfileResult(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [profileResult]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setResult({ success: false, message: 'New passwords do not match.' });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    const res = await updatePassword(email, currentPassword, newPassword);

    if (res.success) {
      setResult({ success: true, message: res.message ?? 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } else {
      const msg =
        res.errors?.general?.[0] ??
        res.errors?.password?.[0] ??
        res.errors?.email?.[0] ??
        'Failed to update password.';
      setResult({ success: false, message: msg });
    }

    setIsSubmitting(false);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileResult(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);

    const res = await updateProfileDetails(formData);

    if (res.success) {
      setProfileResult({ success: true, message: res.message ?? 'Profile updated successfully!' });
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      window.dispatchEvent(new Event('user-updated'));
      window.location.reload();
    } else {
      setProfileResult({ success: false, message: res.errors?.general?.[0] ?? 'Failed to update profile.' });
    }

    setIsUpdatingProfile(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // 5MB file size limit (matching backend documentation)
    if (file.size > 5 * 1024 * 1024) {
      setProfileResult({ success: false, message: 'Image must be smaller than 5MB' });
      e.target.value = '';
      return;
    }

    // Set image for cropping
    const imageUrl = URL.createObjectURL(file);
    setImageToCrop(imageUrl);
    // Reset crop state
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    // Clear input so same file can be selected again
    e.target.value = '';
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropAndUpload = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    
    setIsUploadingAvatar(true);
    setImageToCrop(null); // Close crop modal
    setProfileResult(null);

    try {
      const croppedFile = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (!croppedFile) throw new Error('Failed to crop image');

      const formData = new FormData();
      formData.append('avatar', croppedFile);

      const res = await updateAvatar(formData);

      if (res.success) {
        setProfileResult({ success: true, message: 'Profile photo updated successfully!' });
        if (res.user?.avatar !== undefined) {
          setAvatar(res.user.avatar);
        } else {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setAvatar(currentUser.avatar || null);
          }
        }
        window.dispatchEvent(new Event('user-updated'));
        window.location.reload();
      } else {
        setProfileResult({ success: false, message: res.errors?.general?.[0] ?? 'Failed to upload photo.' });
      }
    } catch (error) {
      setProfileResult({ success: false, message: 'Error cropping or uploading image.' });
    }

    setIsUploadingAvatar(false);
  };

  const handleAvatarDelete = async () => {
    setIsUploadingAvatar(true);
    setProfileResult(null);

    const res = await deleteAvatar();

    if (res.success) {
      setProfileResult({ success: true, message: 'Profile photo removed successfully!' });
      setAvatar(null);
      window.dispatchEvent(new Event('user-updated'));
      window.location.reload();
    } else {
      setProfileResult({ success: false, message: res.errors?.general?.[0] ?? 'Failed to remove photo.' });
    }

    setIsUploadingAvatar(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-16">
      
      {/* --- CROP MODAL --- */}
      {imageToCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Crop Profile Photo</h3>
              <button onClick={() => setImageToCrop(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative w-full h-[350px] sm:h-[400px] bg-gray-900">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-6 bg-white space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Zoom</label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setImageToCrop(null)}
                  className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropAndUpload}
                  className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200"
                >
                  Crop & Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-90 shrink-0">
            <DashboardSidebar 
              userName={name} 
              userEmail={emailValue} 
              avatar={avatar} 
            />
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {/* ═══════ Profile Information Card ═══════ */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
              <div className="bg-purple-200 p-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-sm text-gray-600">Update Your Personal Details</p>
                  </div>
                </div>
              </div>

              <div className="p-8 pb-4">
                {profileResult && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
                      profileResult.success
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {profileResult.success ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{profileResult.message}</span>
                  </div>
                )}

                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-6 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                  <div className="relative shrink-0">
                    {avatarUrl && !avatarImageError ? (
                      <img 
                        src={avatarUrl} 
                        alt={name || 'User'} 
                        onError={() => setAvatarImageError(true)}
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md" 
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-md">
                        {name ? name[0].toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3 text-center sm:text-left">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
                      <p className="text-sm text-gray-500 mt-1">Upload a new photo (JPEG, PNG, WebP) up to 5MB.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                      <label className={`relative px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full cursor-pointer transition-colors flex items-center justify-center gap-2 overflow-hidden shadow-sm shadow-purple-200 ${isUploadingAvatar ? 'opacity-80 cursor-not-allowed' : ''}`}>
                        {isUploadingAvatar ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                        <span>{isUploadingAvatar ? 'Uploading...' : (avatar ? 'Change Photo' : 'Upload Photo')}</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/jpeg,image/png,image/webp" 
                          onChange={handleAvatarChange}
                          disabled={isUploadingAvatar}
                        />
                      </label>
                      
                      {avatar && (
                        <button 
                          type="button" 
                          onClick={handleAvatarDelete}
                          disabled={isUploadingAvatar}
                          className="px-5 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6 px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Student Name"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address (Cannot be changed)
                    </label>
                    <input
                      type="email"
                      readOnly
                      value={emailValue}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                      placeholder="student@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0172345672"
                    />
                  </div>

                  <div className="flex justify-end items-end">
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="px-10 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* ═══════ Security / Change Password Card ═══════ */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-red-600 p-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-700 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Security</h2>
                    <p className="text-sm text-white/80">Manage Your Password</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                {/* Result banner */}
                {result && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl mb-6 ${
                      result.success
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{result.message}</span>
                  </div>
                )}

                {!showPasswordForm ? (
                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(true)}
                    className="flex items-center justify-center md:justify-start gap-2 px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer w-full md:w-auto"
                  >
                    <KeyRound className="w-4 h-4" />
                    Change Password
                  </button>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="space-y-5 max-w-lg">
                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    {/* Current Password */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrent ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNew ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            confirmPassword && confirmPassword !== newPassword
                              ? 'border-red-400'
                              : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {confirmPassword && confirmPassword !== newPassword && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 px-8 py-3 w-full sm:w-auto bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Updating…
                          </>
                        ) : (
                          'Update Password'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPassword('');
                          setEmail('');
                          setResult(null);
                        }}
                        className="px-8 py-3 w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
