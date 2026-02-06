export default function decorate(block) {
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
    // Remove block even on error to avoid displaying malformed content
    block.remove();
  }
}
