// Конфиг Supabase (замените на свои значения!)
const supabaseUrl = 'https://tqeeemvewrvlnsdhlkal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWVlbXZld3J2bG5zZGhsa2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE5ODAsImV4cCI6MjA1OTgwNzk4MH0.iu8q0lq7m0wr9ii9lNT3ODu2lOuMOdbsU4A2xPfdWUI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Данные корзины
let cart = [];

// Загрузка товаров
async function loadSneakers() {
  try {
    const { data, error } = await supabase
      .from('sneakers')
      .select('*');

    if (error) throw error;
    
    if (data.length === 0) {
      console.warn("Нет данных в таблице sneakers!");
      return;
    }

    renderProducts(data);
  } catch (err) {
    console.error("Ошибка загрузки:", err);
    alert("Не удалось загрузить товары");
  }
}

// Отрисовка товаров
function renderProducts(products) {
  const container = document.getElementById("sneakersList");
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="sneaker-card">
      <img src="${product.image_url || 'https://via.placeholder.com/150'}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      <button class="add-to-cart" data-id="${product.id}">В корзину</button>
    </div>
  `).join("");

  // Вешаем обработчики кнопок
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
    });
  });
}

// Добавление в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  cart.push(product);
  updateCart();
  alert(`Добавлено: ${product.name}`);
}

// Обновление корзины
function updateCart() {
  const counter = document.getElementById("cartCounter");
  if (counter) counter.textContent = cart.length;
}

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand();
  tg.MainButton.setText("Оформить заказ").hide();
}

// Запуск при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  loadSneakers();
  
  // Кнопка корзины
  document.getElementById("cartButton")?.addEventListener("click", () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Товаров: ${cart.length}\nСумма: ${total} ₽`);
  });
});
