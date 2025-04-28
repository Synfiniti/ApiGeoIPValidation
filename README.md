# 🚨 WEB LIVE 

# 📄 Registration Form with Validations and Country Detection
This project is a registration form that includes:

Real-time validation of input fields.

Automatic detection of the user's country using their IP address (using the Geoapify API).

Automatic updating of the country code in the phone number.

# 🛠️ Technologies Used
HTML5 - Basic form structure.

CSS3 - Styles for validations and visual presentation.

JavaScript - Dynamic validations and API consumption.

Geoapify API - External service to detect the country by IP.

# ✨ Main Features
Field Validations:

Username: Must contain letters and numbers, between 6 and 16 characters.

Email: Standard format validation.

Phone: Numbers only, between 6 and 16 digits.

Password: Minimum 6 characters, including letters and numbers.

Password Confirmation: Must match the entered password.

Country: Automatically selected when the user's country is detected.

Country and Phone Code Autocomplete:

The location is detected by IP and the country is selected in the <select> field.

It also automatically updates the phone prefix (international area code).

Submit Button:

Only enabled when all fields are valid.

# 🚀 How does country detection work?
Uses the Geoapify API:

Make a request to the API https://api.geoapify.com/v1/ipinfo?apiKey=YOUR_API_KEY.

Receives information about the user's location in response.

Extracts the ISO Alpha-2 country code ("US", "MX", "AR", etc.).

Finds the country in the <select> field using the data-countryCode attribute.

Automatically selects that country and updates the phone prefix.

# 📦 Project Structure
plaintext
Copy
Edit
📁 project-form
│
├── index.html # Contains the form and main elements
├── style.css # CSS styles for the form
├── script.js # Validations and country autocomplete logic
├── README.md # (This file)

# 🧩 External Dependencies
You need a free Geoapify API Key.

Make sure to replace "YOUR_API_KEY" in script.js with your own API Key.

javascript
Copy
Edit
const apiKey = "YOUR_API_KEY";
const apiUrl = "https://api.geoapify.com/v1/ipinfo?&apiKey=";

# ⚡ How to Run It Locally
Clone the repository or copy the files to your machine.

Open the index.html file in your browser.

The form should load, automatically detecting your country.

# 📢 Notes
If the API fails or the country isn't detected, you can set a default country (optional).

You can add more validations or improve password security by using stricter regular expressions.

This form is ideal for user registration or landing page web projects.

🖋️ Author
Made with ❤️ by [Jean Gutiérrez]
