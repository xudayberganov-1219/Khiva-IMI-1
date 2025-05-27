// Admin Panel JavaScript - Khiva School

// Default login credentials (in real app, this would be server-side)
const DEFAULT_CREDENTIALS = {
    username: 'Mr.Xudayberganov',
    password: '1021092010'
};

// Sample data for demonstration
let studentsData = [
    { id: 1, name: 'Ahmad Karimov', class: '11-A', phone: '+998 90 123 45 67', status: 'active' },
    { id: 2, name: 'Malika Toshmatova', class: '10-B', phone: '+998 91 234 56 78', status: 'active' },
    { id: 3, name: 'Bobur Rahimov', class: '11-C', phone: '+998 93 345 67 89', status: 'active' },
    { id: 4, name: 'Zarina Karimova', class: '9-A', phone: '+998 94 456 78 90', status: 'active' },
    { id: 5, name: 'Sardor Toshmatov', class: '10-A', phone: '+998 95 567 89 01', status: 'graduated' }
];

let teachersData = [
    { id: 1, name: 'Aziz Normatov', subject: 'Matematika', experience: '10 yil', status: 'active' },
    { id: 2, name: 'Nilufar Rahimova', subject: 'Fizika', experience: '8 yil', status: 'active' },
    { id: 3, name: 'Komil Karimov', subject: 'Kimyo', experience: '12 yil', status: 'active' },
    { id: 4, name: 'Feruza Toshmatova', subject: 'Biologiya', experience: '6 yil', status: 'active' }
];

let achievementsData = [
    { id: 1, student: 'Ahmad Karimov', type: 'Matematika olimpiadasi', place: '1-o\'rin', date: '2024-03-15', category: 'olimpiad' },
    { id: 2, student: 'Malika Toshmatova', type: 'Fizika olimpiadasi', place: '2-o\'rin', date: '2024-03-10', category: 'olimpiad' },
    { id: 3, student: 'Bobur Rahimov', type: 'Robocontest Expert', place: 'Expert', date: '2024-02-20', category: 'robocontest' },
    { id: 4, student: 'Zarina Karimova', type: 'IELTS Sertifikati', place: 'Band 7.5', date: '2024-01-15', category: 'certificate' }
];

let newsData = [
    { id: 1, title: 'Matematika olimpiadasida yutuq', content: 'Maktabimiz o\'quvchilari respublika bosqichida...', category: 'achievement', status: 'published', date: '2024-03-15' },
    { id: 2, title: 'Yangi laboratoriya ochildi', content: 'Zamonaviy fizika laboratoriyasi...', category: 'general', status: 'published', date: '2024-03-10' }
];

let messagesData = [
    { id: 1, sender: 'Oybek Toshmatov', email: 'oybek@email.com', subject: 'Qabul haqida savol', message: 'Maktabga qabul jarayoni haqida ma\'lumot...', date: '2024-03-20', status: 'unread' },
    { id: 2, sender: 'Malika Karimova', email: 'malika@email.com', subject: 'Maktab haqida ma\'lumot', message: 'Maktabning o\'quv dasturlari haqida...', date: '2024-03-19', status: 'read' }
];

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    initializeAdminPanel();
});

// Login functionality
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Tekshirilmoqda...';
    submitBtn.disabled = true;
    
    // Simulate login delay
    setTimeout(() => {
        if (username === DEFAULT_CREDENTIALS.username && password === DEFAULT_CREDENTIALS.password) {
            // Successful login
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            showNotification('Muvaffaqiyatli kirildi!', 'success');
            
            // Store login status
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Initialize dashboard
            showSection('dashboard');
            loadDashboardData();
        } else {
            // Failed login
            showNotification('Noto\'g\'ri foydalanuvchi nomi yoki parol!', 'error');
            
            // Reset form
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 1500);
}

// Logout functionality
function logout() {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loginTime');
        
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('loginModal').style.display = 'block';
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        showNotification('Muvaffaqiyatli chiqildi!', 'info');
    }
}

// Admin panel initialization
function initializeAdminPanel() {
    // Check if already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        showSection('dashboard');
        loadDashboardData();
    }
    
    // Initialize search and filters
    initializeSearch();
    initializeFilters();
    
    // Load initial data
    loadStudentsTable();
    loadTeachersGrid();
    loadAchievementsTable();
    loadNewsData();
    loadMessagesTable();
}

// Section navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update sidebar navigation
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.sidebar .nav-link[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'students':
            loadStudentsTable();
            break;
        case 'teachers':
            loadTeachersGrid();
            break;
        case 'achievements':
            loadAchievementsTable();
            break;
        case 'news':
            loadNewsData();
            break;
        case 'contacts':
            loadMessagesTable();
            break;
    }
}

