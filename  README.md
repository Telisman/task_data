# Task Data

Web App for Data Analysis

## Description

This project is a simple web application that allows users to analyze and display data from two files. The app is built using Django framework and provides a single HTML page where users can view questions and their corresponding answers. The calculations required to answer the questions are performed on the server using Python.
Also you have endpoint
## Prerequisites

Before running the web app, make sure you have the following installed:

- Python 3.8 and above
- Django framework

## Installation

1. Clone the GitHub repository:
   
    https://github.com/Telisman/task_data.git


2. Navigate to the project directory:

    cd task_data


3. Install the required dependencies:

    pip install -r requirements.txt or just start venv\Scripts\activate in your terminal.



## Usage

1. Start the Django server:
   

    python manage.py runserver


2. Open your web browser and go to `http://localhost:8000` to access the web app.

## Data Files

The following data files should be placed in the project directory:

- `9606_abund.txt`: Contains mean copy numbers for each human gene product/protein.
- `9606_gn_dom.txt`: Contains information about domains present in each human gene product/protein.

## Questions to Answer

### A. File "9606_abund.txt"

A1. How many unique gene/copy-number values are in the file? (Single numerical value)

A2. Compute the mean and standard deviation of copy number for all unique human gene products/proteins (Table)

A3. Calculate the percentile rank (in terms of copy number ranks) for each gene product/protein.
(i.e. for Gene X, where is it in the ranks from top (0%) to bottom (100%) in terms of abundance) (Table)

### B. Additional file "9606_gn_domains.txt"

B1. What is the domain with the highest average abundance (i.e. across all copies of the domain in all gene products/proteins)? (Single numerical value)

B2. Compute the mean and standard deviation of domain average abundance for each protein (they have the same labels as genes). Combine these two files and compute the percentile rank values as above. (Two tables)


### HTML page
In your browser type: http://127.0.0.1:8000/

In front of you, you will see questions and their answers. The answer will appear after clicking on the button of that question.


## Contact


For any questions or inquiries regarding this project, please contact davortelisman@gmail.com.

