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
      suggestions = 'You are obese. Consider seeking professional help to create a personalized workout and diet plan.';
    }
  }

  // Display the workout suggestions on the page
  workoutSuggestions.textContent = suggestions;
});
