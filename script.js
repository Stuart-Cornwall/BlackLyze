document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://euphonious-stardust-0e2d2a.netlify.app/', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        document.getElementById('advice').textContent = result.advice;
        document.getElementById('results').classList.remove('hidden');
    } else {
        alert('Error analyzing the image. Please try again.');
    }
});
