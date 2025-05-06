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
            if (file.size > 300 * 1024) {
                alert('Пожалуйста, выберите изображение размером до 300 КБ');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                originalImage.src = event.target.result;
                
                // Показать редактор
                editorSection.classList.remove('hidden');
                resultSection.classList.add('hidden');
                downloadBtn.disabled = true;

                if (cropper) {
                    cropper.destroy();
                }
                
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
            imageSmoothingQuality: 'high',
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