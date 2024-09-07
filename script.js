document.addEventListener("DOMContentLoaded", function () {
    var toggleSkillButton = document.getElementById("toggleSkill");
    var skillSection = document.getElementById("skill");
    var form = document.getElementById('resume-form');
    var output = document.getElementById('resume-output');
    var saveResetButton = document.getElementById('save-reset');
    // Initial state for reset
    var initialResumeHTML = output.innerHTML;
    // Toggle skill section visibility
    if (toggleSkillButton && skillSection) {
        toggleSkillButton.addEventListener("click", function () {
            if (skillSection.style.display === "none" || skillSection.style.display === "") {
                skillSection.style.display = "block";
                toggleSkillButton.textContent = "Hide Skill";
            }
            else {
                skillSection.style.display = "none";
                toggleSkillButton.textContent = "Show Skill";
            }
        });
    }
    // Form submission handler
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateResume();
    });
    // Save & Reset button handler
    if (saveResetButton) {
        saveResetButton.addEventListener('click', function () {
            // Save functionality
            var resumeData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                education: document.getElementById('education').value.trim(),
                experience: document.getElementById('experience').value.trim(),
                skill: document.getElementById('skills').value.trim(),
            };
            if (resumeData.name && resumeData.email && resumeData.education && resumeData.experience && resumeData.skill) {
                localStorage.setItem('resumeData', JSON.stringify(resumeData));
                alert('Data saved successfully!');
            }
            else {
                alert('Please fill in all fields before saving.');
            }
            // Reset functionality
            form.reset();
            output.innerHTML = initialResumeHTML;
            if (skillSection)
                skillSection.style.display = 'none';
            if (toggleSkillButton)
                toggleSkillButton.textContent = 'Show Skill';
        });
    }
    // Generate resume function
    function generateResume() {
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var education = document.getElementById('education').value.trim();
        var experience = document.getElementById('experience').value.trim();
        var skills = document.getElementById('skills').value.trim();
        if (!name || !email || !education || !experience || !skills) {
            alert("Please fill in all fields.");
            return;
        }
        var resumeHTML = "\n      <h2 contenteditable=\"true\">".concat(name, "</h2>\n      <p contenteditable=\"true\">Email: ").concat(email, "</p>\n      <h3 contenteditable=\"true\">Education</h3>\n      <p contenteditable=\"true\">").concat(education, "</p>\n      <h3 contenteditable=\"true\">Work Experience</h3>\n      <p contenteditable=\"true\">").concat(experience, "</p>\n      <h3 contenteditable=\"true\">Skills</h3>\n      <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
        output.innerHTML = resumeHTML;
        // Add event listeners for inline editing
        output.querySelectorAll('[contenteditable]').forEach(function (element) {
            element.addEventListener('input', function (event) {
                console.log('Content changed:', event.target.innerHTML);
            });
        });
    }
    // Load saved data on page load
    var savedData = localStorage.getItem('resumeData');
    if (savedData) {
        var resumeData = JSON.parse(savedData);
        document.getElementById('name').value = resumeData.name;
        document.getElementById('email').value = resumeData.email;
        document.getElementById('education').value = resumeData.education;
        document.getElementById('experience').value = resumeData.experience;
        document.getElementById('skills').value = resumeData.skill;
    }
});
// 
