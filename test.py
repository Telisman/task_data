# from django.shortcuts import render
# from django.http import JsonResponse
# import pandas as pd
# import numpy as np
# df = pd.read_csv('9606_abund.txt', delimiter='\t')
# df_domains = pd.read_csv('9606_gn_dom.txt', delimiter='\t')
# # --------------------------------------------------------------------------------------------------------------------
#
# # Task A
# # A1. Count the number of unique gene/copy-number values
# unique_gn_count = df['Gn'].nunique()
# unique_mean_copy_number_count = df['Mean-copy-number'].nunique()
# unique_gene_copy_number_count = df[['Gn', 'Mean-copy-number']].drop_duplicates().shape[0]
# # Clean the "Mean-copy-number" column
# df['Mean-copy-number'] = df['Mean-copy-number'].str.extract('(\d+\.?\d*)').astype(float)
# # --------------------------------------------------------------------------------------------------------------------
# # A2. Compute the mean and standard deviation of copy number for all unique human gene products/proteins (Table)
# mean_copy_number = df.groupby('Gn')['Mean-copy-number'].mean()
# std_copy_number = df.groupby('Gn')['Mean-copy-number'].std()
#
# # Create a list of dictionaries to store the mean and standard deviation values
# copy_number_stats = []
# for gn, mean in mean_copy_number.items():
#     std = std_copy_number.get(gn)
#     if np.isnan(std):  # Skip the entry if standard deviation is NaN
#         continue
#     copy_number_stats.append({
#         'gn': gn,
#         'mean': mean,
#         'std': std
#     })
# # --------------------------------------------------------------------------------------------------------------------
# # A3. Calculate the percentile rank (in terms of copy number ranks) for each gene product/protein.
# # (i.e. for Gene X, where is it in the ranks from top (0%) to bottom (100%) in terms of abundance) (Table)
#
# df['Percentile_Rank'] = df['Mean-copy-number'].rank(pct=True, method='min') * 100
# df['Percentile_Rank'] = df['Percentile_Rank'].apply(lambda x: '{:.4f}%'.format(x))
# df.sort_values(by='Percentile_Rank', inplace=True)
# gene_product_data = df[['Gn', 'Percentile_Rank']].drop_duplicates().to_dict('records')
#
#
#
# # --------------------------------------------------------------------------------------------------------------------
#
# # Task B
# #merging tables
# merged_df = pd.merge(df, df_domains, left_on='Gn', right_on='#Gn', how='left')
# # Create a new column 'Gn' by merging 'Gn' and '#Gn' columns
# merged_df['Gn'] = merged_df['Gn'].fillna(merged_df['#Gn'])
# # Drop the 'Gn' and '#Gn' columns
# merged_df = merged_df.drop(columns=['#Gn'])
# # Convert 'Mean-copy-number' column to numeric data type
# merged_df['Mean-copy-number'] = pd.to_numeric(merged_df['Mean-copy-number'], errors='coerce')
#
# # --------------------------------------------------------------------------------------------------------------------
#
# # Task B1
# # Calculate the average abundance for each domain
# average_abundance_by_domain = merged_df.groupby('Domain')['Mean-copy-number'].mean()
# # Find the domain with the highest average abundance
# domain_with_highest_average_abundance = average_abundance_by_domain.idxmax()
# highest_average_abundance = average_abundance_by_domain.max()
#
# # --------------------------------------------------------------------------------------------------------------------
#
#
#
# #Task B2
# protein_stats = merged_df.groupby(['Ensembl_protein', 'Domain'])['Mean-copy-number'].agg(
#     ['mean', 'std']).reset_index()
# # Create a DataFrame for mean values
# mean_table = protein_stats[['Ensembl_protein', 'Domain', 'mean']].rename(columns={'mean': 'Mean'})
# # Create a DataFrame for standard deviation values
# std_table = protein_stats[['Ensembl_protein', 'Domain', 'std']].rename(columns={'std': 'Standard Deviation'})
#
# print(std_table)
#
# context = {
#     'unique_gn_count': unique_gn_count,
#     'unique_mean_copy_number_count': unique_mean_copy_number_count,
#     'unique_gene_copy_number_count': unique_gene_copy_number_count,
#     'copy_number_stats': copy_number_stats,
#     'domain_with_highest_average_abundance': domain_with_highest_average_abundance,
#     'highest_average_abundance': highest_average_abundance,
#     'mean_table': mean_table,
#     'gene_product_data': gene_product_data,
#     'std_table': std_table
# }