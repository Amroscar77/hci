# Formula 1 Podium Prediction — MS1

This folder contains the complete CSEN903 Milestone 1 Formula 1 podium-prediction workflow.

## Objective
Predict whether each driver entering a race finishes on the podium (Top 3), using only information available after qualifying and before race start.

## Notebook
- `f1_podium_prediction_ms1.ipynb` — complete MS1 notebook with EDA, data cleaning, the three data-engineering questions, leakage-safe feature engineering, preprocessing experiments, temporal train/validation/test splitting, model comparison, threshold selection, feature-group ablation, permutation importance, SHAP, local explanation, and inference.

## Models
- Logistic Regression
- Random Forest
- Shallow Feed-Forward Neural Network

## Final model selection
The shallow FFNN was selected using validation data. Its classification threshold was selected on the validation set only.

Validation:
- ROC-AUC: 0.9298
- PR-AUC: 0.7398
- F1: 0.7027
- Threshold: 0.53

Unseen test (2022–2024):
- ROC-AUC: 0.9131
- PR-AUC: 0.5748
- F1: 0.6203

## Temporal split
- Training: 1994–2019
- Validation: 2020–2021
- Test: 2022–2024

## Data
The raw F1 CSV dataset is not committed to GitHub. The notebook expects the dataset to be attached as a Kaggle input and automatically detects the folder containing the required CSV files.

## Run
Open the notebook in Kaggle, attach the F1 dataset through Add Input/Add Data, restart the session, and run the notebook from the first cell with Run All.
