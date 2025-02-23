const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});





// Function to display the saved paragraph
function displaySavedParagraph() {
    const savedParagraph = localStorage.getItem("paragraph");
    const paragraphElement = document.getElementById("savedParagraph");

    // Display the saved paragraph or default message
    if (savedParagraph) {
        paragraphElement.textContent = savedParagraph;
    } else {
        paragraphElement.textContent = "No paragraph saved yet.";
    }
}

// Add event listener to the form
document.getElementById("paragraphForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the paragraph input value
    const paragraphInput = document.getElementById("paragraphInput").value;

    // Save the paragraph to localStorage
    localStorage.setItem("paragraph", paragraphInput);

    // Display the updated paragraph
    displaySavedParagraph();

    // Optionally clear the input field
    document.getElementById("paragraphInput").value = "";
    alert("Paragraph saved successfully!");
});

// Display the saved paragraph on page load
displaySavedParagraph();
