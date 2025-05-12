import { loginUser, logoutUser } from '@/models/authModel';

export async function handleLogin(email: string, password: string) {
  try {
    const userCredential = await loginUser(email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleLogout() {
  try {
    await logoutUser();
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
