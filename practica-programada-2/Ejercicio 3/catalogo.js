// Array para almacenar los productos
let products = [];

// Función para agregar un producto
function addProduct(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;

    // Crear un objeto producto
    const product = {
        name,
        price,
        category
    };

    // Agregar el producto al array
    products.push(product);

    // Limpiar el formulario
    document.getElementById('productForm').reset();

    // Actualizar la lista de productos
    displayProducts();
}

// Función para mostrar los productos en el DOM
function displayProducts(filter = '') {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpiar la lista

    // Variable para verificar si hay productos en la categoría filtrada
    let hasProducts = false;

    // Mostrar productos
    products.forEach((product, index) => {
        // Usar switch para filtrar productos por categoría
        switch (filter) {
            case '':
                // Mostrar todos los productos
                break;
            case 'Electrónica':
                if (product.category !== 'Electrónica') return;
                break;
            case 'Ropa':
                if (product.category !== 'Ropa') return;
                break;
            case 'Alimentos':
                if (product.category !== 'Alimentos') return;
                break;
            default:
                return; // Si la categoría no es válida, no mostrar nada
        }

        // Si se llega aquí, significa que hay un producto que mostrar
        hasProducts = true;

        const li = document.createElement('li');
        li.innerText = `${product.name} - ₡${product.price.toFixed(2)} - ${product.category}`;
        
        // Botón para eliminar el producto
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = () => {
            // Eliminar el producto del array usando el índice original
            products.splice(products.indexOf(product), 1); // Eliminar el producto del array
            displayProducts(filter); // Actualizar la lista con el filtro actual
        };

        li.appendChild(deleteButton);
        productList.appendChild(li);
    });

    // Si no hay productos en la categoría filtrada, mostrar un mensaje
    if (!hasProducts) {
        productList.innerHTML = '<li>No hay productos en esta categoría.</li>';
    }
}

// Evento para agregar producto
document.getElementById('productForm').addEventListener('submit', addProduct);

// Evento para filtrar productos
document.getElementById('filterCategory').addEventListener('change', function() {
    const selectedCategory = this.value;
    displayProducts(selectedCategory);
});