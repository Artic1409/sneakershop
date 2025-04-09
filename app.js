// Конфигурация Supabase (ваши данные уже вставлены)
const SUPABASE_CONFIG = {
  url: 'https://tqeeemvewrvlnsdhlkal.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWVlbXZld3J2bG5zZGhsa2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE5ODAsImV4cCI6MjA1OTgwNzk4MH0.iu8q0lq7m0wr9ii9lNT3ODu2lOuMOdbsU4A2xPfdWUI'
};

// Инициализация Supabase (без конфликта имён)
const db = supabase.createClient(
  SUPABASE_CONFIG.url, 
  SUPABASE_CONFIG.key
);

// Кэшируем DOM элементы
const elements = {
  loading: document.getElementById('loading'),
  container: document.getElementById('sneakersList'),
  status: document.getElementById('status-message') // Добавьте этот div в HTML
};

// Функции для работы с UI
const UI = {
  showLoading() {
    elements.loading.style.display = 'block';
    elements.status.textContent = 'Загрузка товаров...';
  },
  
  hideLoading() {
    elements.loading.style.display = 'none';
  },
  
  showError(message) {
    elements.status.textContent = message;
    elements.status.style.color = '#f44336';
  },
  
  clearStatus() {
    elements.status.textContent = '';
  }
};

// Основные функции приложения
const App = {
  async init() {
    try {
      UI.showLoading();
      
      const sneakers = await this.fetchSneakers();
      this.renderSneakers(sneakers);
      
    } catch (error) {
      console.error('Ошибка:', error);
      UI.showError(error.message || 'Ошибка загрузки данных');
    } finally {
      UI.hideLoading();
    }
  },
  
  async fetchSneakers() {
    const { data, error } = await db
      .from('sneakers')
      .select('*')
      .order('price', { ascending: true });
    
    if (error) throw new Error('Ошибка Supabase: ' + error.message);
    if (!data.length) throw new Error('Товары не найдены');
    
    return data;
  },
  
  renderSneakers(sneakers) {
    elements.container.innerHTML = sneakers.map(sneaker => `
      <div class="sneaker-card" data-id="${sneaker.id}">
        <img src="${sneaker.image_url || 'https://via.placeholder.com/300'}" 
             alt="${sneaker.name}"
             loading="lazy">
        <div class="sneaker-info">
          <h3>${sneaker.name}</h3>
          <p>${sneaker.price} ₽</p>
        </div>
        <button class="add-to-cart">В корзину</button>
      </div>
    `).join('');
    
    this.setupEventListeners();
  },
  
  setupEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.sneaker-card');
        const productId = card.dataset.id;
        this.addToCart(productId);
      });
    });
  },
  
  addToCart(productId) {
    console.log('Добавлен товар ID:', productId);
    // Здесь будет логика добавления в корзину
    UI.showError('Товар добавлен в корзину!'); // Временное уведомление
    setTimeout(UI.clearStatus, 2000);
  }
};

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => App.init());
