document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('image-input');
    const originalImage = document.getElementById('original-image');
    const croppedImage = document.getElementById('cropped-image');
    const cropBtn = document.getElementById('crop-btn');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');
    const editorSection = document.querySelector('.editor-section');
    const resultSection = document.querySelector('.result-section');
    let cropper;
    // Загрузка изображения
    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length) {
            const file = e.target.files[0];
            // Проверка размера файла
            if (file.size > 307200) {
                alert("\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u043C \u0434\u043E 300 \u041A\u0411");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                originalImage.src = event.target.result;
                // Показать редактор
                editorSection.classList.remove('hidden');
                resultSection.classList.add('hidden');
                downloadBtn.disabled = true;
                if (cropper) cropper.destroy();
                cropper = new Cropper(originalImage, {
                    aspectRatio: NaN,
                    viewMode: 1,
                    autoCropArea: 0.8,
                    responsive: true,
                    guides: true
                });
            };
            reader.readAsDataURL(file);
        }
    });
    // Обрезка изображения
    cropBtn.addEventListener('click', function() {
        if (!cropper) return;
        // Обрезанное изображение в формате base64
        const canvas = cropper.getCroppedCanvas({
            minWidth: 64,
            minHeight: 64,
            maxWidth: 4096,
            maxHeight: 4096,
            fillColor: '#fff',
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high'
        });
        if (canvas) {
            croppedImage.src = canvas.toDataURL('image/jpeg');
            resultSection.classList.remove('hidden');
            downloadBtn.disabled = false;
        }
    });
    // Скачивание обрезанного изображения
    downloadBtn.addEventListener('click', function() {
        if (!croppedImage.src || croppedImage.src === '#') return;
        const link = document.createElement('a');
        link.download = 'cropped-image.jpg';
        link.href = croppedImage.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    // Сброс
    resetBtn.addEventListener('click', function() {
        if (cropper) {
            cropper.reset();
            resultSection.classList.add('hidden');
            downloadBtn.disabled = true;
        }
    });
});

//# sourceMappingURL=photo-cropper.44983732.js.map
