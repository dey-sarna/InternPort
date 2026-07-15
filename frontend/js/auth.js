const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");


if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            message.textContent = "Please fill in all fields";
            message.style.color = "red";
            return;
        }

        if (password.length < 6) {
            message.textContent =
                "Password must be at least 6 characters long";
            message.style.color = "red";
            return;
        }

        const userData = {
            name,
            email,
            password
        };

        try {
            const res = await fetch(
                `${API_BASE_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                }
            );

            const data = await res.json();

            message.textContent =
                data.message || "Registration request completed";

            if (res.ok) {
                message.style.color = "green";
                registerForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1000);
            } else {
                message.style.color = "red";
            }
        } catch (error) {
            console.error("Registration error:", error);

            message.textContent =
                "Unable to connect to the server";
            message.style.color = "red";
        }
    });
}


if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            message.textContent =
                "Email and password are required";
            message.style.color = "red";
            return;
        }

        const loginData = {
            email,
            password
        };

        try {
            const res = await fetch(
                `${API_BASE_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            );

            const data = await res.json();

            message.textContent =
                data.message || "Login request completed";

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                message.style.color = "green";

                if (data.user.role === "admin") {
                    window.location.href =
                        "admin-dashboard.html";
                } else {
                    window.location.href =
                        "student-dashboard.html";
                }
            } else {
                message.style.color = "red";
            }
        } catch (error) {
            console.error("Login error:", error);

            message.textContent =
                "Unable to connect to the server";
            message.style.color = "red";
        }
    });
}