document.addEventListener('DOMContentLoaded', () => {
    // Load saved progress from localStorage
    loadProgress();

    // Add event listeners to all checkboxes
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
});

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const itemId = checkbox.id;
    const isChecked = checkbox.checked;

    // Save progress to localStorage
    saveProgress(itemId, isChecked);

    // Update UI
    updateProgressUI();
}

function saveProgress(itemId, isChecked) {
    let progress = JSON.parse(localStorage.getItem('roadmapProgress') || '{}');
    progress[itemId] = isChecked;
    localStorage.setItem('roadmapProgress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('roadmapProgress') || '{}');
    
    // Restore checkbox states
    Object.entries(progress).forEach(([itemId, isChecked]) => {
        const checkbox = document.getElementById(itemId);
        if (checkbox) {
            checkbox.checked = isChecked;
        }
    });

    // Update UI
    updateProgressUI();
}

function updateProgressUI() {
    const sections = document.querySelectorAll('.roadmap-section');
    
    sections.forEach(section => {
        const checkboxes = section.querySelectorAll('.checklist-checkbox');
        const totalItems = checkboxes.length;
        const checkedItems = Array.from(checkboxes).filter(cb => cb.checked).length;
        
        // Calculate progress percentage
        const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;
        
        // Update section header with progress
        const sectionTitle = section.querySelector('h2');
        const originalTitle = sectionTitle.textContent.split(' - ')[0];
        sectionTitle.textContent = `${originalTitle} - ${Math.round(progress)}%`;
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('checklist-item')) {
            const checkbox = focusedElement.querySelector('.checklist-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                handleCheckboxChange({ target: checkbox });
            }
        }
    }
}); 