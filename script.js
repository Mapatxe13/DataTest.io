document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const csvPreviewDiv = document.getElementById('csvPreview');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                displayCSV(contents);
            };
            reader.readAsText(file);
        } else {
            alert('Por favor, selecciona un archivo CSV.');
        }
    }

    function displayCSV(contents) {
        const rows = contents.split('\n');
        if (rows.length === 0) return;

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        // Create table headers and dropdowns
        const headers = rows[0].split(',');
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
                const cells = row.split(',');
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
