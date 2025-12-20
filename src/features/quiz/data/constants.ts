const mainContentWidth = document.querySelector('.main-content')?.getBoundingClientRect().width || window.innerWidth;
export const quizDragOffsetLimit = mainContentWidth / 7.5;
