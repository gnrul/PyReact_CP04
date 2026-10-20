import React, { useState, useEffect } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Ожидание запуска...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/event');

    eventSource.addEventListener('progress', (event) => {
      const currentProgress = Number(event.data);
      setProgress(currentProgress);
      setStatus(`Выполнение: ${currentProgress}%`);
    });

    eventSource.addEventListener('complete', (event) => {
      setStatus('Процесс успешно завершен!');
      eventSource.close();
    });

    eventSource.onerror = () => {
      eventSource.close(); 
    };

    return () => {
      eventSource.close();
    };
  }, []); 
  return (
    <div style={{ padding: '20px'}}>
      <h2>Прогресс выполнения ..</h2>

      <div style={{ marginBottom: '10px' }}>
        <progress value={progress} max="100" style={{ width: '300px', height: '20px' }} />
        <span style={{ marginLeft: '10px' }}>{progress}%</span>
      </div>

      <p>Статус: {status}</p>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
    </div>
  );
}

export default Loading;