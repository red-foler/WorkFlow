function toggleCategory(element) {
    // Находим ближайшего родителя с классом skill-group
    const parent = element.closest('.skill-group');
    // Переключаем ему класс active
    parent.classList.toggle('active');
}


// 1. Находим нужные элементы
const errorLabel = document.getElementById('skill-error');
const allCheckboxes = document.querySelectorAll('.skill-group input[type="checkbox"]');

// 2. Функция проверки
function validateSkills() {
    // Считаем, сколько галочек сейчас нажато
    const checkedCount = document.querySelectorAll('.skill-group input[type="checkbox"]:checked').length;

    if (checkedCount > 0) {
        errorLabel.style.display = 'none'; // Прячем ошибку
    } else {
        errorLabel.style.display = 'block'; // Показываем ошибку
    }
}

// 3. Вешаем "слушатель" на каждый чекбокс
allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', validateSkills);
});

