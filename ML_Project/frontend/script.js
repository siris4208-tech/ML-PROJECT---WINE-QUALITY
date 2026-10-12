// =====================================
// 1. DEMO LOGIN
// =====================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        const demoEmail = "student@winequality.com";
        const demoPassword = "Wine123";

        if (email === demoEmail && password === demoPassword) {
            message.style.color = "green";
            message.textContent =
                "Login successful! Opening dashboard...";

            setTimeout(function () {
                window.location.href = "index.html";
            }, 800);
        } else {
            message.style.color = "red";
            message.textContent =
                "Invalid email or password. Please try again.";
        }
    });
}


// =====================================
// 2. WINE QUALITY PREDICTION
// =====================================

const predictionForm = document.getElementById("predictionForm");

if (predictionForm) {
    predictionForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const message = document.getElementById("predictionMessage");
        const predictButton = document.getElementById("predictButton");

        // Read all 11 input values.
        const fieldNames = [
            "fixed_acidity",
            "volatile_acidity",
            "citric_acid",
            "residual_sugar",
            "chlorides",
            "free_sulfur_dioxide",
            "total_sulfur_dioxide",
            "density",
            "pH",
            "sulphates",
            "alcohol"
        ];

        const wineData = {};

        for (const field of fieldNames) {
            const input = document.getElementById(field);
            const value = input.value.trim();

            if (value === "" || !Number.isFinite(Number(value))) {
                message.style.color = "red";
                message.textContent =
                    "Please enter a valid number for every field.";
                input.focus();
                return;
            }

            wineData[field] = Number(value);
        }

        message.style.color = "#741b35";
        message.textContent = "Predicting wine quality...";

        predictButton.disabled = true;
        predictButton.textContent = "Please wait...";

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(wineData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.detail
                        ? JSON.stringify(result.detail)
                        : "The prediction request failed."
                );
            }

            if (result.predicted_quality === undefined) {
                throw new Error(
                    "The server did not return a predicted quality score."
                );
            }

            // Save the latest result for results.html.
            sessionStorage.setItem(
                "winePrediction",
                JSON.stringify(result)
            );

            // Save the submitted inputs as well.
            sessionStorage.setItem(
                "wineInput",
                JSON.stringify(wineData)
            );

            message.style.color = "green";
            message.textContent = "Prediction completed! Opening results...";

            setTimeout(function () {
                window.location.href = "results.html";
            }, 500);

        } catch (error) {
            message.style.color = "red";
            message.textContent =
                "Could not get prediction: " + error.message +
                " Make sure the FastAPI backend is running.";

        } finally {
            predictButton.disabled = false;
            predictButton.textContent = "Predict Wine Quality";
        }
    });

    // Clear the message when the form is reset.
    predictionForm.addEventListener("reset", function () {
        const message = document.getElementById("predictionMessage");

        if (message) {
            message.textContent = "";
        }
    });
}


// =====================================
// 3. CONTACT FORM DEMO
// =====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const status = document.getElementById("contactStatus");

        status.style.color = "#741b35";
        status.textContent =
            "Demo only: your message has not been sent to a server.";

        contactForm.reset();
    });
}