document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const csvDataDiv = document.getElementById('csvData');

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
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        // Create table headers
        const headers = rows[0].split(',');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Create table rows
        rows.slice(1).forEach(row => {
            if (row.trim()) {
                const tr = document.createElement('tr');
                const cells = row.split(',');
                cells.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            }
        });

        // Clear previous content and add new table
        csvDataDiv.innerHTML = '';
        csvDataDiv.appendChild(table);
    }
});
