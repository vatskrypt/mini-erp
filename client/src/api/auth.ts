import api from "./axios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data.data;
}
