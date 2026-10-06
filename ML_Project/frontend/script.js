// ==================================================
// WINE QUALITY PREDICTION
// ==================================================


// --------------------------------------------------
// Prediction Function
// --------------------------------------------------

async function predictWine() {

    // Get result and loading elements

    const result = document.getElementById("result");

    const loading = document.getElementById("loading");


    // Clear previous result

    result.style.display = "none";

    result.innerHTML = "";


    // Get input values

    const fixedAcidity =
        parseFloat(
            document.getElementById("fixed_acidity").value
        );


    const volatileAcidity =
        parseFloat(
            document.getElementById("volatile_acidity").value
        );


    const citricAcid =
        parseFloat(
            document.getElementById("citric_acid").value
        );


    const residualSugar =
        parseFloat(
            document.getElementById("residual_sugar").value
        );


    const chlorides =
        parseFloat(
            document.getElementById("chlorides").value
        );


    const freeSulfurDioxide =
        parseFloat(
            document.getElementById("free_sulfur_dioxide").value
        );


    const totalSulfurDioxide =
        parseFloat(
            document.getElementById("total_sulfur_dioxide").value
        );


    const density =
        parseFloat(
            document.getElementById("density").value
        );


    const pH =
        parseFloat(
            document.getElementById("pH").value
        );


    const sulphates =
        parseFloat(
            document.getElementById("sulphates").value
        );


    const alcohol =
        parseFloat(
            document.getElementById("alcohol").value
        );


    // --------------------------------------------------
    // Check whether all values are entered
    // --------------------------------------------------

    const values = [

        fixedAcidity,
        volatileAcidity,
        citricAcid,
        residualSugar,
        chlorides,
        freeSulfurDioxide,
        totalSulfurDioxide,
        density,
        pH,
        sulphates,
        alcohol

    ];


    if (values.some(value => isNaN(value))) {

        result.style.display = "block";

        result.innerHTML = `
            <h2>Please enter all 11 values.</h2>
        `;

        return;
    }


    // --------------------------------------------------
    // Create JSON data
    // --------------------------------------------------

    const wineData = {

        fixed_acidity: fixedAcidity,

        volatile_acidity: volatileAcidity,

        citric_acid: citricAcid,

        residual_sugar: residualSugar,

        chlorides: chlorides,

        free_sulfur_dioxide: freeSulfurDioxide,

        total_sulfur_dioxide: totalSulfurDioxide,

        density: density,

        pH: pH,

        sulphates: sulphates,

        alcohol: alcohol

    };


    // --------------------------------------------------
    // Show loading
    // --------------------------------------------------

    loading.style.display = "block";


    try {

        // Send request to FastAPI

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


        // Check response

        if (!response.ok) {

            throw new Error(
                "Server returned an error"
            );

        }


        // Convert response to JSON

        const data = await response.json();


        // Hide loading

        loading.style.display = "none";


        // Show prediction

        result.style.display = "block";


        result.innerHTML = `

            <h2>Prediction Result</h2>

            <div class="quality">

                ${data.predicted_quality}

            </div>

            <div class="category">

                ${data.category}

            </div>

            <p>
                Predicted Wine Quality
            </p>

        `;


    }

    catch (error) {

        // Hide loading

        loading.style.display = "none";


        // Show error

        result.style.display = "block";


        result.innerHTML = `

            <h2>Prediction Failed</h2>

            <p>
                Unable to connect to the backend.
            </p>

            <p>
                Please make sure FastAPI is running.
            </p>

        `;


        console.error(error);

    }

}


// --------------------------------------------------
// Reset Function
// --------------------------------------------------

function resetForm() {

    document.getElementById("fixed_acidity").value = "";

    document.getElementById("volatile_acidity").value = "";

    document.getElementById("citric_acid").value = "";

    document.getElementById("residual_sugar").value = "";

    document.getElementById("chlorides").value = "";

    document.getElementById("free_sulfur_dioxide").value = "";

    document.getElementById("total_sulfur_dioxide").value = "";

    document.getElementById("density").value = "";

    document.getElementById("pH").value = "";

    document.getElementById("sulphates").value = "";

    document.getElementById("alcohol").value = "";


    document.getElementById("result").style.display =
        "none";


    document.getElementById("result").innerHTML = "";

}