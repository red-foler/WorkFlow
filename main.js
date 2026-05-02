function toggleCategory(element) {
    // Останавливаем передачу клика выше по дереву DOM
    if (window.event) window.event.stopPropagation(); 
    
    const parent = element.closest('.skill-group');
    if (parent) {
        parent.classList.toggle('active');
    }
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
        clearBtn.style.margin = '15px 0 15px 0';
        clearBtn.style.pointerEvents = 'auto'; // Делаем кнопку кликабельной
    } else {
        errorLabel.style.opacity = '1';
        errorLabel.style.fontSize = '13px';
        errorLabel.style.lineHeight = '15px';
        clearBtn.style.opacity = '0';
        clearBtn.style.height = '0px';
        clearBtn.style.margin = '0';
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
    .filter(cb => cb.checked && cb.classList.contains('child-checkbox')) // Ищем только реальные навыки
    .map(cb => cb.parentElement.textContent.trim());

        cards.forEach(card => {
            const cardData = card.getAttribute('data-category');
            if (!cardData) return;

            const cardCategories = cardData.split(',').map(item => item.trim());
            const isVisible = activeSkills.length === 0 || 
                              activeSkills.some(skill => cardCategories.includes(skill));

            if (isVisible) {
    if (card.style.display !== 'block') {
        card.style.display = 'block';
        
        card.classList.remove('show-animation');
        void card.offsetWidth; 
        card.classList.add('show-animation');

        // ДОБАВЬ ЭТОТ КУСОК:
        card.addEventListener('animationend', () => {
            card.classList.remove('show-animation');
        }, { once: true }); 
    }
} else {
                // Если карточка скрывается
                card.style.display = 'none';
                card.classList.remove('show-animation');
            }
        });
    }

    // Логика кнопки "Сбросить всё"
    clearBtn.addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false); // Снимаем все галочки
        validateSkills(); // Прячем саму кнопку и возвращаем текст ошибки
        filterJobs();    // Показываем все карточки обратно
    });

    document.addEventListener('change', (e) => {
    const target = e.target;
    if (target.type !== 'checkbox') return;

    // 1. ЛОГИКА ВНИЗ (от родителя к детям)
    if (target.classList.contains('section-parent-checkbox') || target.classList.contains('parent-checkbox')) {
        const container = target.closest('.skill-group, .filter-section');
        const children = container.querySelectorAll('input[type="checkbox"]');
        children.forEach(child => child.checked = target.checked);
    }

    // 2. ЛОГИКА ВВЕРХ (рекурсивное обновление всех родителей)
    // 2. ЛОГИКА ВВЕРХ (рекурсивное обновление всех родителей)
    // 2. ЛОГИКА ВВЕРХ (ребенок -> родитель -> дедушка)
    let current = target;
    while (current) {
        // Находим контейнер (подменю), в котором лежит наш текущий чекбокс
        const currentSubmenu = current.closest('.submenu');
        if (!currentSubmenu) break;

        // Находим родительский блок, которому принадлежит это подменю
        const parentGroup = currentSubmenu.closest('.skill-group, .filter-section');
        if (!parentGroup) break;

        // Находим именно тот чекбокс, который стоит в заголовке этого родителя
        const parentCb = parentGroup.querySelector('.parent-checkbox, .section-parent-checkbox');

        if (parentCb && parentCb !== current) {
            // Проверяем все чекбоксы внутри этого подменю
            const allChildCheckboxes = currentSubmenu.querySelectorAll('input[type="checkbox"]');
            
            // Если все дети внутри выбраны — ставим галочку родителю
            const allChecked = Array.from(allChildCheckboxes).every(cb => cb.checked);
            parentCb.checked = allChecked;

            // Переходим к родителю, чтобы проверить уровень выше (дедушку)
            current = parentCb;
        } else {
            break;
        }
    }

    // 3. ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
    validateSkills();
    filterJobs();
});
});