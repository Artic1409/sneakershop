
// Конфиг Supabase (замените на свои значения!)
const supabaseUrl = 'https://tqeeemvewrvlnsdhlkal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWVlbXZld3J2bG5zZGhsa2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE5ODAsImV4cCI6MjA1OTgwNzk4MH0.iu8q0lq7m0wr9ii9lNT3ODu2lOuMOdbsU4A2xPfdWUI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const runApp = async () => {
  try {
    // 1. Инициализация клиента
    const supabase = initSupabase();
    console.log('Supabase client initialized', supabase);

    // 2. Загрузка данных
    const { data: sneakers, error } = await supabase
      .from('sneakers')
      .select('*');

    if (error) throw error;
    if (!sneakers || sneakers.length === 0) {
      throw new Error('No sneakers found');
    }

    // 3. Отображение данных
    renderSneakers(sneakers);
  } catch (error) {
    console.error('App error:', error);
    document.getElementById('sneakersList').innerHTML = `
      <div class="error">Ошибка загрузки данных: ${error.message}</div>
    `;
  }
};

// Функция отрисовки товаров
const renderSneakers = (sneakers) => {
  const container = document.getElementById('sneakersList');
  container.innerHTML = sneakers.map(sneaker => `
    <div class="sneaker-card">
      <img src="${sneaker.image_url}" alt="${sneaker.name}">
      <h3>${sneaker.name}</h3>
      <p>${sneaker.price} ₽</p>
    </div>
  `).join('');
};

// Запускаем приложение после загрузки страницы
document.addEventListener('DOMContentLoaded', runApp);
