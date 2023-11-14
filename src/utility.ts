/**
 * Generate a unique string ID for the key of a map by checking if key exists in map
 */
export function generateMapID(map: Map<string, object>, length = 10) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let id = "";

  function loop() {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id = id + characters[randomIndex];
    }
  }

  if (map.size === 0) loop();
  else {
    while (map) {
      loop();
      if (!map.has(id)) break;
    }
  }

  return id;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error);
  }
}
