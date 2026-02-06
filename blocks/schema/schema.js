function isEditor() {
  // Detectar si estamos en Universal Editor o AEM Author
  return window.location.hostname.includes('author')
    || window.location.hostname.includes('aem.page')
    || window.location.search.includes('wcmmode=edit')
    || window.location.search.includes('wcmmode=design')
    || document.documentElement.classList.contains('aem-AuthorLayer-Edit')
    || document.body.classList.contains('aem-GridColumn');
}

export default function decorate(block) {
  // Si estamos en modo edición, solo hacer visible el contenido
  if (isEditor()) {
    block.classList.add('schema-editor-mode');

    // Agregar indicador visual
    const indicator = document.createElement('div');
    indicator.className = 'schema-indicator';
    indicator.textContent = '📋 Schema JSON-LD (Visible solo en editor)';
    block.prepend(indicator);

    return; // No ejecutar la lógica de producción
  }

  // PRODUCCIÓN: Inyectar JSON-LD al head
  try {
    // Get JSON content from block
    const jsonText = block.textContent.trim();

    // Validate JSON
    const schemaData = JSON.parse(jsonText);

    // Create script tag for JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);

    // Append to document head
    document.head.appendChild(script);

    // Remove the visible block from DOM
    block.remove();
  } catch (error) {
    console.error('Schema block error: Invalid JSON', error);

    // En caso de error, mostrar mensaje en lugar de remover
    block.innerHTML = `
      <div style="background: #fee; border: 2px solid #c33; padding: 1rem; color: #c33;">
        <strong>⚠️ Error en Schema Block:</strong><br>
        El JSON no es válido. Por favor, verifica la sintaxis.
      </div>
    `;
  }
}