// Dashboard data loading
function loadDashboardData() {
    // Update stats
    updateStatCard('students', studentsData.filter(s => s.status === 'active').length);
    updateStatCard('teachers', teachersData.filter(t => t.status === 'active').length);
    updateStatCard('achievements', achievementsData.length);
    updateStatCard('news', newsData.filter(n => n.status === 'published').length);
    
    // Load recent activity
    loadRecentActivity();
}

function updateStatCard(type, value) {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        const icon = card.querySelector('i');
        if (icon) {
            if ((type === 'students' && icon.classList.contains('fa-user-graduate')) ||
                (type === 'teachers' && icon.classList.contains('fa-chalkboard-teacher')) ||
                (type === 'achievements' && icon.classList.contains('fa-trophy')) ||
                (type === 'news' && icon.classList.contains('fa-newspaper'))) {
                
                const numberElement = card.querySelector('.text-lg');
                if (numberElement) {
                    animateNumber(numberElement, parseInt(numberElement.textContent) || 0, value);
                }
            }
        }
    });
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function loadRecentActivity() {
    const activities = [
        { action: 'Yangi yutuq qo\'shildi', time: '5 daqiqa oldin', status: 'success' },
        { action: 'O\'qituvchi ma\'lumotlari yangilandi', time: '15 daqiqa oldin', status: 'info' },
        { action: 'Yangilik nashr etildi', time: '1 soat oldin', status: 'primary' }
    ];
    
    // This would typically update the activity table
    console.log('Recent activities loaded:', activities);
}

// Students management
function loadStudentsTable() {
    const tbody = document.querySelector('#studentsTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    studentsData.forEach(student => {
        const row = createStudentRow(student);
        tbody.appendChild(row);
    });
}

function createStudentRow(student) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${String(student.id).padStart(3, '0')}</td>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.phone}</td>
        <td><span class="badge ${student.status === 'active' ? 'bg-success' : 'bg-secondary'}">${student.status === 'active' ? 'Faol' : 'Bitirgan'}</span></td>
        <td>
            <button class="btn btn-sm btn-outline-primary" onclick="editStudent(${student.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteStudent(${student.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    return row;
}

