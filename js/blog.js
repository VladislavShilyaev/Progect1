// Масив постів блогу
const posts = [
    {
        title: 'Як я вивчив CSS за 30 днів',
        date: '15 квітня 2025',
        author: 'Іван Петренко',
        text: 'Мій досвід вивчення CSS з нуля...',
        fullText:
            'Повний текст статті з детальним описом' +
            ' кожного дня навчання, ресурсів та порад' +
            ' для початківців. Починав з основ селекторів,' +
            ' потім перейшов до Flexbox та Grid...'
    },
    {
        title: 'Чому Bootstrap 5 — must-have',
        date: '20 березня 2025',
        author: 'Іван Петренко',
        text: 'Огляд переваг Bootstrap 5...',
        fullText:
            'Bootstrap 5 став революційним оновленням:' +
            ' відмова від jQuery, нові утиліти, покращена' +
            ' сіткова система та нативні компоненти...'
    },
    {
        title: 'Мій перший проект на JavaScript',
        date: '5 лютого 2025',
        author: 'Іван Петренко',
        text: 'Покроковий гайд зі створення першого JS-проекту...',
        fullText:
            'Розповідаю про свій досвід створення' +
            ' інтерактивного портфоліо з нуля. Від валідації' +
            ' форм до динамічної генерації контенту...'
    }
];

// Функція створення картки поста
function createPostCard(post, index) {
    let card = document.createElement('div');
    card.className = 'card mb-3 post-card';

    let body = document.createElement('div');
    body.className = 'card-body';

    // Заголовок
    let title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = post.title;

    // Мета-інформація
    let meta = document.createElement('p');
    meta.className = 'card-text text-muted';
    meta.innerHTML = ' ' + post.date + ' &nbsp; ' + post.author;

    // Короткий текст
    let text = document.createElement('p');
    text.className = 'card-text';
    text.textContent = post.text;

    // Повний текст (прихований)
    let fullText = document.createElement('div');
    fullText.id = 'fullText-' + index;
    fullText.style.display = 'none';
    fullText.className = 'mt-2 p-3 bg-light rounded';
    fullText.textContent = post.fullText;

    // Кнопка "Читати далі"
    let readMore = document.createElement('a');
    readMore.className = 'btn btn-outline-primary btn-sm';
    readMore.innerHTML = 'Читати далі &rarr;';
    readMore.style.cursor = 'pointer';
    readMore.addEventListener('click', function () {
        toggleFullText(index, this);
    });

    // Зібрати картку
    body.appendChild(title);
    body.appendChild(meta);
    body.appendChild(text);
    body.appendChild(fullText);
    body.appendChild(readMore);
    card.appendChild(body);

    return card;
}

// Розгортання / згортання повного тексту
function toggleFullText(index, button) {
    let fullText = document.getElementById('fullText-' + index);
    if (fullText.style.display === 'none') {
        fullText.style.display = 'block';
        button.innerHTML = 'Згорнути &#9650;';
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-primary');
    } else {
        fullText.style.display = 'none';
        button.innerHTML = 'Читати далі &rarr;';
        button.classList.remove('btn-primary');
        button.classList.add('btn-outline-primary');
    }
}

// Генерація всіх постів при завантаженні
let blogContainer = document.getElementById('blogPosts');
if (blogContainer) {
    for (let i = 0; i < posts.length; i++) {
        let postCard = createPostCard(posts[i], i);
        blogContainer.appendChild(postCard);
    }
}

// Пошук по блогу (фільтрація в реальному часі)
let blogSearch = document.getElementById('blogSearch');
if (blogSearch) {
    blogSearch.addEventListener('input', function () {
        let query = this.value.toLowerCase();
        let postCards = document.querySelectorAll('.post-card');

        for (let i = 0; i < postCards.length; i++) {
            let titleEl = postCards[i].querySelector('.card-title');
            let title = titleEl ? titleEl.textContent : '';

            let textEls = postCards[i].querySelectorAll('.card-text');
            let text = '';
            for (let j = 0; j < textEls.length; j++) {
                text += textEls[j].textContent + ' ';
            }
            text = text.trim();

            if (title.toLowerCase().includes(query) || text.toLowerCase().includes(query)) {
                postCards[i].style.display = 'block';
            } else {
                postCards[i].style.display = 'none';
            }
        }
    });
}

