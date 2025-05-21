const postList = document.getElementById('post-list');

async function cargarPublicaciones() {
  try {
    const res = await fetch('http://localhost:8000/api/posts');
    const posts = await res.json();

    if (res.ok && posts.length > 0) {
      posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('post-card');
        const actionText = post.type === 'ofrezco' ? 'Quiero aprender esto' : 'Puedo enseñarte esto';
        card.innerHTML = `
          <div style="padding: 20px; background-color: #fff; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
            <img src="${post.imageUrl || 'assets/default.jpg'}" alt="Imagen del post" style="width:100%; height:220px; object-fit:cover; border-radius: 8px;">
            <div class="content" style="margin-top: 15px;">
              <h2 style="margin: 0; font-size: 1.4em; color: #222;">${post.user?.name || 'Anónimo'}</h2>
              <h3 style="margin: 8px 0; font-size: 1.1em; color: #555; font-weight: normal;">${post.title}</h3>
              <p style="margin: 10px 0; font-size: 1em; color: #555;">${post.description || 'Sin descripción'}</p>
              <p><strong>Habilidad:</strong> ${post.skills.join(', ')}</p>
              <p><strong>Tipo:</strong> ${post.type === 'ofrezco' ? 'Ofrezco enseñar' : 'Quiero aprender'}</p>
            </div>
            <button style="margin-top: 15px; background-color: #00D9FF; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">${actionText}</button>
          </div>
        `;
        postList.appendChild(card);
      });
    } else {
      postList.innerHTML = '<p>No hay publicaciones por el momento.</p>';
    }
  } catch (err) {
    console.error(err);
    postList.innerHTML = '<p>Error de conexión con el servidor.</p>';
  }
}

cargarPublicaciones();
