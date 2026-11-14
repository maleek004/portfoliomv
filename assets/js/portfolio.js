/**
 * Student Portfolio & Academic Management Platform
 * Student: Abdulmaleek Mubaraq (B.Sc. Software Engineering, MIVA Open University)
 *
 * Demonstrates:
 * 1. Arrays and Functions
 * 2. Event Handling
 * 3. DOM Manipulation & Dynamic Content Updates
 * 4. Interactive Task Management System (Academic Planner)
 * 5. Contact Form Validation (Non-empty, Valid Email, Digits-Only Phone Number)
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'miva_student_academic_tasks_v1';

    // Default sample tasks array for B.Sc. Software Engineering at MIVA Open University
    const DEFAULT_TASKS = [
        {
            id: 'task-1',
            title: 'Build & deploy multi-page student portfolio website',
            course: 'Web Technologies',
            priority: 'High',
            dueDate: '2026-11-20',
            completed: true
        },
        {
            id: 'task-2',
            title: 'Implement JavaScript form validation & interactive task planner',
            course: 'Web Technologies',
            priority: 'High',
            dueDate: '2026-11-18',
            completed: true
        },
        {
            id: 'task-3',
            title: 'Complete Software Requirements Specification (SRS) lab exercise',
            course: 'SEN 102 - Software Engineering',
            priority: 'Medium',
            dueDate: '2026-11-25',
            completed: false
        },
        {
            id: 'task-4',
            title: 'Optimize YouTube Data API pipeline refresh in Microsoft Fabric',
            course: 'Data Engineering Project',
            priority: 'Medium',
            dueDate: '2026-11-28',
            completed: false
        },
        {
            id: 'task-5',
            title: 'Review discrete structures & algorithm complexity lecture notes',
            course: 'MTH 101 - Mathematics',
            priority: 'Low',
            dueDate: '2026-12-02',
            completed: false
        }
    ];

    // State variables using Arrays
    let tasks = [];
    let currentTaskFilter = 'all';

    // =========================================================================
    // 1. NAVIGATION ACTIVE PAGE HIGHLIGHTING
    // =========================================================================
    function initNavigation() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('#nav ul li a');

        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    // =========================================================================
    // 2. PROJECTS PAGE FILTERING (Arrays, Functions & DOM Manipulation)
    // =========================================================================
    function initProjectsFilter() {
        const filterButtons = Array.from(document.querySelectorAll('.filter-btn[data-category]'));
        const projectCards = Array.from(document.querySelectorAll('.project-card[data-category]'));
        const countDisplay = document.getElementById('project-count-label');

        if (filterButtons.length === 0 || projectCards.length === 0) {
            return;
        }

        function filterProjectsByCategory(category) {
            let visibleCount = 0;

            projectCards.forEach(function (card) {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                const matches = category === 'all' || categories.includes(category);

                if (matches) {
                    card.style.display = 'flex';
                    visibleCount += 1;
                } else {
                    card.style.display = 'none';
                }
            });

            if (countDisplay) {
                countDisplay.textContent = 'Showing ' + visibleCount + ' of ' + projectCards.length + ' projects';
            }
        }

        filterButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                filterButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                const selectedCategory = button.getAttribute('data-category');
                filterProjectsByCategory(selectedCategory);
            });
        });
    }

    // =========================================================================
    // 3. INTERACTIVE ACADEMIC PLANNER (Add, Complete, Delete, Filter Tasks)
    // =========================================================================
    function loadTasksFromStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    tasks = parsed;
                    return;
                }
            }
        } catch (err) {
            console.warn('Could not read tasks from localStorage:', err);
        }
        tasks = DEFAULT_TASKS.map(function (item) {
            return Object.assign({}, item);
        });
    }

    function saveTasksToStorage() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (err) {
            console.warn('Could not save tasks to localStorage:', err);
        }
    }

    function updatePlannerStats() {
        const totalEl = document.getElementById('planner-total-count');
        const completedEl = document.getElementById('planner-completed-count');
        const pendingEl = document.getElementById('planner-pending-count');
        const progressEl = document.getElementById('planner-progress-fill');
        const progressTextEl = document.getElementById('planner-progress-text');

        if (!totalEl) return;

        const total = tasks.length;
        const completed = tasks.filter(function (t) { return t.completed; }).length;
        const pending = total - completed;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        totalEl.textContent = String(total);
        completedEl.textContent = String(completed);
        pendingEl.textContent = String(pending);

        if (progressEl) {
            progressEl.style.width = percentage + '%';
        }
        if (progressTextEl) {
            progressTextEl.textContent = percentage + '% Completed (' + completed + ' of ' + total + ' tasks)';
        }
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.setAttribute('data-task-id', task.id);

        const leftDiv = document.createElement('div');
        leftDiv.className = 'task-item-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = Boolean(task.completed);
        checkbox.setAttribute('aria-label', 'Mark "' + task.title + '" as completed');
        checkbox.addEventListener('change', function () {
            toggleTaskCompletion(task.id);
        });

        const textWrap = document.createElement('div');

        const titleSpan = document.createElement('span');
        titleSpan.className = 'task-title-text';
        titleSpan.textContent = task.title;

        const metaRow = document.createElement('div');
        metaRow.className = 'task-meta-row';

        const courseTag = document.createElement('span');
        courseTag.className = 'task-tag';
        courseTag.textContent = task.course;

        const priorityTag = document.createElement('span');
        priorityTag.className = 'task-tag priority-' + task.priority;
        priorityTag.textContent = task.priority + ' Priority';

        const dateTag = document.createElement('span');
        dateTag.className = 'task-tag';
        dateTag.textContent = 'Due: ' + (task.dueDate || 'Flexible');

        metaRow.appendChild(courseTag);
        metaRow.appendChild(priorityTag);
        metaRow.appendChild(dateTag);

        textWrap.appendChild(titleSpan);
        textWrap.appendChild(metaRow);

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(textWrap);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'button task-btn toggle-btn';
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.addEventListener('click', function () {
            toggleTaskCompletion(task.id);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'button task-btn delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', 'Delete task "' + task.title + '"');
        deleteBtn.addEventListener('click', function () {
            deleteTask(task.id);
        });

        actionsDiv.appendChild(toggleBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(leftDiv);
        li.appendChild(actionsDiv);

        return li;
    }

    function renderTasks() {
        const listEl = document.getElementById('planner-task-list');
        const emptyEl = document.getElementById('planner-empty-state');
        if (!listEl) return;

        listEl.innerHTML = '';

        const filteredTasks = tasks.filter(function (task) {
            if (currentTaskFilter === 'completed') return task.completed;
            if (currentTaskFilter === 'pending') return !task.completed;
            return true;
        });

        if (filteredTasks.length === 0) {
            if (emptyEl) emptyEl.style.display = 'block';
        } else {
            if (emptyEl) emptyEl.style.display = 'none';
            filteredTasks.forEach(function (task) {
                listEl.appendChild(createTaskElement(task));
            });
        }

        updatePlannerStats();
    }

    function addTask(title, course, priority, dueDate) {
        const newTask = {
            id: 'task-' + Date.now(),
            title: title.trim(),
            course: course || 'Web Technologies',
            priority: priority || 'Medium',
            dueDate: dueDate || '2026-11-30',
            completed: false
        };
        tasks.unshift(newTask);
        saveTasksToStorage();
        renderTasks();
    }

    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(function (task) {
            if (task.id === taskId) {
                return Object.assign({}, task, { completed: !task.completed });
            }
            return task;
        });
        saveTasksToStorage();
        renderTasks();
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(function (task) {
            return task.id !== taskId;
        });
        saveTasksToStorage();
        renderTasks();
    }

    function initAcademicPlanner() {
        const plannerForm = document.getElementById('planner-add-form');
        if (!plannerForm) return;

        loadTasksFromStorage();
        renderTasks();

        const titleInput = document.getElementById('task-title');
        const courseSelect = document.getElementById('task-course');
        const prioritySelect = document.getElementById('task-priority');
        const dateInput = document.getElementById('task-due-date');
        const errorMsg = document.getElementById('task-title-error');
        const feedbackBanner = document.getElementById('planner-feedback');

        plannerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const titleVal = titleInput.value.trim();
            if (!titleVal) {
                titleInput.classList.add('user-invalid-fallback');
                titleInput.setAttribute('aria-invalid', 'true');
                if (errorMsg) errorMsg.classList.add('visible');
                titleInput.focus();
                return;
            }

            titleInput.classList.remove('user-invalid-fallback');
            titleInput.setAttribute('aria-invalid', 'false');
            if (errorMsg) errorMsg.classList.remove('visible');

            addTask(
                titleVal,
                courseSelect ? courseSelect.value : 'Web Technologies',
                prioritySelect ? prioritySelect.value : 'Medium',
                dateInput ? dateInput.value : ''
            );

            plannerForm.reset();

            if (feedbackBanner) {
                feedbackBanner.textContent = 'Task "' + titleVal + '" added to your academic planner!';
                feedbackBanner.className = 'form-status-banner success';
                setTimeout(function () {
                    feedbackBanner.className = 'form-status-banner';
                }, 3500);
            }
        });

        if (titleInput) {
            titleInput.addEventListener('input', function () {
                if (titleInput.value.trim() !== '') {
                    titleInput.classList.remove('user-invalid-fallback');
                    titleInput.setAttribute('aria-invalid', 'false');
                    if (errorMsg) errorMsg.classList.remove('visible');
                }
            });
        }

        // Filter buttons inside planner
        const filterButtons = document.querySelectorAll('.planner-filter-btn');
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentTaskFilter = btn.getAttribute('data-filter') || 'all';
                renderTasks();
            });
        });

        // Clear Completed button
        const clearCompletedBtn = document.getElementById('planner-clear-completed');
        if (clearCompletedBtn) {
            clearCompletedBtn.addEventListener('click', function () {
                tasks = tasks.filter(function (task) { return !task.completed; });
                saveTasksToStorage();
                renderTasks();
            });
        }

        // Reset Sample Tasks button
        const resetTasksBtn = document.getElementById('planner-reset-tasks');
        if (resetTasksBtn) {
            resetTasksBtn.addEventListener('click', function () {
                tasks = DEFAULT_TASKS.map(function (item) { return Object.assign({}, item); });
                saveTasksToStorage();
                renderTasks();
            });
        }
    }

    // =========================================================================
    // 4. CONTACT FORM VALIDATION (No empty field, Valid Email, Digits-Only Phone)
    // =========================================================================
    function linkError(el, shown) {
        const errorId = el.dataset.error;
        if (!errorId) return;
        const ids = (el.getAttribute('aria-describedby') || '')
            .split(/\s+/)
            .filter(function (id) { return id && id !== errorId; });
        if (shown) ids.push(errorId);
        if (ids.length) {
            el.setAttribute('aria-describedby', ids.join(' '));
        } else {
            el.removeAttribute('aria-describedby');
        }
    }

    function validateContactField(input) {
        const val = input.value.trim();
        const fieldName = input.name;
        const errorEl = input.dataset.error ? document.getElementById(input.dataset.error) : null;
        let errorMessage = '';

        // Rule 1: No field is empty
        if (val === '') {
            if (fieldName === 'name') {
                errorMessage = 'Please enter your full name. This field cannot be empty.';
            } else if (fieldName === 'email') {
                errorMessage = 'Please enter your email address. This field cannot be empty.';
            } else if (fieldName === 'phone') {
                errorMessage = 'Please enter your phone number. This field cannot be empty.';
            } else if (fieldName === 'message') {
                errorMessage = 'Please enter a message before submitting.';
            } else {
                errorMessage = 'This field is required and cannot be empty.';
            }
        } else if (fieldName === 'email') {
            // Rule 2: Email format is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(val)) {
                errorMessage = 'Enter a valid email address in the format you@example.com.';
            }
        } else if (fieldName === 'phone') {
            // Rule 3: Phone number contains only digits
            const digitsOnlyRegex = /^\d+$/;
            if (!digitsOnlyRegex.test(val)) {
                errorMessage = 'Phone number must contain only digits (0-9) with no spaces, letters, or symbols.';
            } else if (val.length < 7 || val.length > 15) {
                errorMessage = 'Please enter a valid phone number containing between 7 and 15 digits.';
            }
        }

        const isValid = errorMessage === '';
        input.setCustomValidity(errorMessage);
        input.classList.toggle('user-invalid-fallback', !isValid);
        input.classList.toggle('user-valid-fallback', isValid);
        input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
        linkError(input, !isValid);

        if (errorEl) {
            errorEl.innerHTML = isValid
                ? ''
                : '<span role="img" aria-label="Error">❌</span> ' + errorMessage;
            errorEl.classList.toggle('visible', !isValid);
        }

        return isValid;
    }

    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        const fields = Array.from(contactForm.querySelectorAll('input, textarea'));
        const statusBanner = document.getElementById('contact-form-status');
        const submitBtn = document.getElementById('contact-submit-btn');
        const editedSet = new WeakSet();

        fields.forEach(function (field) {
            field.setAttribute('aria-invalid', 'false');

            // Validate on blur after user has interacted with the field
            field.addEventListener('blur', function () {
                if (editedSet.has(field)) {
                    validateContactField(field);
                }
            });

            // Clear or update error state immediately on input once edited
            field.addEventListener('input', function () {
                editedSet.add(field);
                if (field.getAttribute('aria-invalid') === 'true' || field.classList.contains('user-invalid-fallback')) {
                    validateContactField(field);
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let firstInvalidField = null;
            let allValid = true;

            fields.forEach(function (field) {
                editedSet.add(field);
                const valid = validateContactField(field);
                if (!valid) {
                    allValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            });

            if (!allValid) {
                if (statusBanner) {
                    statusBanner.innerHTML = '<span role="img" aria-label="Error">❌</span> Please fix the highlighted validation errors below before sending your message.';
                    statusBanner.className = 'form-status-banner error';
                }
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }

            // Valid submission!
            const senderName = document.getElementById('contact-name').value.trim();
            const senderEmail = document.getElementById('contact-email').value.trim();
            const senderPhone = document.getElementById('contact-phone').value.trim();

            if (statusBanner) {
                statusBanner.innerHTML =
                    '✅ Thank you, <strong>' +
                    senderName.replace(/</g, '&lt;') +
                    '</strong>! Your message has passed all validation checks (Email: ' +
                    senderEmail.replace(/</g, '&lt;') +
                    ', Phone: ' +
                    senderPhone.replace(/</g, '&lt;') +
                    ') and has been received.';
                statusBanner.className = 'form-status-banner success';
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Message Sent ✓';
                setTimeout(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }, 4000);
            }

            contactForm.reset();
            fields.forEach(function (field) {
                editedSet.delete(field);
                field.classList.remove('user-valid-fallback', 'user-invalid-fallback');
                field.setAttribute('aria-invalid', 'false');
                linkError(field, false);
            });
        });
    }

    // Initialize all modules on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initProjectsFilter();
        initAcademicPlanner();
        initContactForm();
    });
})();
