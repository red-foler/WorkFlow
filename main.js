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
        errorLabel.style.color = '#00000000'; // Прячем ошибку
        errorLabel.style.fontSize = '10px';
        errorLabel.style.lineHeight = '5px';
        clearBtn.style.opacity = '1';
        clearBtn.style.fontSize = '18px';
        clearBtn.style.height = '30px';
        clearBtn.style.margin = '8px 0';
        
    } else {
        errorLabel.style.color = 'red'; // Показываем ошибку
        errorLabel.style.fontSize = '13px';
        errorLabel.style.lineHeight ='20px';
        clearBtn.style.opacity = '0';
        clearBtn.style.height = '0px';
        clearBtn.style.fontSize = '10px';
        clearBtn.style.margin = '0';
    }
}

// 3. Вешаем "слушатель" на каждый чекбокс
allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', validateSkills);
});





const clearBtn = document.getElementById('clear-all');
clearBtn.addEventListener('click', () => {
    // Находим ВСЕ чекбоксы
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false; // Снимаем галочку
        errorLabel.style.color = 'red'; // Показываем ошибку
        errorLabel.style.fontSize = '13px';
        errorLabel.style.lineHeight ='20px';
        clearBtn.style.opacity = '0';
        clearBtn.style.height = '1px';
        clearBtn.style.fontSize = '10px';
        clearBtn.style.margin = '0';
    });
    // После сброса нужно обновить локальное хранилище
    
});

