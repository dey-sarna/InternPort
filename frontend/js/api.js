const API_BASE_URL = "http://localhost:5000/api";

const getToken = () => {
    return localStorage.getItem("token");
};

const authHeader = () => {
    const token = getToken();

    return {
        "Content-Type": "application/json",
        ...(token && {
            Authorization: `Bearer ${token}`
        })
    };
};