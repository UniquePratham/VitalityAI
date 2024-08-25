document.addEventListener('DOMContentLoaded', () => {
    try {
        // Automatically fill out the form fields
        document.getElementById('fullName').value = 'John Doe';
        document.getElementById('email').value = 'johndoe@example.com';
        document.getElementById('password').value = 'password123';
        document.getElementById('confirmPassword').value = 'password123';
        document.getElementById('phone').value = '123-456-7890';
        document.getElementById('dob').value = '1990-01-01';

        console.log('Form filled successfully.');

        // Automatically select a gender (radio button)
        document.getElementById('male').checked = true;  // Log to check if this works
        console.log('Gender selected: Male');
    
        // Collect and display form data in the modal
        const modal = document.getElementById('myModal');
        const modalText = document.getElementById('modalText');
        const closeModal = document.getElementsByClassName('close')[0];

        if (!modal || !modalText || !closeModal) {
            console.error("Modal elements not found.");
            return;
        }

        // Display the modal with the filled form values
        const displayFormData = () => {
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const dob = document.getElementById('dob').value;
            const gender = document.querySelector('input[name="gender"]:checked').value;

            console.log('Gender selected:', gender);

            modalText.innerHTML = `
                <strong>Form Data:</strong><br>
                <strong>Full Name:</strong> ${fullName}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Phone:</strong> ${phone}<br>
                <strong>Date of Birth:</strong> ${dob}<br>
                <strong>Gender:</strong> ${gender}
            `;

            modal.style.display = 'block';  // Show the modal
        };

        // Trigger the display when the page is loaded
        displayFormData();

        // Close the modal when the close button is clicked
        closeModal.onclick = function() {
            modal.style.display = 'none';
        };

        // Close the modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
