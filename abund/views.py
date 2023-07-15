from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np

def home(request):
    return render(request, 'home.html')




# Create api endpoint to collect are data and display into html file using AJAX and JavaScript
def your_api_endpoint(request):
    # Task A
    df = pd.read_csv('9606_abund.txt', delimiter='\t')
    df['Mean-copy-number'] = df['Mean-copy-number'].str.extract('(\d+\.?\d*)').astype(float)
    # Task A1
    mean_copy_number = df.groupby('Gn')['Mean-copy-number'].mean()
    std_copy_number = df.groupby('Gn')['Mean-copy-number'].std()

    # Task A2
    copy_number_stats = []
    for gn, mean in mean_copy_number.items():
        std = std_copy_number.get(gn)
        if np.isnan(std):
            continue
        copy_number_stats.append({
            'gn': gn,
            'mean': mean,
            'std': std
        })
    # Task A3
    df['Percentile_Rank'] = df['Mean-copy-number'].rank(pct=True, method='min') * 100
    df['Percentile_Rank'] = df['Percentile_Rank'].apply(lambda x: '{:.4f}%'.format(x))
    df.sort_values(by='Percentile_Rank', inplace=True)
    gene_product_data = df[['Gn', 'Percentile_Rank']].drop_duplicates().to_dict('records')

    # Task B
    # Marge two tables with into one with Gn
    df = pd.read_csv('9606_abund.txt', delimiter='\t')
    df_domains = pd.read_csv('9606_gn_dom.txt', delimiter='\t')
    merged_df = pd.merge(df, df_domains, left_on='Gn', right_on='#Gn', how='left')
    # Create a new column 'Gn' by merging 'Gn' and '#Gn' columns
    merged_df['Gn'] = merged_df['Gn'].fillna(merged_df['#Gn'])
    # Drop the 'Gn' and '#Gn' columns
    merged_df = merged_df.drop(columns=['#Gn'])
    # Convert 'Mean-copy-number' column to numeric data type
    merged_df['Mean-copy-number'] = pd.to_numeric(merged_df['Mean-copy-number'], errors='coerce')
    merged_df = merged_df.dropna(subset=['Mean-copy-number'])

    # print(merged_df)

    # Task b1
    # Calculate the average abundance for each domain
    average_abundance_by_domain = merged_df.groupby('Domain')['Mean-copy-number'].mean()
    protein_stats = merged_df.groupby(['Ensembl_protein', 'Domain'])['Mean-copy-number'].agg(
        ['mean', 'std']).reset_index()
    # Find the domain with the highest average abundance
    domain_with_highest_average_abundance = average_abundance_by_domain.idxmax()
    highest_average_abundance = average_abundance_by_domain.max()


    # Task B2
    average_domain_representation = merged_df.groupby('Gn')['Mean-copy-number'].mean()
    table1_mean = np.mean(average_domain_representation)
    table1_std = np.std(average_domain_representation)

    # print(copy_number_stats)
    response_data = {
        'unique_gene_copy_number_count': df[['Gn', 'Mean-copy-number']].drop_duplicates().shape[0],
        'copy_number_stats': copy_number_stats,
        'gene_product_data': gene_product_data,
        'domain_with_highest_average_abundance': domain_with_highest_average_abundance,
        'highest_average_abundance': highest_average_abundance,

    }

    return JsonResponse(response_data)