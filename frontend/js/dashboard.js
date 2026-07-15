const user = JSON.parse(localStorage.getItem("user"));

if (!getToken() || !user) {
    window.location.href = "login.html";
}

const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || 0;
};

const loadStudentDashboard = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/dashboard/student`, {
            headers: authHeader()
        });

        const data = await res.json();

        setText("totalApplications", data.totalApplications);
        setText("acceptedApplications", data.acceptedApplications);
        setText("pendingApplications", data.pendingApplications);
        setText("rejectedApplications", data.rejectedApplications);
    } catch {
        alert("Failed to load dashboard");
    }
};

const loadAdminDashboard = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/dashboard/admin`, {
            headers: authHeader()
        });

        const data = await res.json();

        setText("totalStudents", data.totalStudents);
        setText("totalInternships", data.totalInternships);
        setText("totalApplications", data.totalApplications);
    } catch {
        alert("Failed to load dashboard");
    }
};

const logout = () => {
    localStorage.clear();
    window.location.href = "login.html";
};

if (user.role === "student") {
    loadStudentDashboard();
}

if (user.role === "admin") {
    loadAdminDashboard();
}