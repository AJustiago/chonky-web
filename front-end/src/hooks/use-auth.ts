import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function isExpired(token: string) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 < Date.now();
    } catch (error) {
        console.error("Invalid token format", error);
        return true;
    }
}

function getToken(): string | null {
    const token = localStorage.getItem("auth_token");
    return token && tokenIsProbablyJwt(token) ? token : null;
}

function tokenIsProbablyJwt(token: string) {
    return token.split(".").length === 3;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token || isExpired(token)) {
            router.push("/admin/login");
        } else {
            setToken(token);
        }
    }, []);

    return token;
};
