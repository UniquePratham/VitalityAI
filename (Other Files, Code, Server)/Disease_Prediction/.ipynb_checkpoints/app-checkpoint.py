import os
import pickle
import streamlit as st
import numpy as np
from PIL import Image
from streamlit_option_menu import option_menu


# Set page configuration
st.set_page_config(page_title="Health Assistant",
                   layout="wide",
                   page_icon="🧑‍⚕️")

# Inject custom CSS for styling
def local_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

local_css('style.css')

# getting the working directory of the main.py
working_dir = os.path.dirname(os.path.abspath(__file__))

# loading the saved models
diabetes_model = pickle.load(open(f'{working_dir}/saved_models/diabetes_model.sav', 'rb'))
heart_disease_model = pickle.load(open(f'{working_dir}/saved_models/heart_disease_model.sav', 'rb'))
parkinsons_model = pickle.load(open(f'{working_dir}/saved_models/parkinsons_model.sav', 'rb'))


BreastCancer_model = pickle.load(open(f'{working_dir}/saved_models/trained_model.sav', 'rb'))
BrainCancer_model = pickle.load(open(f'{working_dir}/saved_models/BrainCancer_trained_model.sav', 'rb'))

# sidebar for navigation
with st.sidebar:
    selected = option_menu('Multiple Disease Prediction System',
                           ['Diabetes Prediction',
                            'Heart Disease Prediction',
                            'Parkinsons Prediction',
                            'Breast Cancer Prediction',
                            'Brain Cancer Prediction',
                            'Menstrual Cycle'],
                           menu_icon='hospital-fill',
                           icons=['activity', 'heart', 'person', 'lungs', 'dna'],
                           default_index=0)

# Diabetes Prediction Page
if selected == 'Diabetes Prediction':
    # page title
    st.title('Diabetes Prediction using ML')

    # getting the input data from the user
# getting the input data from the user
    col1, col2, col3 = st.columns(3)

    with col1:
        Pregnancies = st.text_input('Number of Pregnancies')

    with col2:
        Glucose = st.text_input('Glucose Level')

    with col3:
        BloodPressure = st.text_input('Blood Pressure value')

    with col1:
        SkinThickness = st.text_input('Skin Thickness value')

    with col2:
        Insulin = st.text_input('Insulin Level')

    with col3:
        BMI = st.text_input('BMI value')

    with col1:
        DiabetesPedigreeFunction = st.text_input('Diabetes Pedigree Function value')

    with col2:
        Age = st.text_input('Age of the Person')

    # code for Prediction
    diab_diagnosis = ''

    # creating a button for Prediction
    if st.button('Diabetes Test Result'):
        user_input = [Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age]  # Add all input fields
        user_input = [float(x) for x in user_input]
        diab_prediction = diabetes_model.predict([user_input])
        if diab_prediction[0] == 1:
            diab_diagnosis = 'The person is diabetic'
        else:
            diab_diagnosis = 'The person is not diabetic'

    st.success(diab_diagnosis)

# Heart Disease Prediction Page
if selected == 'Heart Disease Prediction':

    # page title
    st.title('Heart Disease Prediction using ML')

    col1, col2, col3 = st.columns(3)

    with col1:
        age = st.text_input('Age')

    with col2:
        sex = st.text_input('Sex')

    with col3:
        cp = st.text_input('Chest Pain types')

    with col1:
        trestbps = st.text_input('Resting Blood Pressure')

    with col2:
        chol = st.text_input('Serum Cholestoral in mg/dl')

    with col3:
        fbs = st.text_input('Fasting Blood Sugar > 120 mg/dl')

    with col1:
        restecg = st.text_input('Resting Electrocardiographic results')

    with col2:
        thalach = st.text_input('Maximum Heart Rate achieved')

    with col3:
        exang = st.text_input('Exercise Induced Angina')

    with col1:
        oldpeak = st.text_input('ST depression induced by exercise')

    with col2:
        slope = st.text_input('Slope of the peak exercise ST segment')

    with col3:
        ca = st.text_input('Major vessels colored by flourosopy')

    with col1:
        thal = st.text_input('thal: 0 = normal; 1 = fixed defect; 2 = reversable defect')

    # code for Prediction
    heart_diagnosis = ''

    # creating a button for Prediction

    if st.button('Heart Disease Test Result'):

        user_input = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]

        user_input = [float(x) for x in user_input]

        heart_prediction = heart_disease_model.predict([user_input])

        if heart_prediction[0] == 1:
            heart_diagnosis = 'The person is having heart disease'
        else:
            heart_diagnosis = 'The person does not have any heart disease'

    st.success(heart_diagnosis)






