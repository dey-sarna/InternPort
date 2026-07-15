const profileForm = document.getElementById("profileForm");
const message = document.getElementById("message");

if (!getToken()) {
    window.location.href = "login.html";
}

const setValue = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.value = value || "";
};

const getValue = (id) => {
    return document.getElementById(id).value.trim();
};

const loadProfile = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/students/profile`, {
            headers: authHeader()
        });

        const data = await res.json();

        if (!res.ok) {
            message.textContent = data.message;
            message.style.color = "red";
            return;
        }

        setValue("name", data.name);
        setValue("email", data.email);
        setValue("department", data.department);
        setValue("semester", data.semester);
        setValue("phone", data.phone);
        setValue("skills", data.skills);
        setValue("bio", data.bio);
    } catch {
        message.textContent = "Failed to load profile";
        message.style.color = "red";
    }
};

profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const profileData = {
        name: getValue("name"),
        department: getValue("department"),
        semester: getValue("semester"),
        phone: getValue("phone"),
        skills: getValue("skills"),
        bio: getValue("bio")
    };

    try {
        const res = await fetch(`${API_BASE_URL}/students/profile`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify(profileData)
        });

        const data = await res.json();

        message.textContent = data.message;
        message.style.color = res.ok ? "green" : "red";
    } catch {
        message.textContent = "Profile update failed";
        message.style.color = "red";
    }
});

const logout = () => {
    localStorage.clear();
    window.location.href = "login.html";
};

loadProfile();