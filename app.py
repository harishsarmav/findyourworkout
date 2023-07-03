from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        height = float(request.form['height'])
        weight = float(request.form['weight'])
        gender = request.form['gender']
        activity_level = request.form['activity-level']

        # Calculate BMI
        height_m = height / 100  # Convert height from cm to meters
        bmi = weight / (height_m ** 2)

        # Define BMI categories and their corresponding interpretations
        bmi_categories = {
            (0, 18.4): 'Underweight',
            (18.5, 24.9): 'Normal weight',
            (25, 29.9): 'Overweight',
            (30, float('inf')): 'Obese'
        }

        # Determine the BMI category based on the BMI value
        bmi_category = None
        for range_, category in bmi_categories.items():
            if range_[0] <= bmi <= range_[1]:
                bmi_category = category
                break

        # Render the template with the calculated BMI and category
        return render_template('index.html', bmi=bmi, category=bmi_category)

    # If it's a GET request or no form data submitted yet, render the template without BMI data
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
