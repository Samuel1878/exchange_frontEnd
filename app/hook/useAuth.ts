import { useCallback } from "react";
import { useAuthStore } from "~/store/useUserDataStore";
import { loginAPI, registerAPI, logoutAPI } from "~/api/authAPI";
import type { RegisterPayload } from "~/api/authAPI";

export function useAuthActions() {
  const loginStore = useAuthStore((s) => s.login);
  const logoutStore = useAuthStore((s) => s.logout);

  const login = useCallback(
    async (payload: {
      UserName?: string;
      Email?: string;
      PasswordHash: string;
    }) => {
      const resp = await loginAPI(payload);
      if (resp && resp.success && resp.accessToken) {
        loginStore(resp.data, resp.accessToken);
        return { success: true, message: resp.message ?? "Login success" };
      }
      return { success: false, message: resp.message ?? "Login failed" };
    },
    [loginStore]
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    const resp = await registerAPI(payload);
    if (resp && resp.success && resp.accessToken) {
      loginStore(resp.data, resp.accessToken);
      return { success: true, message: resp.message ?? "Registration success" };
    }
    return {
      success: false,
      message: resp.message ?? "Registration failed",
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch (err) {
      // continue anyway
    } finally {
      logoutStore();
    }
  }, [logoutStore]);

  return { login, register, logout };
}
