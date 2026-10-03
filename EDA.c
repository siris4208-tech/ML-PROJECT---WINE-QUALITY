import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.inspection import permutation_importance
     

import pandas as pd

df = pd.read_excel("Red_Wine_Quality_Dataset.xlsx")

print("Dataset loaded successfully!")

print("\nFirst 5 rows:")
print(df.head())

print("\nDataset Shape:")
print(df.shape)

print("\nColumn Names:")
print(df.columns.tolist())

  df = pd.read_excel("Red_Wine_Quality_Dataset.xlsx", sheet_name="Red Wine")

  print("Dataset Information:")
  df.info()
  
print("Missing Values:")
print(df.isnull().sum())

print("Number of duplicate rows:")
print(df.duplicated().sum()) 
  
print("Statistical Summary:")
print(df.describe())

print("Data Types:")
print(df.dtypes)

print("Wine Quality Distribution:")
print(df["quality"].value_counts().sort_index())

import matplotlib.pyplot as plt

plt.figure(figsize=(8, 5))

df["quality"].value_counts().sort_index().plot(kind="bar")

plt.xlabel("Wine Quality")
plt.ylabel("Number of Wines")
plt.title("Distribution of Wine Quality")

plt.tight_layout()
plt.show()

correlation = df.corr(numeric_only=True)

print(correlation)

# ============================================
# CORRELATION HEATMAP - WINE QUALITY DATASET
# ============================================

import pandas as pd
import matplotlib.pyplot as plt

# 1. Load the dataset
df = pd.read_excel("Red_Wine_Quality_Dataset.xlsx")

print("Dataset loaded successfully!")
print("Dataset shape:", df.shape)

# 2. Calculate correlation
correlation = df.corr(numeric_only=True)

print("\nCorrelation values:")
print(correlation)

# 3. Create the heatmap
plt.figure(figsize=(12, 8))

plt.imshow(
    correlation,
    cmap="coolwarm",
    aspect="auto"
)

# 4. Add color bar
plt.colorbar(label="Correlation")

# 5. X-axis labels
plt.xticks(
    range(len(correlation.columns)),
    correlation.columns,
    rotation=90
)

# 6. Y-axis labels
plt.yticks(
    range(len(correlation.columns)),
    correlation.columns
)

# 7. Add numbers inside each box
for i in range(len(correlation.columns)):
    for j in range(len(correlation.columns)):
        plt.text(
            j,
            i,
            f"{correlation.iloc[i, j]:.2f}",
            ha="center",
            va="center",
            color="black",
            fontsize=8
        )

# 8. Title
plt.title("Correlation Heatmap of Red Wine Quality Dataset")

plt.tight_layout()
plt.show()

X = df.drop(columns=["quality"])
y = df["quality"]

print("Input Features:")
print(X.columns.tolist())

print("\nTarget:")
print("quality")


from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training Data:", X_train.shape)
print("Testing Data:", X_test.shape)

from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

print("Random Forest model created successfully!")

model.fit(X_train, y_train)

print("Random Forest model trained successfully!)

y_pred = model.predict(X_test)

print("Prediction completed!")
print("\nFirst 20 Predictions:")
print(y_pred[:20])

comparison = pd.DataFrame({
    "Actual Quality": y_test.values,
    "Predicted Quality": y_pred
})

print(comparison.head(20))

from sklearn.metrics import accuracy_score

accuracy = accuracy_score(y_test, y_pred)

print("Random Forest Accuracy:", accuracy)
print("Accuracy Percentage:", accuracy * 100, "%")

from sklearn.metrics import classification_report

print("Classification Report:")
print(classification_report(y_test, y_pred))

from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_test, y_pred)

print("Confusion Matrix:")
print(cm)

plt.figure(figsize=(7, 5))

plt.imshow(cm)

plt.xlabel("Predicted Quality")
plt.ylabel("Actual Quality")
plt.title("Confusion Matrix")

plt.colorbar()
plt.tight_layout()
plt.show()

importance = model.feature_importances_

feature_importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": importance
})

feature_importance = feature_importance.sort_values(
    by="Importance",
    ascending=False
)

print("Random Forest Feature Importance:")
print(feature_importance)

import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

plt.barh(
    feature_importance["Feature"],
    feature_importance["Importance"]
)

plt.xlabel("Importance")
plt.ylabel("Chemical Feature")
plt.title("Feature Importance Using Random Forest")

plt.gca().invert_yaxis()

plt.tight_layout()
plt.show()


from sklearn.inspection import permutation_importance

result = permutation_importance(
    model,
    X_test,
    y_test,
    n_repeats=10,
    random_state=42
)

permutation_df = pd.DataFrame({
    "Feature": X.columns,
    "Importance": result.importances_mean
})

permutation_df = permutation_df.sort_values(
    by="Importance",
    ascending=False
)

print(permutation_df)

plt.figure(figsize=(10,6))

plt.barh(
    permutation_df["Feature"],
    permutation_df["Importance"]
)

plt.xlabel("Permutation Importance")
plt.ylabel("Chemical Feature")
plt.title("Permutation Feature Importance")

plt.gca().invert_yaxis()

plt.show()

feature_importance.to_excel(
    "Random_Forest_Feature_Importance.xlsx",
    index=False
)

permutation_df.to_excel(
    "Permutation_Feature_Importance.xlsx",
    index=False
)

print("Files saved successfully!")

  print("\n======================================")
print("FINAL FINDINGS")
print("======================================")

print(
    "Top feature:",
    feature_importance.iloc[0]["Feature"]
)

print(
    "Second important feature:",
    feature_importance.iloc[1]["Feature"]
)

print(
    "Third important feature:",
    feature_importance.iloc[2]["Feature"]
)

print(
    "\nRandom Forest Accuracy:",
    accuracy * 100,
    "%"
)

print("\nAlgorithm implementation completed successfully!")
