const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://49.50.138.93:4110';

// ---------- token ----------
export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('monopage_token') : null;

export const setToken = (token: string) =>
  localStorage.setItem('monopage_token', token);

export const clearToken = () =>
  localStorage.removeItem('monopage_token');

// ---------- fetch wrapper ----------
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || err.error || '요청 실패');
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---------- auth ----------
export const signup = (email: string, password: string, username: string) =>
  request<{ token: string; user: any; profile: any }>('/api/v1/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
  });

export const login = (email: string, password: string) =>
  request<{ token: string; user: any; profile: any }>('/api/v1/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

// ---------- profile ----------
export const getMyProfile = () =>
  request<any>('/api/v1/profile');

export const updateProfile = (data: { bio?: string; avatar_url?: string; username?: string }) =>
  request<any>('/api/v1/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const getPublicProfile = (username: string) =>
  request<any>(`/api/v1/profiles/${username}`);

// ---------- links ----------
export const getLinks = () =>
  request<any[]>('/api/v1/links');

export const createLink = (title: string, url: string) =>
  request<any>('/api/v1/links', {
    method: 'POST',
    body: JSON.stringify({ title, url }),
  });

export const updateLink = (id: number, data: { title?: string; url?: string }) =>
  request<any>(`/api/v1/links/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const deleteLink = (id: number) =>
  request<void>(`/api/v1/links/${id}`, { method: 'DELETE' });
