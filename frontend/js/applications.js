const applicationList = document.getElementById("applicationList");

if (!getToken()) {
    window.location.href = "login.html";
}

const logout = () => {
    localStorage.clear();
    window.location.href = "login.html";
};

const formatDate = (dateValue) => {
    if (!dateValue) return "Not mentioned";
    return new Date(dateValue).toLocaleDateString();
};

const getStatusClass = (status) => {
    if (status === "Accepted") return "accepted";
    if (status === "Rejected") return "rejected";
    return "pending";
};

const loadMyApplications = async () => {
    applicationList.innerHTML = "<p>Loading applications...</p>";

    try {
        const res = await fetch(`${API_BASE_URL}/applications/my-applications`, {
            headers: authHeader()
        });

        const applications = await res.json();

        if (!res.ok) {
            applicationList.innerHTML = `<p>${applications.message}</p>`;
            return;
        }

        if (applications.length === 0) {
            applicationList.innerHTML = "<p>You have not applied for any internship yet.</p>";
            return;
        }

        applicationList.innerHTML = applications.map((app) => `
            <div class="info-card">
                <span class="status-badge ${getStatusClass(app.status)}">
                    ${app.status}
                </span>

                <h3>${app.title}</h3>

                <p><strong>Company:</strong> ${app.company}</p>
                <p><strong>Location:</strong> ${app.location || "Not mentioned"}</p>
                <p><strong>Type:</strong> ${app.type || "Not mentioned"}</p>
                <p><strong>Duration:</strong> ${app.duration || "Not mentioned"}</p>
                <p><strong>Deadline:</strong> ${formatDate(app.deadline)}</p>
                <p><strong>Applied:</strong> ${formatDate(app.applied_at)}</p>
            </div>
        `).join("");
    } catch {
        applicationList.innerHTML = "<p>Failed to load applications.</p>";
    }
};

loadMyApplications();