// === POOLHOUSE DATA AND FUNCTIONS ===
  (function(){
    const poolhouseCategories = {
      "Foundation & Structural Materials": [
        {name: "Concrete", price: 75},
        {name: "Steel Reinforcement Bars", price: 120},
        {name: "Concrete Blocks", price: 30},
        {name: "Wood Framing", price: 50},
        {name: "Insulation", price: 40}
      ],
      "Roofing": [
        {name: "Asphalt Shingles", price: 85},
        {name: "Metal Roofing", price: 110},
        {name: "Insulation Boards", price: 45},
        {name: "Roofing Felt", price: 25}
      ],
      "Interior Materials": [
        {name: "Gypsum Drywall", price: 20},
        {name: "Wood Paneling", price: 35},
        {name: "Ceramic or Porcelain Tiles", price: 40},
        {name: "Wood or Engineered Wood Flooring", price: 60},
        {name: "Paint", price: 15}
      ],
      "Plumbing & Electrical": [
        {name: "PVC Pipes", price: 10},
        {name: "Copper Pipes", price: 25},
        {name: "Electrical Wiring", price: 20},
        {name: "Waterproof Fixtures", price: 50}
      ],
      "Windows & Doors": [
        {name: "UPVC Frames", price: 80},
        {name: "Aluminum Frames", price: 90},
        {name: "Glass", price: 70},
        {name: "Wooden Doors", price: 110}
      ],
      "Outdoor Amenities": [
        {name: "Outdoor Bar", price: 200},
        {name: "Recreational Furniture", price: 150},
        {name: "Pergola", price: 180},
        {name: "Outdoor Lighting", price: 60}
      ]
    };

    const poolhouseContainer = document.getElementById('poolhouseCategoriesContainer');

    function createPoolhouseMaterialOptions(category) {
      if (!category || !poolhouseCategories[category]) return '<option value="">Select category first</option>';
      return poolhouseCategories[category]
        .map(m => `<option value="${m.name}" data-price="${m.price}">${m.name} (€${m.price})</option>`)
        .join('');
    }

    function createPoolhouseCategoryTables() {
      for (const category in poolhouseCategories) {
        const div = document.createElement('div');
        div.classList.add('category-table');

        div.innerHTML = `
          <h3>${category}</h3>
          <table data-category="${category}" class="poolhouseTable">
            <thead>
              <tr>
                <th>Material</th>
                <th>Unit Price (€)</th>
                <th>Quantity</th>
                <th>Total (€)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody><!-- rows added here --></tbody>
          </table>
          <p class="category-total">Category Total: €<span data-category-total="${category}">0.00</span></p>
          <button type="button" onclick="addPoolhouseRow('${category}')">Add Material</button>
        `;

        poolhouseContainer.appendChild(div);
        addPoolhouseRow(category);
      }
    }

    window.addPoolhouseRow = function(category) {
      const tableBody = poolhouseContainer.querySelector(`table[data-category="${category}"] tbody`);

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>
          <select class="material" onchange="onPoolhouseMaterialChange(this)" required>
            <option value="">Select material</option>
            ${createPoolhouseMaterialOptions(category)}
          </select>
        </td>
        <td><input type="number" class="unit-price" readonly value="0"></td>
        <td><input type="number" class="quantity" min="0" step="0.01" value="0" onchange="onPoolhouseQuantityChange(this)" required></td>
        <td class="total">0.00</td>
        <td><button type="button" class="remove-btn" onclick="removePoolhouseRow(this)">X</button></td>
      `;

      tableBody.appendChild(newRow);
    };

    window.onPoolhouseMaterialChange = function(selectElem) {
      const row = selectElem.closest('tr');
      const selectedOption = selectElem.selectedOptions[0];
      const price = parseFloat(selectedOption.dataset.price) || 0;

      const unitPriceInput = row.querySelector('.unit-price');
      const quantityInput = row.querySelector('.quantity');
      const totalCell = row.querySelector('.total');

      unitPriceInput.value = price.toFixed(2);
      quantityInput.value = 0;
      totalCell.textContent = "0.00";

      updatePoolhouseTotals();
    };

    window.onPoolhouseQuantityChange = function(inputElem) {
      const row = inputElem.closest('tr');
      const unitPrice = parseFloat(row.querySelector('.unit-price').value) || 0;
      const quantity = parseFloat(inputElem.value) || 0;
      const totalCell = row.querySelector('.total');

      const total = unitPrice * quantity;
      totalCell.textContent = total.toFixed(2);

      updatePoolhouseTotals();
    };

    window.removePoolhouseRow = function(button) {
      const row = button.closest('tr');
      row.remove();
      updatePoolhouseTotals();
    };

    window.updatePoolhouseTotals = function() {
      let grandTotal = 0;

      for (const category in poolhouseCategories) {
        const tableBody = poolhouseContainer.querySelector(`table[data-category="${category}"] tbody`);
        const categoryTotalElem = poolhouseContainer.querySelector(`[data-category-total="${category}"]`);

        let categoryTotal = 0;
        tableBody.querySelectorAll('tr').forEach(row => {
          const totalText = row.querySelector('.total').textContent;
          categoryTotal += parseFloat(totalText) || 0;
        });

        categoryTotalElem.textContent = categoryTotal.toFixed(2);
        grandTotal += categoryTotal;
      }

      document.getElementById('poolhouseGrandTotal').textContent = grandTotal.toFixed(2);
      updateCombinedGrandTotal();
    };

    // Expose function globally so it can be called on window.onload
    window.createPoolhouseCategoryTables = createPoolhouseCategoryTables;
  })();