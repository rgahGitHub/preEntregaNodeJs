const DB_NAME = "MiAppDB";
const DB_VERSION = 1;
const STORE_PRODUCTOS = "productos";
const STORE_CARRITO = "carrito";

export const abrirDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_PRODUCTOS)) {
        db.createObjectStore(STORE_PRODUCTOS, { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(STORE_CARRITO)) {
        db.createObjectStore(STORE_CARRITO, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al abrir IndexedDB");
  });
};

// CRUD Productos
export const obtenerProductos = async () => {
  const db = await abrirDB();
  return new Promise((resolve) => {
    const trans = db.transaction(STORE_PRODUCTOS, "readonly");
    const store = trans.objectStore(STORE_PRODUCTOS);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
  });
};

export const agregarProducto = async (producto) => {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const trans = db.transaction(STORE_PRODUCTOS, "readwrite");
    const store = trans.objectStore(STORE_PRODUCTOS);
    const request = store.add(producto);
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error al agregar producto");
  });
};

export const actualizarProducto = async (producto) => {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const trans = db.transaction(STORE_PRODUCTOS, "readwrite");
    const store = trans.objectStore(STORE_PRODUCTOS);
    const request = store.put(producto);
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error al actualizar producto");
  });
};

export const borrarProducto = async (id) => {
  const db = await abrirDB();
  return new Promise((resolve) => {
    const trans = db.transaction(STORE_PRODUCTOS, "readwrite");
    const store = trans.objectStore(STORE_PRODUCTOS);
    store.delete(id);
    trans.oncomplete = () => resolve();
  });
};

// CRUD Carrito
export const obtenerCarrito = async () => {
  const db = await abrirDB();
  return new Promise((resolve) => {
    const trans = db.transaction(STORE_CARRITO, "readonly");
    const store = trans.objectStore(STORE_CARRITO);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
  });
};

export const guardarProductoEnCarrito = async (producto) => {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const trans = db.transaction(STORE_CARRITO, "readwrite");
    const store = trans.objectStore(STORE_CARRITO);
    const request = store.put(producto);
    request.onsuccess = () => resolve();
    request.onerror = () => reject("Error al guardar en carrito");
  });
};

export const borrarDelCarrito = async (id) => {
  const db = await abrirDB();
  return new Promise((resolve) => {
    const trans = db.transaction(STORE_CARRITO, "readwrite");
    const store = trans.objectStore(STORE_CARRITO);
    store.delete(id);
    trans.oncomplete = () => resolve();
  });
};
