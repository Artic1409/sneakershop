// Конфигурация (замените на свои значения)
const SUPABASE_CONFIG = {
  url: 'https://tqeeemvewrvlnsdhlkal.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWVlbXZld3J2bG5zZGhsa2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE5ODAsImV4cCI6MjA1OTgwNzk4MH0.iu8q0lq7m0wr9ii9lNT3ODu2lOuMOdbsU4A2xPfdWUI'
};

// Инициализация Supabase
const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url, 
  SUPABASE_CONFIG.key
);

// DOM элементы
const elements = {
  loading: document.getElementById('loading'),
  container: document.getElementById('sneakersList')
};

// Загрузка данных
async function loadSneakers() {
  try {
    const { data, error } = await supabase
      .from('sneakers')
      .select('*')
      .order('price', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    showError('Ошибка загрузки товаров');
    return [];
  }
}

// Отображение товаров
function renderSneakers(sneakers) {
  if (!sneakers.length) {
    showError('Товары не найдены');
    return;
  }

  elements.container.innerHTML = sneakers.map(sneaker => `
    <div class="sneaker-card">
      <img src="${sneaker.image_url || 'https://via.placeholder.com/300'}" 
           alt="${sneaker.name}"
           loading="lazy">
      <h3>${sneaker.name}</h3>
      <p>${sneaker.price} ₽</p>
      <button class="add-to-cart" data-id="${sneaker.id}">В корзину</button>
    </div>
  `).join('');
}

// Показать ошибку
function showError(message) {
  elements.container.innerHTML = `
    <div class="error">${message}</div>
  `;
}

// Инициализация приложения
async function initApp() {
  elements.loading.style.display = 'block';
  
  const sneakers = await loadSneakers();
  renderSneakers(sneakers);
  
  elements.loading.style.display = 'none';
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp);
