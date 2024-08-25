from playwright.sync_api import sync_playwright


def run(playwright):
    browser = playwright.chromium.launch(headless=False)
    page = browser.new_page()

    # Navigate to the form page
    page.goto(
        'https://indiacampus.accenture.com/register/accenture/AEHINT25t1c/apply/?event=603524&job=527210')

    # Wait for the form to load and fill in the fields automatically
    page.fill('input[placeholder="Enter your name"]', 'John Doe')
    page.fill('input[placeholder="Enter your email"]', 'johndoe@example.com')
    page.fill('input[placeholder="Enter your phone number"]', '123-456-7890')
    date_of_birth = '01-01-1990'
    page.fill('input[name="dob"]', date_of_birth)

    # Select the gender option (radio button)
    # Select male option (change to "female" or "other" as needed)
    page.click('input[type="radio"][value="male"]')

    # Open the date picker and fill the date field
    # Date in DD-MM-YYYY format
    # Convert to YYYY-MM-DD format
    date_of_birth_yyyymmdd = '1990-01-01'

    # Click the date input field to open the date picker
    page.click('input[type="date"]')

    # Fill the date input field directly
    # Inject JavaScript into the page to display the filled data
    page.evaluate('''
        // Get the values from the form fields
        const name = document.querySelector('input[placeholder="Enter your name"]').value;
        const email = document.querySelector('input[placeholder="Enter your email"]').value;
        const phone = document.querySelector('input[placeholder="Enter your phone number"]').value;
        const message = document.querySelector('textarea[placeholder="Enter your message"]').value;
        const gender = document.querySelector('input[name="gender"]:checked').value; // Get the selected gender
        const dob = document.querySelector('input[type="date"]').value; // Get the date of birth

        // Create a new div to display the data
        const displayDiv = document.createElement('div');
        displayDiv.style.marginTop = '20px';
        displayDiv.style.padding = '10px';
        displayDiv.style.border = '1px solid #ccc';
        displayDiv.style.backgroundColor = '#f9f9f9';

        // Populate the div with the data
        displayDiv.innerHTML = `
            <h3>Form Data:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
        `;

        // Append the div to the body
        document.body.appendChild(displayDiv);
    ''')

    # Keep the browser open for inspection
    input("Press Enter to close the browser...")

    browser.close()


with sync_playwright() as playwright:
    run(playwright)
