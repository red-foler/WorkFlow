function toggleCategory(element) {
    // Находим ближайшего родителя с классом skill-group
    const parent = element.closest('.skill-group');
    // Переключаем ему класс active
    parent.classList.toggle('active');
}