function showAddStudentModal() {
    // Create and show modal for adding new student
    const modalHtml = `
        <div class="modal fade show" style="display: block;" id="addStudentModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Yangi o'quvchi qo'shish</h5>
                        <button type="button" class="btn-close" onclick="closeModal('addStudentModal')"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addStudentForm">
                            <div class="mb-3">
                                <label class="form-label">Ism Familiya</label>
                                <input type="text" class="form-control" id="studentName" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Sinf</label>
                                <select class="form-select" id="studentClass" required>
                                    <option value="">Sinfni tanlang</option>
                                    <option value="9-A">9-A</option>
                                    <option value="9-B">9-B</option>
                                    <option value="10-A">10-A</option>
                                    <option value="10-B">10-B</option>
                                    <option value="11-A">11-A</option>
                                    <option value="11-B">11-B</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Telefon</label>
                                <input type="tel" class="form-control" id="studentPhone" placeholder="+998 90 123 45 67" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('addStudentModal')">Bekor qilish</button>
                        <button type="button" class="btn btn-primary" onclick="saveStudent()">Saqlash</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function saveStudent() {
    const name = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const phone = document.getElementById('studentPhone').value;
    
    if (name && studentClass && phone) {
        const newStudent = {
            id: studentsData.length + 1,
            name: name,
            class: studentClass,
            phone: phone,
            status: 'active'
        };
        
        studentsData.push(newStudent);
        loadStudentsTable();
        closeModal('addStudentModal');
        showNotification('O\'quvchi muvaffaqiyatli qo\'shildi!', 'success');
    } else {
        showNotification('Barcha maydonlarni to\'ldiring!', 'error');
    }
}

function editStudent(id) {
    const student = studentsData.find(s => s.id === id);
    if (student) {
        showNotification('Tahrirlash funksiyasi ishlab chiqilmoqda...', 'info');
    }
}

function deleteStudent(id) {
    if (confirm('Haqiqatan ham bu o\'quvchini o\'chirmoqchimisiz?')) {
        studentsData = studentsData.filter(s => s.id !== id);
        loadStudentsTable();
        showNotification('O\'quvchi o\'chirildi!', 'success');
    }
}

// Teachers management
function loadTeachersGrid() {
    const grid = document.getElementById('teachersGrid');
    if (!grid) return;
    
    // Keep existing teachers and add new ones
    const existingTeachers = grid.children.length;
    
    teachersData.slice(existingTeachers).forEach(teacher => {
        const card = createTeacherCard(teacher);
        grid.appendChild(card);
    });
}

function createTeacherCard(teacher) {
    const div = document.createElement('div');
    div.className = 'col-lg-4 col-md-6 mb-4';
    div.innerHTML = `
        <div class="card teacher-card">
            <div class="card-body text-center">
                <div class="teacher-avatar mb-3">
                    <i class="fas fa-user-tie fa-3x"></i>
                </div>
                <h5 class="card-title">${teacher.name}</h5>
                <p class="card-text text-muted">${teacher.subject}</p>
                <div class="mb-2">
                    <span class="badge bg-primary">${teacher.experience} tajriba</span>
                </div>
                <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" onclick="editTeacher(${teacher.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-info" onclick="viewTeacher(${teacher.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTeacher(${teacher.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return div;
}

function showAddTeacherModal() {
    showNotification('O\'qituvchi qo\'shish funksiyasi ishlab chiqilmoqda...', 'info');
}

function editTeacher(id) {
    showNotification('O\'qituvchi tahrirlash funksiyasi ishlab chiqilmoqda...', 'info');
}

function viewTeacher(id) {
    const teacher = teachersData.find(t => t.id === id);
    if (teacher) {
        showNotification(`${teacher.name} - ${teacher.subject} o'qituvchisi`, 'info');
    }
}

function deleteTeacher(id) {
    if (confirm('Haqiqatan ham bu o\'qituvchini o\'chirmoqchimisiz?')) {
        teachersData = teachersData.filter(t => t.id !== id);
        showNotification('O\'qituvchi o\'chirildi!', 'success');
        // Reload teachers grid
        document.getElementById('teachersGrid').innerHTML = '';
        loadTeachersGrid();
    }
}

// Achievements management
function loadAchievementsTable() {
    const tbody = document.querySelector('#achievements-section .table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    achievementsData.forEach(achievement => {
        const row = createAchievementRow(achievement);
        tbody.appendChild(row);
    });
}

function createAchievementRow(achievement) {
    const row = document.createElement('tr');
    
    let badgeClass = 'bg-secondary';
    if (achievement.place.includes('1')) badgeClass = 'bg-warning';
    else if (achievement.place.includes('2')) badgeClass = 'bg-info';
    else if (achievement.place.includes('3')) badgeClass = 'bg-success';
    
    row.innerHTML = `
        <td>${achievement.student}</td>
        <td>${achievement.type}</td>
        <td><span class="badge ${badgeClass}">${achievement.place}</span></td>
        <td>${achievement.date}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary" onclick="editAchievement(${achievement.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteAchievement(${achievement.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    return row;
}

function showAddAchievementModal() {
    showNotification('Yutuq qo\'shish funksiyasi ishlab chiqilmoqda...', 'info');
}

function editAchievement(id) {
    showNotification('Yutuq tahrirlash funksiyasi ishlab chiqilmoqda...', 'info');
}

function deleteAchievement(id) {
    if (confirm('Haqiqatan ham bu yutuqni o\'chirmoqchimisiz?')) {
        achievementsData = achievementsData.filter(a => a.id !== id);
        loadAchievementsTable();
        showNotification('Yutuq o\'chirildi!', 'success');
    }
}

// News management
function loadNewsData() {
    const newsForm = document.getElementById('newsForm');
    if (newsForm) {
        newsForm.addEventListener('submit', handleNewsSubmit);
    }
}

function handleNewsSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;
    const category = document.getElementById('newsCategory').value;
    const status = document.getElementById('newsStatus').value;
    
    if (title && content) {
        const newNews = {
            id: newsData.length + 1,
            title: title,
            content: content,
            category: category,
            status: status,
            date: new Date().toISOString().split('T')[0]
        };
        
        newsData.push(newNews);
        clearNewsForm();
        showNotification('Yangilik saqlandi!', 'success');
    }
}

function clearNewsForm() {
    document.getElementById('newsForm').reset();
}

function showAddNewsModal() {
    showNotification('Yangilik qo\'shish formasini to\'ldiring', 'info');
}

// Messages management
function loadMessagesTable() {
    const tbody = document.querySelector('#contacts-section .table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    messagesData.forEach(message => {
        const row = createMessageRow(message);
        tbody.appendChild(row);
    });
}

function createMessageRow(message) {
    const row = document.createElement('tr');
    if (message.status === 'unread') {
        row.classList.add('table-warning');
    }
    
    const statusIcon = message.status === 'unread' ? 
        '<i class="fas fa-circle text-warning"></i>' : 
        '<i class="fas fa-circle text-success"></i>';
    
    row.innerHTML = `
        <td>${statusIcon}</td>
        <td>${message.sender}</td>
        <td>${message.email}</td>
        <td>${message.subject}</td>
        <td>${message.date}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary" onclick="viewMessage(${message.id})">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-success" onclick="replyMessage(${message.id})">
                <i class="fas fa-reply"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${message.id})">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    return row;
}

function viewMessage(id) {
    const message = messagesData.find(m => m.id === id);
    if (message) {
        // Mark as read
        message.status = 'read';
        loadMessagesTable();
        
        // Show message details
        const modalHtml = `
            <div class="modal fade show" style="display: block;" id="messageModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${message.subject}</h5>
                            <button type="button" class="btn-close" onclick="closeModal('messageModal')"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <strong>Yuboruvchi:</strong> ${message.sender} (${message.email})
                            </div>
                            <div class="mb-3">
                                <strong>Sana:</strong> ${message.date}
                            </div>
                            <div>
                                <strong>Xabar:</strong><br>
                                ${message.message}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal('messageModal')">Yopish</button>
                            <button type="button" class="btn btn-primary" onclick="replyMessage(${message.id})">Javob berish</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}

function replyMessage(id) {
    showNotification('Javob berish funksiyasi ishlab chiqilmoqda...', 'info');
}

function deleteMessage(id) {
    if (confirm('Haqiqatan ham bu xabarni o\'chirmoqchimisiz?')) {
        messagesData = messagesData.filter(m => m.id !== id);
        loadMessagesTable();
        showNotification('Xabar o\'chirildi!', 'success');
    }
}

function refreshContacts() {
    loadMessagesTable();
    showNotification('Xabarlar yangilandi!', 'info');
}

// Search and filter functionality
function initializeSearch() {
    const studentSearch = document.getElementById('studentSearch');
    if (studentSearch) {
        studentSearch.addEventListener('input', filterStudents);
    }
}

function initializeFilters() {
    const classFilter = document.getElementById('classFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    if (classFilter) classFilter.addEventListener('change', filterStudents);
    if (statusFilter) statusFilter.addEventListener('change', filterStudents);
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
    const classFilter = document.getElementById('classFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    const filteredStudents = studentsData.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm);
        const matchesClass = !classFilter || student.class.includes(classFilter);
        const matchesStatus = !statusFilter || student.status === statusFilter;
        
        return matchesSearch && matchesClass && matchesStatus;
    });
    
    // Update table with filtered data
    const tbody = document.querySelector('#studentsTable tbody');
    if (tbody) {
        tbody.innerHTML = '';
        filteredStudents.forEach(student => {
            const row = createStudentRow(student);
            tbody.appendChild(row);
        });
    }
}

// Settings management
function saveSocialMedia() {
    const instagram = document.getElementById('instagramUrl').value;
    const telegram = document.getElementById('telegramUrl').value;
    const youtube = document.getElementById('youtubeUrl').value;
    
    // Save to localStorage (in real app, would save to server)
    localStorage.setItem('socialMedia', JSON.stringify({
        instagram, telegram, youtube
    }));
    
    showNotification('Ijtimoiy tarmoq havolalari saqlandi!', 'success');
}

function changePassword() {
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;
    
    if (!current || !newPass || !confirm) {
        showNotification('Barcha maydonlarni to\'ldiring!', 'error');
        return;
    }
    
    if (current !== DEFAULT_CREDENTIALS.password) {
        showNotification('Joriy parol noto\'g\'ri!', 'error');
        return;
    }
    
    if (newPass !== confirm) {
        showNotification('Yangi parollar mos kelmaydi!', 'error');
        return;
    }
    
    if (newPass.length < 6) {
        showNotification('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!', 'error');
        return;
    }
    
    // Update password (in real app, would update on server)
    DEFAULT_CREDENTIALS.password = newPass;
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    showNotification('Parol muvaffaqiyatli o\'zgartirildi!', 'success');
}

// Utility functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `admin-notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Auto-save functionality
function enableAutoSave() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                // Save form data to localStorage
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                localStorage.setItem(`form_${form.id}`, JSON.stringify(data));
            });
        });
    });
}

// Initialize auto-save when admin panel loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(enableAutoSave, 1000);
});

// Session management
function checkSession() {
    const loginTime = sessionStorage.getItem('loginTime');
    if (loginTime) {
        const now = new Date();
        const login = new Date(loginTime);
        const diffHours = (now - login) / (1000 * 60 * 60);
        
        // Auto logout after 8 hours
        if (diffHours > 8) {
            logout();
            showNotification('Sessiya vaqti tugadi. Qaytadan kiring.', 'warning');
        }
    }
}

// Check session every minute
setInterval(checkSession, 60000);

console.log('Xiva Maktab-Internati Admin Panel JavaScript loaded successfully!');