
        function loadMenu() {
            const menu = JSON.parse(localStorage.getItem("menu")) || [];
            const menuList = document.getElementById("menuList");
            menuList.innerHTML = "";
            menu.forEach((item, index) => {
                const li = document.createElement("li");
                li.classList.add("item");
                li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button class='delete' onclick='deleteItem(${index})'>X</button>`;
                menuList.appendChild(li);
            });
        }
        
        function addItem() {
            const name = document.getElementById("itemName").value;
            const price = parseFloat(document.getElementById("itemPrice").value);
            if (name && price) {
                const menu = JSON.parse(localStorage.getItem("menu")) || [];
                menu.push({ name, price });
                localStorage.setItem("menu", JSON.stringify(menu));
                loadMenu();
            }
        }
        
        function deleteItem(index) {
            const menu = JSON.parse(localStorage.getItem("menu")) || [];
            menu.splice(index, 1);
            localStorage.setItem("menu", JSON.stringify(menu));
            loadMenu();
        }
        
        loadMenu();
    