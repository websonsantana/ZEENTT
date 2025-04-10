
    document.addEventListener("DOMContentLoaded", function () {
        const list = document.querySelector(".list");
        const addButton = document.querySelector(".add");
        const saveButton = document.querySelector(".save");
        const concludeButton = document.querySelector(".conclude");
        const totalPriceEl = document.getElementById("total-price");
        const totalItemsEl = document.getElementById("total-items");

        function updateSummary() {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            let totalPrice = 0;
            let totalItems = 0;
            savedOrders.forEach(item => {
                totalPrice += item.quantity * item.price;
                totalItems += parseInt(item.quantity);
            });
            totalPriceEl.textContent = `R$ ${totalPrice.toFixed(2)}`;
            totalItemsEl.textContent = totalItems;
        }

        function loadOrders() {
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            list.innerHTML = "";
            savedOrders.forEach((item, index) => {
                const li = document.createElement("li");
                li.innerHTML = `<span>${item.quantity} x</span><span>${item.name}</span> <span>R$ ${(item.quantity * item.price).toFixed(2)}</span> <button class="delete" data-index="${index}">x</button>`;
                list.appendChild(li);
            });
            updateSummary();
        }

        addButton.addEventListener("click", function () {
            const menuItems = JSON.parse(localStorage.getItem("menu")) || [];
            if (menuItems.length === 0) {
                alert("Nenhum item no cardápio cadastrado!");
                return;
            }

            let itemName = prompt("Digite o nome do item (deve estar no cardápio):");
            let menuItem = menuItems.find(item => item.name.toLowerCase() === itemName.toLowerCase());

            if (!menuItem) {
                alert("Item não encontrado no cardápio!");
                return;
            }

            let quantity = parseInt(prompt("Quantidade:")) || 1;
            const newItem = { quantity, name: menuItem.name, price: menuItem.price };
            const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
            savedOrders.push(newItem);
            localStorage.setItem("orders", JSON.stringify(savedOrders));
            loadOrders();
        });

        list.addEventListener("click", function (event) {
            if (event.target.classList.contains("delete")) {
                const index = event.target.getAttribute("data-index");
                const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
                savedOrders.splice(index, 1);
                localStorage.setItem("orders", JSON.stringify(savedOrders));
                loadOrders();
            }
        });

        saveButton.addEventListener("click", function () {
            alert("Pedido salvo!");
        });

        concludeButton.addEventListener("click", function () {
            alert("Pedido concluído!");
        });

        loadOrders();
    });
