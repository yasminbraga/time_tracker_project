import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthState = {
  user?: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export const AuthContext = createContext({} as AuthState);

export function AuthProvider(props: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=29e96605fb0fba4fba67`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: githubCode,
    });

    const { token, user } = response.data;

    // salva no storage do navegador
    localStorage.setItem("@timetracker:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
    navigate("/dashboard");
  }

  function signOut() {
    localStorage.removeItem("@timetracker:token");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("@timetracker:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split("?code=");

      // limpar a url para o código não aparecer para o usuário
      window.history.pushState({}, "", urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
