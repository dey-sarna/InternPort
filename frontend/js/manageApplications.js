const adminApplicationList = document.getElementById("adminApplicationList");

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

const loadApplications = async () => {
    adminApplicationList.innerHTML = "<p>Loading applications...</p>";

    try {
        const res = await fetch(`${API_BASE_URL}/applications`, {
            headers: authHeader()
        });

        const applications = await res.json();

        if (!res.ok) {
            adminApplicationList.innerHTML = `<p>${applications.message}</p>`;
            return;
        }

        if (applications.length === 0) {
            adminApplicationList.innerHTML = "<p>No applications found.</p>";
            return;
        }

        adminApplicationList.innerHTML = applications.map((app) => `
            <div class="admin-item application-item">
                <div>
                    <span class="status-badge ${getStatusClass(app.status)}">
                        ${app.status}
                    </span>

                    <h3>${app.student_name}</h3>

                    <p><strong>Email:</strong> ${app.student_email}</p>
                    <p><strong>Department:</strong> ${app.department || "Not mentioned"}</p>
                    <p><strong>Semester:</strong> ${app.semester || "Not mentioned"}</p>
                    <p><strong>Skills:</strong> ${app.skills || "Not mentioned"}</p>
                    <p><strong>Applied For:</strong> ${app.internship_title}</p>
                    <p><strong>Company:</strong> ${app.company}</p>
                    <p><strong>Applied Date:</strong> ${formatDate(app.applied_at)}</p>
                </div>

                <div class="action-buttons">
                    <button onclick="updateStatus(${app.application_id}, 'Accepted')">
                        Accept
                    </button>

                    <button class="danger-btn" onclick="updateStatus(${app.application_id}, 'Rejected')">
                        Reject
                    </button>
                </div>
            </div>
        `).join("");
    } catch {
        adminApplicationList.innerHTML = "<p>Failed to load applications.</p>";
    }
};

const updateStatus = async (applicationId, status) => {
    try {
        const res = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify({ status })
        });

        const data = await res.json();

        alert(data.message);

        if (res.ok) {
            loadApplications();
        }
    } catch {
        alert("Status update failed.");
    }
};

loadApplications();