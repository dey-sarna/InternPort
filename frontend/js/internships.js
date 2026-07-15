const internshipList = document.getElementById("internshipList");
const detailsContainer = document.getElementById("detailsContainer");
const message = document.getElementById("message");

if (!getToken()) {
    window.location.href = "login.html";
}

const logout = () => {
    localStorage.clear();
    window.location.href = "login.html";
};

const buildQuery = () => {
    const search = document.getElementById("searchInput")?.value.trim();
    const location = document.getElementById("locationInput")?.value.trim();
    const type = document.getElementById("typeInput")?.value;

    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (location) params.append("location", location);
    if (type) params.append("type", type);

    return params.toString();
};

const formatDate = (dateValue) => {
    if (!dateValue) return "Not mentioned";
    return new Date(dateValue).toLocaleDateString();
};

const loadInternships = async () => {
    if (!internshipList) return;

    internshipList.innerHTML = "<p>Loading internships...</p>";

    try {
        const query = buildQuery();

        const res = await fetch(`${API_BASE_URL}/internships?${query}`);
        const internships = await res.json();

        if (!res.ok) {
            internshipList.innerHTML = `<p>${internships.message}</p>`;
            return;
        }

        if (internships.length === 0) {
            internshipList.innerHTML = "<p>No internships found.</p>";
            return;
        }

        internshipList.innerHTML = internships.map((internship) => `
            <div class="info-card">
                <span class="status-badge">${internship.type || "N/A"}</span>
                <h3>${internship.title}</h3>
                <p><strong>Company:</strong> ${internship.company}</p>
                <p><strong>Location:</strong> ${internship.location || "Not mentioned"}</p>
                <p><strong>Duration:</strong> ${internship.duration || "Not mentioned"}</p>
                <p><strong>Deadline:</strong> ${formatDate(internship.deadline)}</p>
                <a class="small-btn" href="internship-details.html?id=${internship.internship_id}">
                    View Details
                </a>
            </div>
        `).join("");
    } catch {
        internshipList.innerHTML = "<p>Failed to load internships.</p>";
    }
};

const loadInternshipDetails = async () => {
    if (!detailsContainer) return;

    const params = new URLSearchParams(window.location.search);
    const internshipId = params.get("id");

    if (!internshipId) {
        detailsContainer.innerHTML = "<p>Internship not found.</p>";
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/internships/${internshipId}`);
        const internship = await res.json();

        if (!res.ok) {
            detailsContainer.innerHTML = `<p>${internship.message}</p>`;
            return;
        }

        detailsContainer.innerHTML = `
            <div class="details-card">
                <span class="status-badge">${internship.type || "N/A"}</span>
                <h1>${internship.title}</h1>
                <p><strong>Company:</strong> ${internship.company}</p>
                <p><strong>Location:</strong> ${internship.location || "Not mentioned"}</p>
                <p><strong>Duration:</strong> ${internship.duration || "Not mentioned"}</p>
                <p><strong>Deadline:</strong> ${formatDate(internship.deadline)}</p>

                <hr>

                <h3>Description</h3>
                <p>${internship.description || "No description available."}</p>

                <h3>Requirements</h3>
                <p>${internship.requirements || "No requirements mentioned."}</p>

                <button class="small-btn" onclick="applyForInternship(${internship.internship_id})">
                    Apply Now
                </button>
            </div>
        `;
    } catch {
        detailsContainer.innerHTML = "<p>Failed to load internship details.</p>";
    }
};

const applyForInternship = async (internshipId) => {
    try {
        const res = await fetch(`${API_BASE_URL}/applications/apply/${internshipId}`, {
            method: "POST",
            headers: authHeader()
        });

        const data = await res.json();

        message.textContent = data.message;
        message.style.color = res.ok ? "green" : "red";
    } catch {
        message.textContent = "Application failed.";
        message.style.color = "red";
    }
};

loadInternships();
loadInternshipDetails();