# Parkinson's Prediction Page
if selected == "Parkinsons Prediction":

    # page title
    st.title("Parkinson's Disease Prediction using ML")

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        fo = st.text_input('MDVP:Fo(Hz)')

    with col2:
        fhi = st.text_input('MDVP:Fhi(Hz)')

    with col3:
        flo = st.text_input('MDVP:Flo(Hz)')

    with col4:
        Jitter_percent = st.text_input('MDVP:Jitter(%)')

    with col5:
        Jitter_Abs = st.text_input('MDVP:Jitter(Abs)')

    with col1:
        RAP = st.text_input('MDVP:RAP')

    with col2:
        PPQ = st.text_input('MDVP:PPQ')

    with col3:
        DDP = st.text_input('Jitter:DDP')

    with col4:
        Shimmer = st.text_input('MDVP:Shimmer')

    with col5:
        Shimmer_dB = st.text_input('MDVP:Shimmer(dB)')

    with col1:
        APQ3 = st.text_input('Shimmer:APQ3')

    with col2:
        APQ5 = st.text_input('Shimmer:APQ5')

    with col3:
        APQ = st.text_input('MDVP:APQ')

    with col4:
        DDA = st.text_input('Shimmer:DDA')

    with col5:
        NHR = st.text_input('NHR')

    with col1:
        HNR = st.text_input('HNR')

    with col2:
        RPDE = st.text_input('RPDE')

    with col3:
        DFA = st.text_input('DFA')

    with col4:
        spread1 = st.text_input('spread1')

    with col5:
        spread2 = st.text_input('spread2')

    with col1:
        D2 = st.text_input('D2')

    with col2:
        PPE = st.text_input('PPE')

    # code for Prediction
    parkinsons_diagnosis = ''

    # creating a button for Prediction    
    if st.button("Parkinson's Test Result"):

        user_input = [fo, fhi, flo, Jitter_percent, Jitter_Abs,
                      RAP, PPQ, DDP,Shimmer, Shimmer_dB, APQ3, APQ5,
                      APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]

        user_input = [float(x) for x in user_input]

        parkinsons_prediction = parkinsons_model.predict([user_input])

        if parkinsons_prediction[0] == 1:
            parkinsons_diagnosis = "The person has Parkinson's disease"
        else:
            parkinsons_diagnosis = "The person does not have Parkinson's disease"

    st.success(parkinsons_diagnosis)




# Breast Cancer Prediction Page
if selected == 'Breast Cancer Prediction':

    # page title
    st.title('Breast Cancer Prediction using ML')

    col1, col2, col3 = st.columns(3)
    #diagnosis	radius_mean	texture_mean	perimeter_mean	area_mean	smoothness_mean	compactness_mean	concavity_mean	concave points_mean	symmetry_mean	fractal_dimension_mean	radius_se	texture_se	perimeter_se	area_se	smoothness_se	compactness_se	concavity_se	concave points_se	symmetry_se	fractal_dimension_se	radius_worst	texture_worst	perimeter_worst	area_worst	smoothness_worst	compactness_worst	concavity_worst	concave points_worst	symmetry_worst	fractal_dimension_worst


    with col1:
        radius_mean = st.text_input('radius_mean')
    with col2:
        texture_mean = st.text_input('texture_mean')
    with col3:
        perimeter_mean = st.text_input('perimeter_mean')
    with col1:
        area_mean = st.text_input('area_mean')
    with col2:
        smoothness_mean = st.text_input('smoothness_mean')
    with col3:
        compactness_mean = st.text_input('compactness_mean')
    with col1:
        concavity_mean = st.text_input('concavity_mean')
    with col2:
        concave_points_mean = st.text_input('concave points_mean')
    with col3:
        symmetry_mean = st.text_input('symmetry_mean')
    with col1:
        fractal_dimension_mean = st.text_input('fractal_dimension_mean')
    with col2:
        radius_se = st.text_input('radius_se')
    with col3:
        texture_se = st.text_input('texture_se')
    with col1:
        perimeter_se = st.text_input('perimeter_se')
    with col2:
        area_se = st.text_input('area_se')
    with col3:
        smoothness_se = st.text_input('smoothness_se')
    with col1:
        compactness_se = st.text_input('compactness_se')
    with col2:
        concavity_se = st.text_input('concavity_se')
    with col3:
        concave_points_se = st.text_input('concave points_se')
    with col1:
        symmetry_se = st.text_input('symmetry_se')
    with col2:
        fractal_dimension_se = st.text_input('fractal_dimension_se')
    with col3:
        radius_worst = st.text_input('radius_worst')
    with col1:
        texture_worst = st.text_input('texture_worst')
    with col2:
        perimeter_worst = st.text_input('perimeter_worst')
    with col3:
        area_worst = st.text_input('area_worst')
    with col1:
        smoothness_worst = st.text_input('smoothness_worst')
    with col2:
        compactness_worst = st.text_input('compactness_worst')
    with col3:
        concavity_worst = st.text_input('concavity_worst')
    with col1:
        concave_points_worst = st.text_input('concave points_worst')
    with col2:
        symmetry_worst = st.text_input('symmetry_worst')
    with col3:
        fractal_dimension_worst = st.text_input('fractal_dimension_worst')

    # code for Prediction
    breast_diagnosis = ''

    # creating a button for Prediction

    if st.button('Breast Cancer Prediction Test Result'):

        user_input = [radius_mean,texture_mean,perimeter_mean,
                      	area_mean,	smoothness_mean,	compactness_mean,
                            	concavity_mean,	concave_points_mean,	symmetry_mean,	fractal_dimension_mean,	radius_se,	texture_se,	perimeter_se,	area_se,	smoothness_se,	compactness_se,	concavity_se,	concave_points_se,	symmetry_se,	fractal_dimension_se,	radius_worst,	texture_worst,	perimeter_worst,	area_worst,	smoothness_worst,	compactness_worst,	concavity_worst,	concave_points_worst,	symmetry_worst,	fractal_dimension_worst]

        user_input = np.array([float(x) for x in user_input]).reshape(1, -1)
        # user_input = [float(x) for x in user_input]

        breast_prediction = BreastCancer_model.predict([user_input])

        if breast_prediction[0] == 1:
            breast_diagnosis = 'The person is having Breast Cancer'
        else:
            breast_diagnosis = 'The person does not have any symptom of Breast Cancer Prediction'

    st.success(breast_diagnosis)






