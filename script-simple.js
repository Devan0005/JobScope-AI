// Simple and clean JavaScript for JobScope AI

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeChatbot();
    initializeDemo();
    initializePrivacyControls();
});

// Navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Demo functions
function openDemo() {
    scrollToSection('demo');
    showNotification('🚀 Welcome to JobScope AI Demo!');
}

function showDemo(type) {
    // Hide all demo panels
    const panels = document.querySelectorAll('.demo-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.demo-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected panel and activate tab
    const selectedPanel = document.getElementById(`${type}-demo`);
    const selectedTab = event.target;
    
    if (selectedPanel) selectedPanel.classList.add('active');
    if (selectedTab) selectedTab.classList.add('active');
}

function showFeatureDemo(feature) {
    switch(feature) {
        case 'resume':
            openDemo();
            showDemo('upload');
            showNotification('📋 Try uploading a resume to see AI analysis!');
            break;
        case 'conversation':
            openDemo();
            showDemo('chat');
            showNotification('💬 Ask our AI to explain any job description!');
            break;
        case 'language':
            showNotification('🌍 Language support: English, Spanish, French, German, Chinese, Japanese, and more!');
            break;
        case 'goals':
            showNotification('🎯 Set career goals like "Get a senior developer role" or "Learn cloud computing"');
            break;
        case 'privacy':
            scrollToSection('privacy');
            showNotification('🔐 Full control over your data and privacy settings');
            break;
    }
}

// Resume upload demo
document.addEventListener('DOMContentLoaded', function() {
    const resumeUpload = document.getElementById('resumeUpload');
    if (resumeUpload) {
        resumeUpload.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                showNotification(`📄 Analyzing ${fileName}...`);
                
                // Simulate AI analysis
                setTimeout(() => {
                    const resultsDiv = document.querySelector('.demo-results');
                    if (resultsDiv) {
                        resultsDiv.style.display = 'block';
                        showNotification('✅ Resume analysis complete! Found skills and job matches.');
                    }
                }, 2000);
            }
        });
    }
});

// Demo chat
function sendDemoMessage() {
    const input = document.querySelector('.chat-input');
    const container = document.querySelector('.chat-container');
    
    if (input && container && input.value.trim()) {
        const userMessage = input.value.trim();
        
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message user';
        userDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">${userMessage}</div>
        `;
        container.appendChild(userDiv);
        
        // Clear input
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-message bot';
            botDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">I understand you're asking about "${userMessage}". As your AI career assistant, I can help explain complex job requirements in simple terms, analyze your skills, and suggest career paths. What specific aspect would you like me to elaborate on?</div>
            `;
            container.appendChild(botDiv);
            container.scrollTop = container.scrollHeight;
        }, 1000);
        
        container.scrollTop = container.scrollHeight;
    }
}

