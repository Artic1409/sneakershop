// Данные товаров (можно заменить на API)
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 12000,
    image: "https://via.placeholder.com/150?text=Nike+Air+Max"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 15000,
    image: "https://via.placeholder.com/150?text=Adidas+Ultraboost"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 9000,
    image: "https://via.placeholder.com/150?text=Puma+RS-X"
  },
  {
    id: 4,
    name: "New Balance 574",
    price: 8000,
    image: "https://via.placeholder.com/150?text=New+Balance+574"
  }
];

let cart = [];

// Инициализация Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.expand(); // Раскрываем на весь экран
  tg.MainButton.setText("Перейти в корзину").hide();
}

// Отображаем товары
function renderProducts() {
  const sneakersList = document.getElementById("sneakersList");
  sneakersList.innerHTML = products.map(product => `
    <div class="sneaker-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
    </div>
  `).join("");
}

// Добавление в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
}

// Обновление корзины
function updateCart() {
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.textContent = cart.length;

  if (cart.length > 0 && window.Telegram.WebApp.MainButton.isVisible === false) {
    window.Telegram.WebApp.MainButton.show();
  }
}

// Обработка кнопки корзины
document.getElementById("cartButton").addEventListener("click", () => {
  alert(`Товаров в корзине: ${cart.length}\nОбщая сумма: ${cart.reduce((sum, item) => sum + item.price, 0)} ₽`);
  // Здесь можно добавить логику оформления заказа
});

// Запуск приложения
document.addEventListener("DOMContentLoaded", renderProducts);