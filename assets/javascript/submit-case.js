document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    
    // Store all files in this array
    let allFiles = [];

    // Trigger file input when drop zone is clicked
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });

    // Add drag-over class when file is dragged over
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    // Remove drag-over class
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Handle files selected from file input
    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (const file of files) {
            // Check for duplicates
            if (!allFiles.some(f => f.name === file.name && f.size === file.size)) {
                allFiles.push(file);
                displayFile(file);
            }
        }
        // Update the 'files' property of the file input
        // This is tricky, so we'll rely on the form submission
        // A more advanced way uses FormData, which the <form> tag does automatically
    }

    function displayFile(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.textContent = file.name;
        
        const removeBtn = document.createElement('span');
        removeBtn.className = 'file-item-remove';
        removeBtn.textContent = '✖';
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop click from triggering file input
            
            // Remove file from array
            allFiles = allFiles.filter(f => f !== file);
            
            // Remove file item from DOM
            fileItem.remove();
        });
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    }
});