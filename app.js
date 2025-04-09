// Импорт Supabase (добавьте в <head> index.html)
// <script src="https://unpkg.com/@supabase/supabase-js@2"></script>

// Подключение к Supabase
const supabaseUrl = 'https://tqeeemvewrvlnsdhlkal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZWVlbXZld3J2bG5zZGhsa2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMzE5ODAsImV4cCI6MjA1OTgwNzk4MH0.iu8q0lq7m0wr9ii9lNT3ODu2lOuMOdbsU4A2xPfdWUI';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Загрузка кроссовок из базы
async function loadSneakers() {
  const { data, error } = await supabase
    .from('sneakDB')
    .select('*');

  if (error) {
    console.error('Ошибка загрузки:', error);
    return;
  }

  // Отображаем товары (ваша функция)
  renderProducts(data);
}

// Добавление нового товара (пример)
async function addSneaker(name, price, imageUrl) {
  const { data, error } = await supabase
    .from('sneakers')
    .insert([{ name, price, image_url: imageUrl }]);

  if (error) console.error('Ошибка добавления:', error);
  else console.log('Товар добавлен:', data);
}

// Вызов функции загрузки при старте
document.addEventListener('DOMContentLoaded', loadSneakers);
