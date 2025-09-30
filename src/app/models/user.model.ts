export interface User {
  id?: string;        // UUID gerado automaticamente
  username: string;   // Nome de usuário (obrigatório, único)
  password?: string;  // Senha (obrigatório, será hasheada)
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse {
  message: string;
  token?: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}
