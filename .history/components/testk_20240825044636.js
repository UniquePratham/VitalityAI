document.addEventListener('DOMContentLoaded', () => {
    // Automatically fill out the form fields
    document.getElementById('fullName').value = 'John Doe';
    document.getElementById('email').value = 'johndoe@example.com';
    document.getElementById('password').value = 'password123';
    document.getElementById('confirmPassword').value = 'password123';
    document.getElementById('phone').value = '123-456-7890';
    document.getElementById('dob').value = '1990-01-01';
  
    // Automatically select a gender (radio button)
    document.getElementById('male').checked = true; // You can change this to 'female' or 'other'
  
    // Display the modal with the filled form values
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    const closeModal = document.getElementsByClassName('close')[0];
  
    // Collect data from the form and display it in the modal
    const displayFormData = () => {
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const dob = document.getElementById('dob').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
  
      // Construct the display message
      modalText.innerHTML = `
        <strong>Form Data:</strong><br>
        <strong>Full Name:</strong> ${fullName}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Date of Birth:</strong> ${dob}<br>
        <strong>Gender:</strong> ${gender}
      `;
  
      // Show the modal
      modal.style.display = 'block';
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
  });
  