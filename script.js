const form = document.querySelector('#fitness-form');
const workoutSuggestions = document.querySelector('#workout-suggestions');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the height and weight entered by the user
  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);

  // Calculate the workout suggestions
  let suggestions = '';
  if (height && weight) {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
      suggestions = 'You are underweight. Try incorporating more protein and strength training into your routine.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      suggestions = 'Your weight is healthy. Keep up the good work!';
    } else if (bmi >= 25 && bmi <= 29.9) {
      suggestions = 'You are overweight. Try incorporating more cardio and reducing your caloric intake.';
    } else {
      // Make an API call to get workout suggestions for obese users
      const url = `https://trackapi.nutritionix.com/v2/natural/exercise`;
      const headers = {
        'Content-Type': 'application/json',
        'x-app-id': eac9143c,
        'x-app-key': 4200ea571903f91fdeccfc9674cc1f7e — 
      };
      const data = {
        query: 'I am obese. What workout should I do?',
        gender: 'male',
        weight_kg: weight,
        height_cm: height
      };
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data.exercises && data.exercises.length > 0) {
          suggestions = `Here are some workout suggestions for you: ${data.exercises[0].name}, ${data.exercises[1].name}, ${data.exercises[2].name}`;
        } else {
          suggestions = 'Sorry, we could not find any workout suggestions for you.';
        }
        workoutSuggestions.textContent = suggestions;
      })
      .catch(error => console.error(error));
    }
  }

  // Display the workout suggestions on the page
  workoutSuggestions.textContent = suggestions;
});
