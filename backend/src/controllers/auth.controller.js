import * as authService from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';

export const signup = catchAsync(async (req, res) => {
  const data = await authService.signup(req.body);
  res.status(201).json({ success: true, data });
});

export const login = catchAsync(async (req, res) => {
  const data = await authService.login(req.body);
  res.json({ success: true, data });
});

export const refresh = catchAsync(async (req, res) => {
  const data = await authService.refresh(req.body.refreshToken);
  res.json({ success: true, data });
});

export const logout = catchAsync(async (req, res) => {
  await authService.logout(req.userId);
  res.json({ success: true, message: 'Logged out' });
});

export const getProfile = catchAsync(async (req, res) => {
  const user = await authService.getProfile(req.userId);
  res.json({ success: true, data: { user } });
});

export const updateProfile = catchAsync(async (req, res) => {
  const user = await authService.updateProfile(req.userId, req.body);
  res.json({ success: true, data: { user } });
});

export const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.userId, req.body.currentPassword, req.body.newPassword);
  res.json({ success: true, message: 'Password changed' });
});
