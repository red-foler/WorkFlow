// 1. Функция раскрытия категорий (оставляем как была)
function toggleCategory(element) {
    const parent = element.closest('.skill-group');
    parent.classList.toggle('active');
}

// Константы для элементов, которые нужны везде
const errorLabel = document.getElementById('skill-error');
const clearBtn = document.getElementById('clear-all');

// 2. Функция проверки (ошибка и появление кнопки "Сбросить")
function validateSkills() {
    const checkedCount = document.querySelectorAll('.skill-group input[type="checkbox"]:checked').length;

    if (checkedCount > 0) {
        errorLabel.style.opacity = '0'; // Скрываем текст ошибки
        errorLabel.style.fontSize = '10px';
        errorLabel.style.lineHeight = '3px';
        clearBtn.style.opacity = '1';  // Показываем кнопку сброса
        clearBtn.style.fontSize = '18px';
        clearBtn.style.height = '30px';
        clearBtn.style.margin = '0 0 8px 0';
        clearBtn.style.pointerEvents = 'auto'; // Делаем кнопку кликабельной
    } else {
        errorLabel.style.opacity = '1';
        errorLabel.style.fontSize = '13px';
        errorLabel.style.lineHeight = '20px';
        clearBtn.style.opacity = '0';
        clearBtn.style.height = '0px';
        clearBtn.style.pointerEvents = 'none';
    }
}

// 3. Основная логика после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.skill-group input[type="checkbox"]');
    const cards = document.querySelectorAll('.job-card');

    // Главная функция фильтрации
    function filterJobs() {
        // Собираем массив выбранных навыков
        const activeSkills = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.parentElement.textContent.trim());

        console.log("Выбрано в меню:", activeSkills);

        cards.forEach(card => {
            const cardData = card.getAttribute('data-category');
            if (!cardData) return;

            // Делим по запятой и убираем пробелы (trim)
            const cardCategories = cardData.split(',').map(item => item.trim());

            // Если ничего не выбрано — показываем всё. Иначе ищем совпадение.
            const isVisible = activeSkills.length === 0 || 
                              activeSkills.some(skill => cardCategories.includes(skill));

            card.style.display = isVisible ? 'block' : 'none';
        });
    }

    // Слушаем изменения на чекбоксах: и валидацию, и фильтр
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            validateSkills();
            filterJobs();
        });
    });

    // Логика кнопки "Сбросить всё"
    clearBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false); // Снимаем все галочки
        validateSkills(); // Прячем саму кнопку и возвращаем текст ошибки
        filterJobs();    // Показываем все карточки обратно
    });
});