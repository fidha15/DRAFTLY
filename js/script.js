// DRAFTLY - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {

    const USERS_KEY = "DRAFTLY_users";
    const BLOGS_KEY = "DRAFTLY_blogs";
    const CURRENT_USER_KEY = "DRAFTLY_current_user";

    // Storage helpers

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    }

    function getBlogs() {
        return JSON.parse(localStorage.getItem(BLOGS_KEY) || "[]");
    }

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
    }

    function saveBlogs(blogs) {
        localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
    }
    // Sample articles for Explore Stories

function seedSampleArticles() {

    const existingBlogs = getBlogs();

    // Avoid adding sample articles repeatedly
    if (localStorage.getItem("DRAFTLY_samples_added")) {
        return;
    }

    const sampleArticles = [
        {
            id: 1001,
            title: "The Future of Artificial Intelligence",
            category: "Technology",
            excerpt: "How artificial intelligence is changing the way we live, work, and think.",
            content: "Artificial intelligence is transforming our everyday lives. From intelligent assistants to automated systems, technology is changing how people interact with the world. But the future of AI is not just about machines. It is about how humans choose to use them.",
            author: "Alex Morgan",
            authorEmail: null,
            date: "Nov 12, 2026",
            isSample: true
        },
        {
            id: 1002,
            title: "Designing for Simplicity",
            category: "Design",
            excerpt: "Why the most effective designs are often the simplest ones.",
            content: "Good design is not about adding more elements. It is about understanding what matters and removing everything that gets in the way. Simplicity creates clarity, improves usability, and makes experiences memorable.",
            author: "Sophie Williams",
            authorEmail: null,
            date: "Nov 14, 2026",
            isSample: true
        },
        {
            id: 1003,
            title: "Learning Beyond the Classroom",
            category: "Education",
            excerpt: "The lessons that come from curiosity, exploration, and experience.",
            content: "Education does not end when a classroom session finishes. Every project, conversation, mistake, and new experience offers an opportunity to learn. Curiosity is one of the most valuable tools a learner can develop.",
            author: "Daniel Reed",
            authorEmail: null,
            date: "Nov 15, 2026",
            isSample: true
        },
        {
            id: 1004,
            title: "Finding Balance in a Busy World",
            category: "Lifestyle",
            excerpt: "A thoughtful approach to managing everyday responsibilities.",
            content: "Modern life can feel busy and overwhelming. Creating small routines, making time for meaningful activities, and learning to prioritize can help bring more balance into everyday life.",
            author: "Emma Clarke",
            authorEmail: null,
            date: "Nov 17, 2026",
            isSample: true
        },
        {
            id: 1005,
            title: "A Journey Through the Mountains",
            category: "Travel",
            excerpt: "Exploring quiet landscapes and discovering the beauty of unfamiliar places.",
            content: "Travel is about more than reaching a destination. It is about the experiences along the way, the people we meet, and the places that make us pause and appreciate the world around us.",
            author: "Noah Bennett",
            authorEmail: null,
            date: "Nov 18, 2026",
            isSample: true
        },
        {
            id: 1006,
            title: "Stories That Connect Us",
            category: "Culture",
            excerpt: "How stories preserve traditions and bring different perspectives together.",
            content: "Stories carry memories, traditions, and perspectives across generations. They help us understand people whose experiences may be different from our own and remind us of the things we share.",
            author: "Olivia James",
            authorEmail: null,
            date: "Nov 19, 2026",
            isSample: true
        }
    ];

    saveBlogs([...sampleArticles, ...existingBlogs]);

    localStorage.setItem("DRAFTLY_samples_added", "true");
}

