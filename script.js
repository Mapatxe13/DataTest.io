document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const csvPreviewDiv = document.getElementById('csvPreview');
    const separatorInput = document.getElementById('separator');
    const decimalSeparatorInput = document.getElementById('decimalSeparator');
    const thousandsSeparatorInput = document.getElementById('thousandsSeparator');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                const separator = separatorInput.value || ',';
                const decimalSeparator = decimalSeparatorInput.value || '.';
                const thousandsSeparator = thousandsSeparatorInput.value || ',';
                displayCSV(contents, separator, decimalSeparator, thousandsSeparator);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, selecciona un archivo CSV.');
        }
    }

    function displayCSV(contents, separator, decimalSeparator, thousandsSeparator) {
        // Replace thousands separator and parse numbers correctly
        let rows = contents.split('\n');
        if (rows.length === 0) return;

        // Replace thousands separators and convert to numbers if needed
        rows = rows.map(row => {
            return row.split(separator).map(cell => {
                if (decimalSeparator === ',' && cell.includes('.')) {
                    cell = cell.replace('.', '');
                }
                if (decimalSeparator === ',' && cell.includes(',')) {
                    cell = cell.replace(',', '.');
                }
                return cell;
            }).join(separator);
        });

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        // Create table headers and dropdowns
        const headers = rows[0].split(separator);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        // Add an extra header for the variable type dropdowns
        const typeHeader = document.createElement('th');
        typeHeader.textContent = 'Tipo de Variable';
        headerRow.appendChild(typeHeader);
        table.appendChild(headerRow);

        // Create table rows and type dropdowns
        rows.slice(1).forEach(row => {
            if (row.trim()) {
                const tr = document.createElement('tr');
                const cells = row.split(separator);
                cells.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });

                // Add dropdown for type selection
                const typeTd = document.createElement('td');
                const select = document.createElement('select');
                select.innerHTML = `
                    <option value="numerica">Numérica</option>
                    <option value="categorica">Categórica</option>
                `;
                typeTd.appendChild(select);
                tr.appendChild(typeTd);

                table.appendChild(tr);
            }
        });

        // Clear previous content and add new table
        csvPreviewDiv.innerHTML = '';
        csvPreviewDiv.appendChild(table);
    }
});
