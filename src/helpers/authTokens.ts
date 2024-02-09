export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  if (typeof window === "undefined") return undefined;

  if (!localStorage.getItem("authToken")) return undefined;

  const token = localStorage.getItem("authToken");

  if (token) {
    return localStorage.getItem("authToken");
  }
};

export const setEmail = (email: string) => {
  sessionStorage.setItem("email", JSON.stringify(email));
};

export const getEmail = () => {
  return sessionStorage.getItem("email");
  // return email ? JSON.parse(email) : null;
};

export const setWorkspaceToken = (token: string) => {
  localStorage.setItem("workspaceToken", token);
};

export const getWorkspaceToken = () => {
  if (typeof window === "undefined") return undefined;

  if (!localStorage.getItem("workspaceToken")) return undefined;

  const token = localStorage.getItem("workspaceToken");

  if (token) {
    return localStorage.getItem("workspaceToken");
  }
};

export const removeToken = (arg: string) => {
  localStorage.removeItem(arg);
};
