 $(document).ready(function() {
        var rowsPerPage = 100;
        var copyNumberStatsTotalRows = 0;
        var geneProductDataTotalRows = 0;
        var copyNumberStatsCurrentPage = 1;
        var geneProductDataCurrentPage = 1;
        var copyNumberStatsData; // Store the response data for copy number stats
        var geneProductData; // Store the response data for gene product data

        function fetchCopyNumberStats() {
            if ($('#copyNumberStatsContainer').is(':visible')) {
                $('#copyNumberStatsContainer').hide();
            } else {
                $.ajax({
                    url: "/endpoint/",
                    dataType: "json",
                    success: function(response) {
                        copyNumberStatsData = response.copy_number_stats;
                        copyNumberStatsTotalRows = copyNumberStatsData.length;
                        copyNumberStatsCurrentPage = 1;
                        updateCopyNumberStatsTable(copyNumberStatsData);
                        $('#copyNumberStatsContainer').show();
                    }
                });
            }
        }

        function fetchGeneProductData() {
            if ($('#geneProductDataContainer').is(':visible')) {
                $('#geneProductDataContainer').hide();
            } else {
                $.ajax({
                    url: "/endpoint/",
                    dataType: "json",
                    success: function(response) {
                        geneProductData = response.gene_product_data;
                        geneProductDataTotalRows = geneProductData.length;
                        geneProductDataCurrentPage = 1;
                        updateGeneProductDataTable(geneProductData);
                        $('#geneProductDataContainer').show();
                    }
                });
            }
        }

        function updateCopyNumberStatsTable(data) {
            var startIndex = (copyNumberStatsCurrentPage - 1) * rowsPerPage;
            var endIndex = startIndex + rowsPerPage;
            var paginatedData = data.slice(startIndex, endIndex);

            var statsTable = $('#copy_number_stats_table tbody');
            statsTable.empty();
            $.each(paginatedData, function(index, stat) {
                var row = $('<tr>');
                $('<td>').text(stat.gn).appendTo(row);
                $('<td>').text(stat.mean).appendTo(row);
                $('<td>').text(stat.std).appendTo(row);
                statsTable.append(row);
            });

            updateCopyNumberStatsPagination();
        }

        function updateGeneProductDataTable(data) {
            var startIndex = (geneProductDataCurrentPage - 1) * rowsPerPage;
            var endIndex = startIndex + rowsPerPage;
            var paginatedData = data.slice(startIndex, endIndex);

            var geneProductTable = $('#gene_product_data_table tbody');
            geneProductTable.empty();
            $.each(paginatedData, function(index, row) {
                var newRow = $('<tr>');
                $('<td>').text(row.Gn).appendTo(newRow);
                $('<td>').text(row.Percentile_Rank).appendTo(newRow);
                geneProductTable.append(newRow);
            });

            updateGeneProductDataPagination();
        }

        function updateCopyNumberStatsPagination() {
            var totalPages = Math.ceil(copyNumberStatsTotalRows / rowsPerPage);

            if (copyNumberStatsCurrentPage === 1) {
                $('#copy_number_stats_prev_button').prop('disabled', true);
            } else {
                $('#copy_number_stats_prev_button').prop('disabled', false);
            }

            if (copyNumberStatsCurrentPage === totalPages) {
                $('#copy_number_stats_next_button').prop('disabled', true);
            } else {
                $('#copy_number_stats_next_button').prop('disabled', false);
            }
        }

        function updateGeneProductDataPagination() {
            var totalPages = Math.ceil(geneProductDataTotalRows / rowsPerPage);

            if (geneProductDataCurrentPage === 1) {
                $('#gene_product_data_prev_button').prop('disabled', true);
            } else {
                $('#gene_product_data_prev_button').prop('disabled', false);
            }

            if (geneProductDataCurrentPage === totalPages) {
                $('#gene_product_data_next_button').prop('disabled', true);
            } else {
                $('#gene_product_data_next_button').prop('disabled', false);
            }
        }

        $('#copyNumberStatsButton').click(function() {
            fetchCopyNumberStats();
        });

        $('#geneProductDataButton').click(function() {
            fetchGeneProductData();
        });

        $('#copy_number_stats_prev_button').click(function() {
            if (copyNumberStatsCurrentPage > 1) {
                copyNumberStatsCurrentPage--;
                updateCopyNumberStatsTable(copyNumberStatsData);
            }
        });

        $('#copy_number_stats_next_button').click(function() {
            var totalPages = Math.ceil(copyNumberStatsTotalRows / rowsPerPage);
            if (copyNumberStatsCurrentPage < totalPages) {
                copyNumberStatsCurrentPage++;
                updateCopyNumberStatsTable(copyNumberStatsData);
            }
        });

        $('#gene_product_data_prev_button').click(function() {
            if (geneProductDataCurrentPage > 1) {
                geneProductDataCurrentPage--;
                updateGeneProductDataTable(geneProductData);
            }
        });

        $('#gene_product_data_next_button').click(function() {
            var totalPages = Math.ceil(geneProductDataTotalRows / rowsPerPage);
            if (geneProductDataCurrentPage < totalPages) {
                geneProductDataCurrentPage++;
                updateGeneProductDataTable(geneProductData);
            }
        });

        // Add search functionality for Copy Number Statistics table
        $('#copy_number_stats_search').on('input', function(e) {
            if (e.which === 13) {
                var searchValue = $(this).val().toLowerCase();
                var filteredData = copyNumberStatsData.filter(function(stat) {
                    return stat.gn.toLowerCase().includes(searchValue);
                });
                copyNumberStatsTotalRows = filteredData.length;
                copyNumberStatsCurrentPage = 1;
                updateCopyNumberStatsTable(filteredData);
            }
        });

        // Add search functionality for Gene Product Data table
        $('#gene_product_data_search').on('input', function(e) {
            if (e.which === 13) {
                var searchValue = $(this).val().toLowerCase();
                var filteredData = geneProductData.filter(function(row) {
                    return row.Gn.toLowerCase().includes(searchValue);
                });
                geneProductDataTotalRows = filteredData.length;
                geneProductDataCurrentPage = 1;
                updateGeneProductDataTable(filteredData);
            }
        });
    });

  $(document).ready(function() {
            // Function to fetch and display the unique gene/copy-number values
            function fetchUniqueValues() {
                if ($('#uniqueValuesContainer').is(':visible')) {
                    $('#uniqueValuesContainer').hide();
                } else {
                    $.ajax({
                        url: "/endpoint/",
                        dataType: "json",
                        success: function(response) {
                            // Hide all data containers
                            $('.data-container').hide();

                            // Update unique gene/copy-number values
                            $('#unique_gene_copy_number_count').text(response.unique_gene_copy_number_count);
                            $('#uniqueValuesContainer').show();
                        }
                    });
                }
            }

            function fetchHighestAbundanceDomain() {
                if ($('#highestAbundanceContainer').is(':visible')) {
                    $('#highestAbundanceContainer').hide();
                } else {
                    $.ajax({
                        url: "/endpoint/",
                        dataType: "json",
                        success: function(response) {
                            // Hide all data containers
                            $('.data-container').hide();

                            // Update highest abundance domain and value
                            $('#domainWithHighestAbundance').text(response.domain_with_highest_average_abundance);
                            $('#highestAverageAbundance').text(response.highest_average_abundance);
                            $('#highestAbundanceContainer').show();
                        }
                    });
                }
            }


            // Button click event to fetch and display the domain with highest average abundance
            $('#highestAbundanceButton').click(function() {
                fetchHighestAbundanceDomain();
            });

            // Button click event to fetch and display unique gene/copy-number values
            $('#uniqueValuesButton').click(function() {
                fetchUniqueValues();
            });


        });
     $(document).ready(function() {
            // Function to fetch and display the unique gene/copy-number values
            function fetchUniqueValues() {
                if ($('#uniqueValuesContainer').is(':visible')) {
                    $('#uniqueValuesContainer').hide();
                } else {
                    $.ajax({
                        url: "/endpoint/",
                        dataType: "json",
                        success: function(response) {
                            // Hide all data containers
                            $('.data-container').hide();

                            // Update unique gene/copy-number values
                            $('#unique_gene_copy_number_count').text(response.unique_gene_copy_number_count);
                            $('#uniqueValuesContainer').show();
                        }
                    });
                }
            }

            function fetchHighestAbundanceDomain() {
                if ($('#highestAbundanceContainer').is(':visible')) {
                    $('#highestAbundanceContainer').hide();
                } else {
                    $.ajax({
                        url: "/endpoint/",
                        dataType: "json",
                        success: function(response) {
                            // Hide all data containers
                            $('.data-container').hide();

                            // Update highest abundance domain and value
                            $('#domainWithHighestAbundance').text(response.domain_with_highest_average_abundance);
                            $('#highestAverageAbundance').text(response.highest_average_abundance);
                            $('#highestAbundanceContainer').show();
                        }
                    });
                }
            }


            // Button click event to fetch and display the domain with highest average abundance
            $('#highestAbundanceButton').click(function() {
                fetchHighestAbundanceDomain();
            });

            // Button click event to fetch and display unique gene/copy-number values
            $('#uniqueValuesButton').click(function() {
                fetchUniqueValues();
            });


        });