// Chatbot functionality
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        if (chatbot.classList.contains('active')) {
            chatbot.classList.remove('active');
        } else {
            chatbot.classList.add('active');
        }
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.querySelector('.chatbot-messages');
    
    if (input && messagesContainer && input.value.trim()) {
        const userMessage = input.value.trim();
        
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'chatbot-message user';
        userDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">${userMessage}</div>
        `;
        messagesContainer.appendChild(userDiv);
        
        // Clear input
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const botResponse = generateAIResponse(userMessage);
            const botDiv = document.createElement('div');
            botDiv.className = 'chatbot-message bot';
            botDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">${botResponse}</div>
            `;
            messagesContainer.appendChild(botDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function handleQuickAction(action) {
    const responses = {
        'resume': '📋 I can help analyze your resume! Upload it in the demo section to see how our AI identifies your skills, experience level, and suggests matching opportunities. Your resume is processed securely and never shared.',
        'jobs': '🔍 I can help you find jobs that match your skills! Tell me about your experience, preferred role, or industry, and I\'ll explain how our AI matching works.',
        'explain': '💬 I can explain any job description in simple terms! Just paste a job posting and I\'ll break down the requirements, responsibilities, and what they really mean.',
        'goals': '🎯 Let\'s set your career goals! Tell me where you want to be in 1-2 years and I\'ll help create a personalized roadmap with skills to learn and milestones to track.',
        'privacy': '🔐 Your privacy is our priority! All data is encrypted, you control what\'s shared, and you can browse anonymously. Check our privacy dashboard for full control.'
    };
    
    const messagesContainer = document.querySelector('.chatbot-messages');
    if (messagesContainer) {
        const botDiv = document.createElement('div');
        botDiv.className = 'chatbot-message bot';
        botDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">${responses[action]}</div>
        `;
        messagesContainer.appendChild(botDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
        return '📋 I can help with your resume! Our AI analyzes your skills, experience, and suggests improvements. Upload your resume in our demo to see how it works. Everything is processed securely and privately.';
    } else if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
        return '🎯 I can help with your job search! Our AI matches you with relevant opportunities based on your skills and preferences. What type of role are you looking for?';
    } else if (lowerMessage.includes('privacy') || lowerMessage.includes('data')) {
        return '🔐 Privacy is our top priority! Your data is encrypted, never sold, and you have full control. You can even use our platform anonymously. What specific privacy concerns can I address?';
    } else if (lowerMessage.includes('language')) {
        return '🌍 We support 12+ languages! Our AI understands and responds in English, Spanish, French, German, Chinese, Japanese, and more. Which language would you prefer?';
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('plan')) {
        return '🎯 Let\'s plan your career goals! Tell me your target role or skills you want to develop, and I\'ll help create a personalized roadmap with actionable steps.';
    } else {
        return `I understand you're asking about "${message}". As your AI career assistant, I can help with resume analysis, job matching, career planning, and explaining job requirements. How can I assist you specifically?`;
    }
}

// Privacy controls
function initializePrivacyControls() {
    // Load saved settings
    loadPrivacySettings();
}

function savePrivacySettings() {
    const settings = {
        dataProcessing: document.getElementById('dataProcessing').checked,
        jobAlerts: document.getElementById('jobAlerts').checked,
        analytics: document.getElementById('analytics').checked,
        goalTracking: document.getElementById('goalTracking').checked,
        languageSupport: document.getElementById('languageSupport').checked,
        anonymousMode: document.getElementById('anonymousMode').checked
    };
    
    localStorage.setItem('privacySettings', JSON.stringify(settings));
    showNotification('🔐 Privacy settings saved successfully! Your preferences have been updated.');
}

function loadPrivacySettings() {
    const saved = localStorage.getItem('privacySettings');
    if (saved) {
        const settings = JSON.parse(saved);
        if (document.getElementById('dataProcessing')) document.getElementById('dataProcessing').checked = settings.dataProcessing !== false;
        if (document.getElementById('jobAlerts')) document.getElementById('jobAlerts').checked = settings.jobAlerts || false;
        if (document.getElementById('analytics')) document.getElementById('analytics').checked = settings.analytics || false;
        if (document.getElementById('goalTracking')) document.getElementById('goalTracking').checked = settings.goalTracking !== false;
        if (document.getElementById('languageSupport')) document.getElementById('languageSupport').checked = settings.languageSupport !== false;
        if (document.getElementById('anonymousMode')) document.getElementById('anonymousMode').checked = settings.anonymousMode || false;
    }
}

function exportData() {
    showNotification('📁 Preparing your data export... You will receive a download link via email within 24 hours.');
}

function deleteData() {
    if (confirm('⚠️ Are you sure you want to delete all your data? This action cannot be undone.')) {
        localStorage.clear();
        showNotification('🗑️ All your data has been deleted successfully. You can continue using JobScope AI anonymously.');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.className = `notification show ${type}`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('🎉 Thank you for joining our beta program! We\'ll be in touch soon.');
            contactForm.reset();
        });
    }
});

// Mobile menu (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}
