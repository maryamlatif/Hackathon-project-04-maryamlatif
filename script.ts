document.addEventListener("DOMContentLoaded", () => {
  const toggleSkillButton = document.getElementById("toggleSkill") as HTMLButtonElement;
  const skillSection = document.getElementById("skill") as HTMLElement;
  const form = document.getElementById('resume-form') as HTMLFormElement;
  const output = document.getElementById('resume-output') as HTMLDivElement;
  const saveResetButton = document.getElementById('save-reset') as HTMLButtonElement;

  // Initial state for reset
  const initialResumeHTML = output.innerHTML;

  // Toggle skill section visibility
  if (toggleSkillButton && skillSection) {
    toggleSkillButton.addEventListener("click", () => {
      if (skillSection.style.display === "none" || skillSection.style.display === "") {
        skillSection.style.display = "block";
        toggleSkillButton.textContent = "Hide Skill";
      } else {
        skillSection.style.display = "none";
        toggleSkillButton.textContent = "Show Skill";
      }
    });
  }

  // Form submission handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    generateResume();
  });

  // Save & Reset button handler
  if (saveResetButton) {
    saveResetButton.addEventListener('click', () => {
      // Save functionality
      const resumeData = {
        name: (document.getElementById('name') as HTMLInputElement).value.trim(),
        email: (document.getElementById('email') as HTMLInputElement).value.trim(),
        education: (document.getElementById('education') as HTMLTextAreaElement).value.trim(),
        experience: (document.getElementById('experience') as HTMLTextAreaElement).value.trim(),
        skill: (document.getElementById('skills') as HTMLTextAreaElement).value.trim(),
      };

      if (resumeData.name && resumeData.email && resumeData.education && resumeData.experience && resumeData.skill) {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Data saved successfully!');
      } else {
        alert('Please fill in all fields before saving.');
      }

      // Reset functionality
      form.reset();
      output.innerHTML = initialResumeHTML;
      if (skillSection) skillSection.style.display = 'none';
      if (toggleSkillButton) toggleSkillButton.textContent = 'Show Skill';
    });
  }

  // Generate resume function
  function generateResume() {
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !education || !experience || !skills) {
      alert("Please fill in all fields.");
      return;
    }

    const resumeHTML = `
      <h2 contenteditable="true">${name}</h2>
      <p contenteditable="true">Email: ${email}</p>
      <h3 contenteditable="true">Education</h3>
      <p contenteditable="true">${education}</p>
      <h3 contenteditable="true">Work Experience</h3>
      <p contenteditable="true">${experience}</p>
      <h3 contenteditable="true">Skills</h3>
      <p contenteditable="true">${skills}</p>
    `;

    output.innerHTML = resumeHTML;

    // Add event listeners for inline editing
    output.querySelectorAll('[contenteditable]').forEach(element => {
      element.addEventListener('input', (event) => {
        console.log('Content changed:', (event.target as HTMLElement).innerHTML);
      });
    });
  }

  // Load saved data on page load
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    const resumeData = JSON.parse(savedData);
    (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
    (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
    (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
    (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
    (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skill;
  }
});

// 