# Brain Cancer Prediction Page
if selected == 'Brain Cancer Prediction':
    st.title("Brain Cancer Prediction Portal")

    uploaded_file = st.file_uploader("Upload MRI Image", type=["jpg", "png", "jpeg"])

    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded MRI Image', use_column_width=True)

        image = image.resize((224, 224))  # Resize image to match model input size
        image_array = np.array(image)
        image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
        image_array = image_array / 255.0  # Normalize if needed

        if st.button("Predict"):
            try:
                prediction = BrainCancer_model.predict(image_array)
                predicted_class = np.argmax(prediction, axis=1)  # Assuming a multi-class classification
                if predicted_class[0] == 1:
                    st.success("The MRI shows signs of Brain Cancer.")
                else:
                    st.success("The MRI does not show signs of Brain Cancer.")
            except Exception as e:
                st.error(f"An error occurred: {e}")
    else:
        st.write("Please upload an MRI image for prediction.")











import joblib
# Load the trained model at the beginning of your script
model_path = 'saved_models\Manstrual_model.pkl'

try:
    Menstrual_model = joblib.load(model_path)
except Exception as e:
    st.error(f"Error loading model: {e}")
    Menstrual_model = None

if selected == 'Menstrual Cycle':
    st.title('Menstrual Cycle Prediction using ML')

    # Input fields
    col1, col2, col3 = st.columns(3)

    with col1:
        CycleNumber = st.text_input('Cycle Number')
        Group = st.text_input('Group')
        CycleWithPeakorNot = st.text_input('Cycle with Peak or Not')
        LengthofCycle = st.text_input('Length of Cycle')
        EstimatedDayofOvulation = st.text_input('Estimated Day of Ovulation')

    with col2:
        ReproductiveCategory = st.text_input('Reproductive Category')
        MeanCycleLength = st.text_input('Mean Cycle Length')
        LengthofLutealPhase = st.text_input('Length of Luteal Phase')
        FirstDayofHigh = st.text_input('First Day of High Fertility')
        TotalNumberofHighDays = st.text_input('Total Number of High Days')
        TotalHighPostPeak = st.text_input('Total High Post Peak')

    with col3:
        TotalNumberofPeakDays = st.text_input('Total Number of Peak Days')
        TotalDaysofFertility = st.text_input('Total Days of Fertility')
        LengthofMenses = st.text_input('Length of Menses')
        MeanMensesLength = st.text_input('Mean Menses Length')
        MensesScoreDayOne = st.text_input('Menses Score Day One')
        Age = st.text_input('Age')

    # Initialize prediction result
    Menstrual_diagnosis = ''
    Menstrual_Cycle_prediction = None

    # Prediction button
    if st.button('Menstrual Cycle Test Result'):
        try:
            # Collect user input and convert to float
            user_input = [CycleNumber, Group, CycleWithPeakorNot, LengthofCycle, EstimatedDayofOvulation,
                          ReproductiveCategory, MeanCycleLength, LengthofLutealPhase, FirstDayofHigh, TotalNumberofHighDays,
                          TotalHighPostPeak, TotalNumberofPeakDays, TotalDaysofFertility, LengthofMenses, MeanMensesLength,
                          MensesScoreDayOne, Age]
            user_input = [float(x) for x in user_input if x]  # Filter out empty inputs and convert to float

            # Ensure model is loaded before predicting
            if Menstrual_model is not None:
                Menstrual_Cycle_prediction = Menstrual_model.predict([user_input])
            else:
                st.error("Model not loaded. Cannot proceed with prediction.")
        
        except Exception as e:
            st.error(f"Error during prediction: {e}")

        # Check the prediction result
        if Menstrual_Cycle_prediction is not None and Menstrual_Cycle_prediction[0] == 1:
            Menstrual_diagnosis = 'The person has menstrual irregularities'
        elif Menstrual_Cycle_prediction is not None:
            Menstrual_diagnosis = 'The person has a normal menstrual cycle'
        else:
            Menstrual_diagnosis = 'Prediction failed'

    # Display diagnosis result
    st.success(Menstrual_diagnosis)