seedSampleArticles();

    function showMessage(message) {
        const element = document.getElementById("message");

        if (element) {
            element.textContent = message;
        }
    }

    function escapeHTML(text) {
        return String(text).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[character];
        });
    }

    // Registration

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!name || !email || !password || !confirmPassword) {
            showMessage("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match. Please try again.");
            return;
        }

        const users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            showMessage("This email is already registered.");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        showMessage("Account created successfully! Redirecting...");

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1000);
    });
}
    // Login

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;

            const users = getUsers();

            const user = users.find(function (account) {
                return account.email === email &&
                    account.password === password;
            });

            if (!user) {
                showMessage("Incorrect email or password.");
                return;
            }

            localStorage.setItem(
                CURRENT_USER_KEY,
                JSON.stringify({
                    name: user.name,
                    email: user.email
                })
            );

            showMessage("Login successful! Redirecting...");

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 800);
        });
    }

    // Logout

    const logoutButtons = document.querySelectorAll("[data-logout]");

    logoutButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            localStorage.removeItem(CURRENT_USER_KEY);
            window.location.href = "login.html";
        });
    });

    // Create blog

    const createBlogForm = document.getElementById("createBlogForm");

    if (createBlogForm) {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        createBlogForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("title").value.trim();
            const category = document.getElementById("category").value;
            const excerpt = document.getElementById("excerpt").value.trim();
            const content = document.getElementById("content").value.trim();

            if (!title || !category || !excerpt || !content) {
                showMessage("Please complete all fields.");
                return;
            }

            const blogs = getBlogs();

            const newBlog = {
                id: Date.now(),
                title: title,
                category: category,
                excerpt: excerpt,
                content: content,
                author: currentUser.name,
                authorEmail: currentUser.email,
                date: new Date().toLocaleDateString()
            };

            blogs.unshift(newBlog);

            saveBlogs(blogs);

            showMessage("Your article has been published!");

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 1000);
        });
    }

    // Article card

    function createArticleCard(blog) {

    const categoryStyles = {
        Technology: "visual-tech",
        Design: "visual-design",
        Education: "visual-education",
        Lifestyle: "visual-lifestyle",
        Travel: "visual-travel",
        Culture: "visual-culture"
    };

    const visualClass = categoryStyles[blog.category] || "visual-default";

    return `
        <article class="article-card">

            <div class="article-visual ${visualClass}">
                <span class="visual-label">${escapeHTML(blog.category)}</span>
            </div>

            <div class="article-content">

                <span class="article-category">
                    ${escapeHTML(blog.category)}
                </span>

                <h3>${escapeHTML(blog.title)}</h3>

                <p>${escapeHTML(blog.excerpt)}</p>

                <div class="article-meta">
                    By ${escapeHTML(blog.author)}
                    · ${escapeHTML(blog.date)}
                </div>

                <a href="#" class="read-more"
                   data-read="${blog.id}">
                   Read story →
                </a>

            </div>

        </article>
    `;
}

    // Article modal

    function openArticle(blog) {
        const modal = document.getElementById("articleModal");

        if (!modal) return;

        document.getElementById("modalCategory").textContent = blog.category;
        document.getElementById("modalTitle").textContent = blog.title;
        document.getElementById("modalAuthor").textContent =
            "By " + blog.author + " · " + blog.date;
        document.getElementById("modalBody").textContent = blog.content;

        modal.style.display = "block";
    }

    const closeModal = document.querySelector("[data-close-modal]");

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            document.getElementById("articleModal").style.display = "none";
        });
    }

    // Homepage articles

    const articleGrid = document.getElementById("articleGrid");

    if (articleGrid) {
        const searchInput = document.getElementById("searchInput");
        const topicButtons = document.querySelectorAll("[data-category]");

        let selectedCategory = "All";

        function renderArticles() {
            const blogs = getBlogs();

            const searchText = searchInput.value.toLowerCase();

            const filteredBlogs = blogs.filter(function (blog) {
                const matchesCategory =
                    selectedCategory === "All" ||
                    blog.category === selectedCategory;

                const matchesSearch =
                    blog.title.toLowerCase().includes(searchText) ||
                    blog.excerpt.toLowerCase().includes(searchText) ||
                    blog.author.toLowerCase().includes(searchText);

                return matchesCategory && matchesSearch;
            });

            if (filteredBlogs.length === 0) {
                articleGrid.innerHTML = `
                    <div class="empty-state">
                        <h3>No articles found.</h3>
                        <p>Try another search or explore a different category.</p>
                    </div>
                `;
            } else {
                articleGrid.innerHTML =
                    filteredBlogs.map(createArticleCard).join("");
            }
        }

        searchInput.addEventListener("input", renderArticles);

        topicButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                selectedCategory = button.dataset.category;

                topicButtons.forEach(function (item) {
                    item.classList.remove("active");
                });

                button.classList.add("active");

                renderArticles();
            });
        });

        articleGrid.addEventListener("click", function (event) {
            const link = event.target.closest("[data-read]");

            if (!link) return;

            event.preventDefault();

            const id = Number(link.dataset.read);

            const blog = getBlogs().find(item => item.id === id);

            if (blog) {
                openArticle(blog);
            }
        });

        renderArticles();
    }

    // Dashboard

    const dashboardGrid = document.getElementById("dashboardGrid");

    if (dashboardGrid) {
        const currentUser = getCurrentUser();

        if (!currentUser) {
            window.location.href = "login.html";
            return;
        }

        const welcome = document.getElementById("welcomeName");

        if (welcome) {
            welcome.textContent = currentUser.name;
        }
        // Profile Summary

document.getElementById("profileName").textContent = currentUser.name;

document.getElementById("profileEmail").textContent = currentUser.email;

document.getElementById("profileInitial").textContent =
    currentUser.name.charAt(0).toUpperCase();

        function renderDashboard() {
            const myBlogs = getBlogs().filter(function (blog) {
                return blog.authorEmail === currentUser.email;
            });
            const totalArticles = myBlogs.length;

const publishedArticles = myBlogs.filter(function (blog) {
    return blog.status !== "draft";
});

const draftArticles = myBlogs.filter(function (blog) {
    return blog.status === "draft";
});

document.getElementById("totalArticleCount").textContent = totalArticles;

document.getElementById("publishedCount").textContent = publishedArticles.length;

document.getElementById("draftCount").textContent = draftArticles.length;

            const count = document.getElementById("blogCount");

            if (count) {
                count.textContent = myBlogs.length;
            }

            if (myBlogs.length === 0) {
                dashboardGrid.innerHTML = `
                    <div class="empty-state">
                        <h3>Your writing journey starts here.</h3>
                        <p>You haven't published any articles yet.</p>

                        <a href="create-blog.html" class="btn btn-primary">
                            Write your first article
                        </a>
                    </div>
                `;
            } else {
                dashboardGrid.innerHTML = myBlogs.map(function (blog) {
                    return `
                        <div>
                            ${createArticleCard(blog)}

                            <button class="btn btn-danger"
                                data-delete="${blog.id}"
                                style="margin-top: 10px;">
                                Delete article
                            </button>
                        </div>
                    `;
                }).join("");
            }
        }

        renderDashboard();

        dashboardGrid.addEventListener("click", function (event) {
            const deleteButton = event.target.closest("[data-delete]");

            if (!deleteButton) return;

            const id = Number(deleteButton.dataset.delete);

            if (!confirm("Are you sure you want to delete this article?")) {
                return;
            }

            const updatedBlogs = getBlogs().filter(function (blog) {
                return !(
                    blog.id === id &&
                    blog.authorEmail === currentUser.email
                );
            });

            saveBlogs(updatedBlogs);

            renderDashboard();
        });

        dashboardGrid.addEventListener("click", function (event) {
            const link = event.target.closest("[data-read]");

            if (!link) return;

            event.preventDefault();

            const id = Number(link.dataset.read);

            const blog = getBlogs().find(item => item.id === id);

            if (blog) {
                openArticle(blog);
            }
        });
    }
// Show / Hide Password

const passwordToggles = document.querySelectorAll("[data-toggle-password]");

passwordToggles.forEach(function (button) {

    button.addEventListener("click", function () {

        const inputId = button.dataset.togglePassword;
        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            button.textContent = "Show";
        }

    });

});
// Article Word Counter

const articleContent = document.getElementById("content");
const wordCount = document.getElementById("wordCount");

if (articleContent && wordCount) {

    articleContent.addEventListener("input", function () {

        const text = articleContent.value.trim();

        const words = text ? text.split(/\s+/).length : 0;

        wordCount.textContent = words;

    });

}
// Description Character Counter

const excerptInput = document.getElementById("excerpt");
const charCount = document.getElementById("charCount");

if (excerptInput && charCount) {

    excerptInput.addEventListener("input", function () {
        charCount.textContent = excerptInput.value.length;
    });

}
});