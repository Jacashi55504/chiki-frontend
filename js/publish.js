document.getElementById('postForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const type = document.getElementById('type').value;
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim());
    const imageUrl = document.getElementById('imageUrl').value;
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      alert('Debes iniciar sesión para publicar.');
      return window.location.href = 'login.html';
    }
  
    try {
      const res = await fetch('http://localhost:8000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, type, skills, imageUrl, userId })
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('Publicación creada con éxito');
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Error al crear publicación');
      }
    } catch (err) {
      console.error(err);
      alert('Error al conectar con el servidor');
    }
  });
  