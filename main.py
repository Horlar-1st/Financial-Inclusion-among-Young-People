# Importing all neccessary libraries 
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier


# importing the csv file
df = pd.read_csv("data/data.csv", index_col= "Unnamed: 0", low_memory=False)

# Selecting the age range for youth
df_youth_selected = df[df["E7"]<25]
df_youth_selected = df_youth_selected.reset_index(drop=True)

# Cleaning the data
# Gender
df_youth_selected["E6"] = pd.Categorical(df_youth_selected["E6"], ordered=True, categories=["Male", "Female"])
df_youth_selected = df_youth_selected.rename({"E6":"gender"}, axis=1)
df_youth_selected["gender"] = df_youth_selected["gender"].cat.codes

# Education
rank_edu = ['No education', 'Pre-school', 'Primary incomplete', 'Primary complete', 'Secondary incomplete', 'Secondary complete', 
            'Non-formal education (e.g. Arabic/Quranic education)', 'University/Polytechnic OND', 'University/Polytechnic HND',
            'Post-university complete', 'Post-university incomplete']
df_youth_selected.loc[:, "education"] = pd.Categorical(df_youth_selected["E8"], categories=rank_edu, ordered=True)
df_youth_selected["education"] = df_youth_selected["education"].cat.codes

# Banking barriers (Reasons for not using banking services)
# Ranks for yes and no
yes_no_ranking = lambda x: 1 if x == "Yes" else 0
BA4_list = ["BA4_1", 'BA4_2', 'BA4_3', 'BA4_4', 'BA4_5', 'BA4_6', 'BA4_7', 'BA4_8', 'BA4_9', 'BA4_10', 'BA4_11', 'BA4_12', 'BA4_13', 'BA4_14', 
            'BA4_15', 'BA4_16', 'BA4_17', 'BA4_98', 'BA4_96', 'BA4_Other']
for i in BA4_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected['barriers_value'] = df_youth_selected[BA4_list].sum(axis=1)

# Banking documents
E14_list = ['E14_1', 'E14_2', 'E14_3', 'E14_4', 'E14_5', 'E14_6', 'E14_7', 'E14_8', 'E14_9', 'E14_10', 'E14_11', 'E14_12', 'E14_13',
            'E14_14', 'E14_15', 'E14_16', 'E14_17', 'E14_18', 'E14_19']
for i in E14_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected['b_documents']  = df_youth_selected[E14_list].sum(axis = 1)

## Sources of money/income
E9_list = ['E9_1', 'E9_2', 'E9_3', 'E9_4', 'E9_5', 'E9_6', 'E9_7', 'E9_8', 'E9_9', 'E9_10', 'E9_11', 'E9_12', 'E9_13', 'E9_14', 'E9_15', 
           'E9_16', 'E9_17', 'E9_18', 'E9_19', 'E9_98', 'E9_Other']
for i in E9_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected['income_sources'] = df_youth_selected[E9_list].sum(axis=1)

# Level of Trust in financial services
F25_list = ['F25_1', 'F25_2', 'F25_3', 'F25_4']
F25_level = ['Completely Distrust', 'Somewhat Distrust', 'Somewhat Trust', 'Completely Trust']
for i in F25_list:
    df_youth_selected[i] = pd.Categorical(df_youth_selected[i], ordered=True, categories=F25_level)
    df_youth_selected[i] = df_youth_selected[i].cat.codes

df_youth_selected["trust_level"] = df_youth_selected[F25_list].sum(axis=1)

## Awareness of financial institution and services
# Mobile devices
TE1_list = ['TE1_1', 'TE1_2', 'TE1_3', 'TE1_4', 'TE1_5']
for i in TE1_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected['device'] = df_youth_selected[TE1_list].sum(axis=1)

# Mobile money
df_youth_selected['MM1a'] = df_youth_selected['MM1a'].apply(yes_no_ranking)

# Payment method
PY1a_list = ['PY1a_1', 'PY1a_2', 'PY1a_3', 'PY1a_4', 'PY1a_5', 'PY1a_6', 'PY1a_7', 'PY1a_8', 'PY1a_9', 'PY1a_10', 'PY1a_11']
for i in PY1a_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected["payment"] = df_youth_selected[PY1a_list].sum(axis=1)

