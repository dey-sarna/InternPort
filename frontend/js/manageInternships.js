const internshipForm = document.getElementById("internshipForm");
const adminInternshipList = document.getElementById("adminInternshipList");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

if (!getToken()) {
    window.location.href = "login.html";
}

const logout = () => {
    localStorage.clear();
    window.location.href = "login.html";
};

const getInputValue = (id) => document.getElementById(id).value.trim();

const setInputValue = (id, value) => {
    document.getElementById(id).value = value || "";
};

const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";
    return new Date(dateValue).toISOString().split("T")[0];
};

const formatDate = (dateValue) => {
    if (!dateValue) return "Not mentioned";
    return new Date(dateValue).toLocaleDateString();
};

const getFormData = () => ({
    title: getInputValue("title"),
    company: getInputValue("company"),
    location: getInputValue("location"),
    type: getInputValue("type"),
    duration: getInputValue("duration"),
    description: getInputValue("description"),
    requirements: getInputValue("requirements"),
    deadline: getInputValue("deadline") || null
});

const resetForm = () => {
    internshipForm.reset();
    setInputValue("internshipId", "");
    submitBtn.textContent = "Add Internship";
};

const loadAdminInternships = async () => {
    adminInternshipList.innerHTML = "<p>Loading internships...</p>";

    try {
        const res = await fetch(`${API_BASE_URL}/internships`);
        const internships = await res.json();

        if (!res.ok) {
            adminInternshipList.innerHTML = `<p>${internships.message}</p>`;
            return;
        }

        if (internships.length === 0) {
            adminInternshipList.innerHTML = "<p>No internships available.</p>";
            return;
        }

        adminInternshipList.innerHTML = internships.map((item) => `
            <div class="admin-item">
                <div>
                    <span class="status-badge">${item.type}</span>
                    <h3>${item.title}</h3>
                    <p>${item.company} • ${item.location || "No location"} • ${formatDate(item.deadline)}</p>
                </div>

                <div class="action-buttons">
                    <button onclick='editInternship(${JSON.stringify(item)})'>Edit</button>
                    <button class="danger-btn" onclick="deleteInternship(${item.internship_id})">Delete</button>
                </div>
            </div>
        `).join("");
    } catch {
        adminInternshipList.innerHTML = "<p>Failed to load internships.</p>";
    }
};

internshipForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const internshipId = getInputValue("internshipId");
    const formData = getFormData();

    const url = internshipId
        ? `${API_BASE_URL}/internships/${internshipId}`
        : `${API_BASE_URL}/internships`;

    const method = internshipId ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: authHeader(),
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        message.textContent = data.message;
        message.style.color = res.ok ? "green" : "red";

        if (res.ok) {
            resetForm();
            loadAdminInternships();
        }
    } catch {
        message.textContent = "Operation failed.";
        message.style.color = "red";
    }
});

const editInternship = (item) => {
    setInputValue("internshipId", item.internship_id);
    setInputValue("title", item.title);
    setInputValue("company", item.company);
    setInputValue("location", item.location);
    setInputValue("type", item.type);
    setInputValue("duration", item.duration);
    setInputValue("description", item.description);
    setInputValue("requirements", item.requirements);
    setInputValue("deadline", formatDateForInput(item.deadline));

    submitBtn.textContent = "Update Internship";
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const deleteInternship = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this internship?");

    if (!confirmDelete) return;

    try {
        const res = await fetch(`${API_BASE_URL}/internships/${id}`, {
            method: "DELETE",
            headers: authHeader()
        });

        const data = await res.json();

        message.textContent = data.message;
        message.style.color = res.ok ? "green" : "red";

        if (res.ok) {
            loadAdminInternships();
        }
    } catch {
        message.textContent = "Delete failed.";
        message.style.color = "red";
    }
};

loadAdminInternships();