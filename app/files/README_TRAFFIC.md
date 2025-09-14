# Mapbox Traffic Integration Setup

## Что сделано

1. **HTML файл с визуализацией трафика** (`mapbox_traffic.html`):
   - Интеграция Mapbox GL JS
   - Подключение плагина Mapbox GL Traffic
   - Интерактивная карта с данными о трафике
   - Кнопка переключения слоя трафика
   - Панель с информацией о цветовой схеме трафика

2. **FastAPI роуты** (обновлен `router.py`):
   - `/traffic` - отображает карту трафика
   - `/files/{filename}` - сервирует файлы из папки files

## Как использовать

### 1. Получите Mapbox Access Token
1. Зарегистрируйтесь на https://account.mapbox.com/
2. Создайте новый токен или используйте существующий
3. Замените `YOUR_MAPBOX_ACCESS_TOKEN` в файле `mapbox_traffic.html`

### 2. Запустите сервер
```bash
python main.py
```

### 3. Откройте в браузере
- Карта трафика: http://localhost:8000/traffic
- API: http://localhost:8000/

## Функциональность

- **Real-time traffic data** - данные о трафике в реальном времени
- **Color-coded traffic** - цветовая схема:
  - 🟢 Зеленый: свободное движение
  - 🟡 Желтый: умеренный трафик
  - 🔴 Красный: плотный трафик
  - 🔴 Темно-красный: сильные пробки

- **Interactive controls**:
  - Toggle traffic layer
  - Navigation controls
  - Fullscreen mode
  - Geolocate user
  - Click for coordinates

## Настройка

В файле `mapbox_traffic.html` можете изменить:
- `center: [37.6173, 55.7558]` - координаты центра карты (сейчас Москва)
- `zoom: 12` - начальный зуом
- `style: 'mapbox://styles/mapbox/streets-v11'` - стиль карты

## Доступные стили карты Mapbox
- `streets-v11` - улицы
- `satellite-v9` - спутник
- `outdoors-v11` - природа
- `light-v10` - светлая тема
- `dark-v10` - темная тема