# Money Transfer
MT2a_list = ['MT2a_1', 'MT2a_2', 'MT2a_3', 'MT2a_4', 'MT2a_5', 'MT2a_6', 'MT2a_7', 'MT2a_8', 'MT2a_9', 'MT2a_10', 'MT2a_98']
for i in MT2a_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected["transfer"] = df_youth_selected[MT2a_list].sum(axis = 1)

# Awerness parameter
df_youth_selected["awareness"] = df_youth_selected['device'] + df_youth_selected['MM1a'] + df_youth_selected["payment"] + df_youth_selected["transfer"]

## Owning an account
QF4_list = ['QF4_1', 'QF4_2', 'QF4_3', 'QF4_4', 'QF4_5', 'QF4_6', 'QF4_7', 'QF4_8', 'QF4_9', 'QF4_10', 'QF4_11', 'QF4_12', 'QF4_13', 'QF4_14', 'QF4_15']
for i in QF4_list:
    df_youth_selected[i] = df_youth_selected[i].apply(yes_no_ranking)
df_youth_selected["own_account"] = df_youth_selected[QF4_list].sum(axis=1)

# Function for Banking experience
def rank_ba1(x):
    if x == 'Used to have it in the past':
        return 2
    elif x == 'Currently have/use':
        return 1
    else: 
        return 0

# Banking experience
BA1_list = ['BA1_1', 'BA1_2', 'BA1_3', 'BA1_4', 'BA1_5', 'BA1_6', 'BA1_7', 'BA1_8', 'BA1_9', 'BA1_10', 'BA1_11', 'BA1_12', 'BA1_13', 'BA1_14', 'BA1_15']
for i in BA1_list:
    df_youth_selected[i] = df_youth_selected[i].apply(rank_ba1)
df_youth_selected["bank_exp"] = df_youth_selected[BA1_list].sum(axis = 1)

## Financial inclusion score
df_youth_selected["FI_score"] = df_youth_selected["own_account"] + df_youth_selected["bank_exp"]

## Income
#  Function for income
def income_rating(x):
    if x == 'Below N15,000 per month':
        return 1
    elif x == 'N15,001 - N35,000 per month':
        return 2
    elif x == 'N35001 - N55,000 per month':
        return 3
    elif x == 'N55,001 - N75,000 per month':
        return 4
    elif x == 'N75,001 - N95,000 per month':
        return 5
    elif x == 'N95,001 - N115,000 per month':
        return 6
    elif x == 'N115,001 - N135,000 per month':
        return 7
    elif x == 'N135,001 - N155,000 per month':
        return 8
    elif x == 'N155,001 - N175,000 per month':
        return 9
    elif x == 'N175,001 - N195,000 per month':
        return 10
    elif x == 'N195,001 - N215,000 per month':
        return 11
    elif x == 'N215,001 - N235,000 per month':
        return 12
    elif x == 'N235,001 - N255,000 per month':
        return 13
    elif x == 'N255,001 - 295,000 per month':
        return 15
    elif x == 'N295,001 - 315,000 per month':
        return 15
    elif x == 'Above N315,000 per month':
        return 16
    else:
        np.nan

# Income
df_youth_selected["income"] = df_youth_selected["IE1b"].apply(income_rating)

##################################################
## Picking the neccesary columns for analysis
final_list = ["gender","education", "barriers_value", "b_documents", "income_sources", "trust_level", "awareness","income", 'own_account', "bank_exp", 'FI_score']
data_df = df_youth_selected[final_list].dropna().reset_index(drop=True)

# Saving to csv
data_df.to_csv("data/financial_inclusion.csv")


##################################################
## ANALYSIS
##################################################

## Plot for all variables
analysis_list =  ["gender","education", "barriers_value", "b_documents", "income_sources", "trust_level", "awareness","income", \
                  "own_account", "bank_exp", 'FI_score']

# correlation matrix
correlation_matrix = data_df[analysis_list].corr()

# Heatmap plot
plt.figure(figsize=(12,6))
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Correlation matrix for all the features")
plt.savefig("images/Correlation_matrix_for_all.jpg")



