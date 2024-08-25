import os
import pickle
import streamlit as st
import numpy as np
from PIL import Image
from streamlit_option_menu import option_menu
import joblib

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
# parkinsons_model = pickle.load(open(f'{working_dir}/saved_models/parkinsons_model.sav', 'rb'))
BreastCancer_model = pickle.load(open(f'{working_dir}/saved_models/brest_cancer.pkl', 'rb'))
# BrainCancer_model = pickle.load(open(f'{working_dir}/saved_models/BrainCancer_trained_model.sav', 'rb'))


# sidebar for navigation
with st.sidebar:
    selected = option_menu('Multiple Disease Prediction System',
                           ['Diabetes Prediction',
                            'Heart Disease Prediction',
                            # 'Parkinsons Prediction',
                            'Breast Cancer Prediction',
                            # 'Brain Cancer Prediction',
                            'Menstrual Cycle Prediction',
                            'PCOS Diagnosis Prediction',
                            'Autism Diagnosis Prediction'],
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






# # Parkinson's Prediction Page
# if selected == "Parkinsons Prediction":

#     # page title
#     st.title("Parkinson's Disease Prediction using ML")

#     col1, col2, col3, col4, col5 = st.columns(5)

#     with col1:
#         fo = st.text_input('MDVP:Fo(Hz)')

#     with col2:
#         fhi = st.text_input('MDVP:Fhi(Hz)')

#     with col3:
#         flo = st.text_input('MDVP:Flo(Hz)')

#     with col4:
#         Jitter_percent = st.text_input('MDVP:Jitter(%)')

#     with col5:
#         Jitter_Abs = st.text_input('MDVP:Jitter(Abs)')

#     with col1:
#         RAP = st.text_input('MDVP:RAP')

#     with col2:
#         PPQ = st.text_input('MDVP:PPQ')

#     with col3:
#         DDP = st.text_input('Jitter:DDP')

#     with col4:
#         Shimmer = st.text_input('MDVP:Shimmer')

#     with col5:
#         Shimmer_dB = st.text_input('MDVP:Shimmer(dB)')

#     with col1:
#         APQ3 = st.text_input('Shimmer:APQ3')

#     with col2:
#         APQ5 = st.text_input('Shimmer:APQ5')

#     with col3:
#         APQ = st.text_input('MDVP:APQ')

#     with col4:
#         DDA = st.text_input('Shimmer:DDA')

#     with col5:
#         NHR = st.text_input('NHR')

#     with col1:
#         HNR = st.text_input('HNR')

#     with col2:
#         RPDE = st.text_input('RPDE')

#     with col3:
#         DFA = st.text_input('DFA')

#     with col4:
#         spread1 = st.text_input('spread1')

#     with col5:
#         spread2 = st.text_input('spread2')

#     with col1:
#         D2 = st.text_input('D2')

#     with col2:
#         PPE = st.text_input('PPE')

#     # code for Prediction
#     parkinsons_diagnosis = ''

#     # creating a button for Prediction    
#     if st.button("Parkinson's Test Result"):

#         user_input = [fo, fhi, flo, Jitter_percent, Jitter_Abs,
#                       RAP, PPQ, DDP,Shimmer, Shimmer_dB, APQ3, APQ5,
#                       APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]

#         user_input = [float(x) for x in user_input]

#         parkinsons_prediction = parkinsons_model.predict([user_input])

#         if parkinsons_prediction[0] == 1:
#             parkinsons_diagnosis = "The person has Parkinson's disease"
#         else:
#             parkinsons_diagnosis = "The person does not have Parkinson's disease"

#     st.success(parkinsons_diagnosis)




# Breast Cancer Prediction Page
# BreastCancer_model = 'saved_models/brest_cancer.pkl'
if selected == 'Breast Cancer Prediction':

    # page title
    st.title('Breast Cancer Prediction using ML')

    col1, col2, col3 = st.columns(3)
    #diagnosis	radius_mean	texture_mean	perimeter_mean	area_mean	smoothness_mean	compactness_mean	concavity_mean	concave points_mean	symmetry_mean	fractal_dimension_mean	radius_se	texture_se	perimeter_se	area_se	smoothness_se	compactness_se	concavity_se	concave points_se	symmetry_se	fractal_dimension_se	radius_worst	texture_worst	perimeter_worst	area_worst	smoothness_worst	compactness_worst	concavity_worst	concave points_worst	symmetry_worst	fractal_dimension_worst
    with col1:
        texture_mean = st.text_input('Texture Mean')
        smoothness_mean = st.text_input('Smoothness Mean')
        compactness_mean = st.text_input('Compactness Mean')
        concave_points_mean = st.text_input('Concave Points Mean')
        symmetry_mean = st.text_input('Symmetry Mean')
        fractal_dimension_mean = st.text_input('Fractal Dimension Mean')
        texture_se = st.text_input('Texture SE')
    with col2:
        area_se = st.text_input('Area SE')
        smoothness_se = st.text_input('Smoothness SE')
        compactness_se = st.text_input('Compactness SE')
        concavity_se = st.text_input('Concavity SE')
        concave_points_se = st.text_input('Concave Points SE')
        symmetry_se = st.text_input('Symmetry SE')
        fractal_dimension_se = st.text_input('Fractal Dimension SE')
        texture_worst = st.text_input('Texture Worst')
    with col3:
        area_worst = st.text_input('Area Worst')
        smoothness_worst = st.text_input('Smoothness Worst')
        compactness_worst = st.text_input('Compactness Worst')
        concavity_worst = st.text_input('Concavity Worst')
        concave_points_worst = st.text_input('Concave Points Worst')
        symmetry_worst = st.text_input('Symmetry Worst')
        fractal_dimension_worst = st.text_input('Fractal Dimension Worst')

    
    # code for Prediction
    breast_diagnosis = ''

    # creating a button for Prediction

    if st.button('Breast Cancer Prediction Test Result'):

        user_input = [texture_mean, smoothness_mean,
                compactness_mean, concave_points_mean, symmetry_mean,
                fractal_dimension_mean, texture_se, area_se,
                smoothness_se, compactness_se, concavity_se, concave_points_se, symmetry_se,
                fractal_dimension_se, texture_worst, area_worst,
                smoothness_worst, compactness_worst, concavity_worst, concave_points_worst,
                symmetry_worst, fractal_dimension_worst
            ]

        user_input = [float(x) for x in user_input]
        # user_input = [float(x) for x in user_input]

        breast_prediction = BreastCancer_model.predict([user_input])

        if breast_prediction[0] == 1:
            breast_diagnosis = 'The person is having Breast Cancer'
        else:
            breast_diagnosis = 'The person does not have any symptom of Breast Cancer Prediction'

    st.success(breast_diagnosis)


# # Brain Cancer Prediction Page
# if selected == 'Brain Cancer Prediction':
#     st.title("Brain Cancer Prediction Portal")

#     uploaded_file = st.file_uploader("Upload MRI Image", type=["jpg", "png", "jpeg"])

#     if uploaded_file is not None:
#         image = Image.open(uploaded_file)
#         st.image(image, caption='Uploaded MRI Image', use_column_width=True)

#         image = image.resize((224, 224))  # Resize image to match model input size
#         image_array = np.array(image)
#         image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
#         image_array = image_array / 255.0  # Normalize if needed

#         if st.button("Predict"):
#             try:
#                 prediction = BrainCancer_model.predict(image_array)
#                 predicted_class = np.argmax(prediction, axis=1)  # Assuming a multi-class classification
#                 if predicted_class[0] == 1:
#                     st.success("The MRI shows signs of Brain Cancer.")
#                 else:
#                     st.success("The MRI does not show signs of Brain Cancer.")
#             except Exception as e:
#                 st.error(f"An error occurred: {e}")
#     else:
#         st.write("Please upload an MRI image for prediction.")



# Load the trained model at the beginning of your script
model_path = 'saved_models/Menstrual_model1.pkl'

try:
    Menstrual_model = joblib.load(model_path)
except Exception as e:
    st.error(f"Error loading model: {e}")
    Menstrual_model = None

if selected == 'Menstrual Cycle Prediction':
    st.title('Menstrual Cycle Prediction using ML')

    # Input fields
    col1, col2, col3 = st.columns(3)

    with col1:
        CycleNumber = st.text_input('Cycle Number')
        Group = st.text_input('Group')
        CycleWithPeakorNot = st.text_input('Cycle with Peak or Not')
        EstimatedDayofOvulation = st.text_input('Estimated Day of Ovulation')
        ReproductiveCategory = st.text_input('Reproductive Category')
        LengthofLutealPhase = st.text_input('Length of Luteal Phase')
        FirstDayofHigh = st.text_input('First Day of High Fertility')

    with col2:
        TotalNumberofHighDays = st.text_input('Total Number of High Days')
        TotalHighPostPeak = st.text_input('Total High Post Peak')
        TotalNumberofPeakDays = st.text_input('Total Number of Peak Days')
        TotalDaysofFertility = st.text_input('Total Days of Fertility')
        TotalFertilityFormula = st.text_input('Total Formula of Fertility')
        LengthofMenses = st.text_input('Length of Menses')

    with col3:
        MensesScoreDayOne = st.text_input('Menses Score Day One')
        MensesScoreDayTwo = st.text_input('Menses Score Day Two')
        MensesScoreDayThree = st.text_input('Menses Score Day Three')
        MensesScoreDayFour = st.text_input('Menses Score Day Four')
        MensesScoreDayFive = st.text_input('Menses Score Day Five')
        TotalMensesScore = st.text_input('Total Menses Score')
        NumberofDaysofIntercourse = st.text_input('Number of Days of Intercourse')
        IntercourseInFertileWindow = st.text_input('Intercourse InFertile Window')
        UnusualBleeding = st.text_input('Unusual Bleeding')

    # Initialize prediction result
    Menstrual_diagnosis = ''
    Menstrual_Cycle_prediction = None

    # Prediction button
    if st.button('Menstrual Cycle Test Result'):
        try:
            # Collect user input and convert to float
            user_input = [CycleNumber                   ,
Group,
CycleWithPeakorNot,
ReproductiveCategory,
EstimatedDayofOvulation,
LengthofLutealPhase           ,
FirstDayofHigh                 ,
TotalNumberofHighDays         ,
TotalHighPostPeak             ,
TotalNumberofPeakDays      ,
TotalDaysofFertility       ,
TotalFertilityFormula   ,
LengthofMenses              ,
MensesScoreDayOne           ,
MensesScoreDayTwo           ,
MensesScoreDayThree        ,
MensesScoreDayFour            ,
MensesScoreDayFive          ,
TotalMensesScore          ,
NumberofDaysofIntercourse   ,
IntercourseInFertileWindow  ,
UnusualBleeding]
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






PCOSmodel_path = 'saved_models/pcos.pkl'

try:
    PCOS_model = joblib.load(PCOSmodel_path)
except Exception as e:
    st.error(f"Error loading model: {e}")
    PCOS_model = None

if selected == 'PCOS Diagnosis Prediction':
    st.title('PCOS Prediction using ML')

    # Input fields
    col1, col2, col3 = st.columns(3)

    with col1:
        Age = st.text_input('Age (yrs)')
        Weight = st.text_input('Weight (Kg)')
        Height = st.text_input('Height (Cm)')
        BMI = st.text_input('BMI')
        BloodGroup = st.text_input('Blood Group')
        PulseRate = st.text_input('Pulse rate (bpm)')
        RR = st.text_input('Respiratory Rate (breaths/min)')
        Hb = st.text_input('Hemoglobin (g/dl)')
        Cycle = st.text_input('Cycle (Regular/Irregular)')
        CycleLength = st.text_input('Cycle length (days)')
        MarriageStatus = st.text_input('Marriage Status (Yrs)')
        Pregnant = st.text_input('Pregnant (Y/N)')
        Aborptions = st.text_input('No. of Aborptions')

    with col2:
        BetaHCG_I = st.text_input('I Beta-HCG (mIU/mL)')
        BetaHCG_II = st.text_input('II Beta-HCG (mIU/mL)')
        FSH = st.text_input('FSH (mIU/mL)')
        LH = st.text_input('LH (mIU/mL)')
        FSH_LH_Ratio = st.text_input('FSH/LH Ratio')
        Hip = st.text_input('Hip (inch)')
        Waist = st.text_input('Waist (inch)')
        Waist_Hip_Ratio = st.text_input('Waist:Hip Ratio')
        TSH = st.text_input('TSH (mIU/L)')
        AMH = st.text_input('AMH (ng/mL)')
        PRL = st.text_input('PRL (ng/mL)')
        VitD3 = st.text_input('Vitamin D3 (ng/mL)')
        PRG = st.text_input('Progesterone (ng/mL)')
        RBS = st.text_input('Random Blood Sugar (mg/dl)')

    with col3:
        WeightGain = st.text_input('Weight Gain (Y/N)')
        HairGrowth = st.text_input('Hair Growth (Y/N)')
        SkinDarkening = st.text_input('Skin Darkening (Y/N)')
        HairLoss = st.text_input('Hair Loss (Y/N)')
        Pimples = st.text_input('Pimples (Y/N)')
        FastFood = st.text_input('Fast Food (Y/N)')
        RegularExercise = st.text_input('Regular Exercise (Y/N)')
        BP_Systolic = st.text_input('BP Systolic (mmHg)')
        BP_Diastolic = st.text_input('BP Diastolic (mmHg)')
        FollicleNo_L = st.text_input('Follicle No. (L)')
        FollicleNo_R = st.text_input('Follicle No. (R)')
        AvgFSize_L = st.text_input('Avg. Follicle Size (L) (mm)')
        AvgFSize_R = st.text_input('Avg. Follicle Size (R) (mm)')
        Endometrium = st.text_input('Endometrium (mm)')

    # Initialize prediction result
    PCOS_diagnosis = ''
    PCOS_prediction = None

    # Prediction button
    if st.button('PCOS Test Result'):
        try:
            # Collect user input and convert to float
            user_input = [Age, Weight, Height, BMI, BloodGroup, PulseRate, RR, Hb, Cycle, CycleLength, 
                          MarriageStatus, Pregnant, Aborptions, BetaHCG_I, BetaHCG_II, FSH, LH, FSH_LH_Ratio,
                          Hip, Waist, Waist_Hip_Ratio, TSH, AMH, PRL, VitD3, PRG, RBS, WeightGain, HairGrowth,
                          SkinDarkening, HairLoss, Pimples, FastFood, RegularExercise, BP_Systolic, BP_Diastolic,
                          FollicleNo_L, FollicleNo_R, AvgFSize_L, AvgFSize_R, Endometrium]
            
            user_input = [float(x) for x in user_input if x]  # Filter out empty inputs and convert to float

            # Ensure model is loaded before predicting
            if PCOS_model is not None:
                PCOS_prediction = PCOS_model.predict([user_input])
            else:
                st.error("Model not loaded. Cannot proceed with prediction.")
        
        except Exception as e:
            st.error(f"Error during prediction: {e}")

        # Check the prediction result
        if PCOS_prediction is not None and PCOS_prediction[0] == 1:
            PCOS_diagnosis = 'The person is likely to have PCOS'
        elif PCOS_prediction is not None:
            PCOS_diagnosis = 'The person is unlikely to have PCOS'
        else:
            PCOS_diagnosis = 'Prediction failed'

    # Display diagnosis result
    st.success(PCOS_diagnosis)











try:
    Autism_model = pickle.load(open(f'{working_dir}/saved_models/Autism_trained_model.pkl', 'rb'))
except Exception as e:
    st.error(f"Error loading model: {e}")
    Autism_model = None

if selected == 'Autism Diagnosis Prediction':
    st.title('Autism Prediction using ML')

    # Input fields
    col1, col2 = st.columns(2)

    # Input for diagnostic questions
    with col1:
        A1_Score = st.text_input('A1 Score')
        A2_Score = st.text_input('A2 Score')
        A3_Score = st.text_input('A3 Score')
        A4_Score = st.text_input('A4 Score')
        A5_Score = st.text_input('A5 Score')
        A6_Score = st.text_input('A6 Score')
        A7_Score = st.text_input('A7 Score')
        A8_Score = st.text_input('A8 Score')
        A9_Score = st.text_input('A9 Score')
        A10_Score = st.text_input('A10 Score')

    with col2:
        Age = st.text_input('Age (months)')
        Sex = st.selectbox('Sex', ['Male', 'Female'])
        Ethnicity = st.selectbox('Ethnicity', [
            'Middle Eastern', 'White European', 'Hispanic', 'Asian', 
            'South Asian', 'Native Indian', 'Black', 'Latino', 
            'Mixed', 'Pacifica', 'Others'
        ])
        Jaundice = st.selectbox('Jaundice', ['Yes', 'No'])
        Family_mem_with_ASD = st.selectbox('Family Member with ASD', ['Yes', 'No'])
        Who_completed_the_test = st.selectbox('Who completed the test?', [
            'Family member', 'Health Care Professional', 'Self', 'Others'
        ])

    # Initialize prediction result
    Autism_diagnosis = ''
    Autism_prediction = None

    # Prediction button
    if st.button('Autism Test Result'):
        try:
            # Convert scores and other numeric inputs to float
            numeric_inputs = [
                A1_Score, A2_Score, A3_Score, A4_Score, A5_Score, A6_Score,
                A7_Score, A8_Score, A9_Score, A10_Score, Age
            ]

            # Ensure the conversion of numeric inputs
            numeric_values = []
            for value in numeric_inputs:
                try:
                    numeric_values.append(float(value))
                except ValueError:
                    numeric_values.append(0)  # Default to 0 if invalid input

            # Convert other inputs into appropriate formats
            gender = 1 if Sex == 'Male' else 0

            # Mapping Ethnicity to numerical values
            ethnicity_mapping = {
                'Middle Eastern': 0,
                'White European': 1,
                'Hispanic': 2,
                'Asian': 3,
                'South Asian': 4,
                'Native Indian': 5,
                'Black': 6,
                'Latino': 7,
                'Mixed': 8,
                'Pacifica': 9,
                'Others': 10
            }
            ethnicity = ethnicity_mapping.get(Ethnicity, -1)  # Default to -1 if not found

            jaundice = 1 if Jaundice == 'Yes' else 0
            family_asd = 1 if Family_mem_with_ASD == 'Yes' else 0

            # Mapping Who_completed_the_test to numerical values
            who_completed_mapping = {
                'Family member': 0,
                'Health Care Professional': 1,
                'Self': 2,
                'Others': 3
            }
            who_completed = who_completed_mapping.get(Who_completed_the_test, -1)  # Default to -1 if not found

            # Combine inputs for prediction
            user_input = numeric_values + [gender, ethnicity, jaundice, family_asd, who_completed]

            # Ensure model is loaded before predicting
            if Autism_model is not None:
                Autism_prediction = Autism_model.predict([user_input])
            else:
                st.error("Model not loaded. Cannot proceed with prediction.")

        except Exception as e:
            st.error(f"Error during prediction: {e}")

        # Check prediction result
        if Autism_prediction is not None and Autism_prediction[0] == 1:
            Autism_diagnosis = 'The person is likely to have Autism'
        elif Autism_prediction is not None:
            Autism_diagnosis = 'The person is unlikely to have Autism'
        else:
            Autism_diagnosis = 'Prediction failed'

    # Display diagnosis result
    st.success(Autism_diagnosis)