## Plot for the final variables
analysis_list =  ["gender","education", "barriers_value", "b_documents", "income_sources", "trust_level", "awareness","income", 'FI_score']

# correlation matrix
correlation_matrix = data_df[analysis_list].corr()

# Heatmap plot
plt.figure(figsize=(12,6))
sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
plt.title("Correlation matrix of the features")
plt.savefig("images/Correlation_matrix.jpg")



### Using Linear Regression

# Using Own Account as the target variable
X = data_df[final_list[:-3]]
y = data_df['own_account']

own_account_model = LinearRegression()
own_account_model.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": own_account_model.coef_})
ordered_importance1 = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Linear regression model, the key factors affecting the own_account are `{ordered_importance1.Features[0]}`, `{ordered_importance1.Features[1]}` and `{ordered_importance1.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "w") as f:
    f.write(f"1. From the Linear regression model, the key factors affecting the own_account are `{ordered_importance1.Features[0]}`, `{ordered_importance1.Features[1]}` and `{ordered_importance1.Features[2]}`\n")

# Using Bank expereince as the target variable
X = data_df[final_list[:-3]]
y = data_df['bank_exp']

bank_exp_model = LinearRegression()
bank_exp_model.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": bank_exp_model.coef_})
ordered_importance2 = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Linear regression model, the key factors affecting the bank_exp are `{ordered_importance2.Features[0]}`, `{ordered_importance2.Features[1]}` and `{ordered_importance2.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "a") as f:
    f.write(f"2. From the Linear regression model, the key factors affecting the bank_exp are `{ordered_importance2.Features[0]}`, `{ordered_importance2.Features[1]}` and `{ordered_importance2.Features[2]}`\n") 


# Using FI Score as the target variable
X = data_df[final_list[:-3]]
y = data_df['FI_score']

FI_score_model = LinearRegression()
FI_score_model.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": FI_score_model.coef_})
ordered_importance = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Linear regression model, the key factors affecting the FI score are `{ordered_importance.Features[0]}`, `{ordered_importance.Features[1]}` and `{ordered_importance.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "a") as f:
    f.write(f"3. From the Linear regression model, the key factors affecting the FI score are `{ordered_importance.Features[0]}`, `{ordered_importance.Features[1]}` and `{ordered_importance.Features[2]}`\n")


### Using Random Forest
# Using Own Account as the target variable
X = data_df[final_list[:-3]]
y = data_df['own_account']

own_account_model_ = RandomForestClassifier()
own_account_model_.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": own_account_model_.feature_importances_})
importance_RF1 = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF1.Features[0]}`, `{importance_RF1.Features[1]}` and `{importance_RF1.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "a") as f:
    f.write(f"4. From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF1.Features[0]}`, `{importance_RF1.Features[1]}` and `{importance_RF1.Features[2]}`\n")


# Using bank experience as the target variable
X = data_df[final_list[:-3]]
y = data_df['bank_exp']

bank_exp_model_ = RandomForestClassifier()
bank_exp_model_.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": bank_exp_model_.feature_importances_})
importance_RF2 = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF2.Features[0]}`, `{importance_RF2.Features[1]}` and `{importance_RF2.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "a") as f:
    f.write(f"5. From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF2.Features[0]}`, `{importance_RF2.Features[1]}` and `{importance_RF2.Features[2]}`\n")


# Using FI score as the target variable
X = data_df[final_list[:-3]]
y = data_df['FI_score']

FI_score_model_ = RandomForestClassifier()
FI_score_model_.fit(X,y)

# Importance features
importance = pd.DataFrame({"Features": X.columns,
                          "Coefficients": bank_exp_model_.feature_importances_})
importance_RF = importance.sort_values(by="Coefficients", ascending=False).reset_index(drop=True)
print(f"From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF.Features[0]}`, `{importance_RF.Features[1]}` and `{importance_RF.Features[2]}`")

# Appending to the text file
with open("reports/key_factors.txt", "a") as f:
    f.write(f"6. From the Random Forest classifier model, the key factors affecting the FI score are `{importance_RF.Features[0]}`, `{importance_RF.Features[1]}` and `{importance_RF.Features[2]}`\n")

# End of code

print("End of code execution ... ")
