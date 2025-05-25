// === OUTDOOR AREA DATA AND FUNCTIONS ===
  (function(){
    const outdoorCategories = {
      "Landscaping & Softscaping Materials": [
        {name: "Soil & Topsoil", price: 10},
        {name: "Sod or Seeded Lawn", price: 15},
        {name: "Flower Beds", price: 12},
        {name: "Mulch", price: 8},
        {name: "Compost", price: 9},
        {name: "Trees & Shrubs", price: 30},
        {name: "Ground Covers", price: 14},
        {name: "Watering Systems", price: 25}
      ],
      "Hardscaping Materials": [
        {name: "Pavers", price: 40},
        {name: "Gravel or Pebbles", price: 15},
        {name: "Retaining Walls", price: 60},
        {name: "Decorative Stone", price: 35},
        {name: "Outdoor Tiles", price: 50},
        {name: "Fencing Materials", price: 45},
        {name: "Pergolas or Gazebos", price: 120}
      ],
      "Outdoor Amenities": [
        {name: "Swimming Pool", price: 1500},
        {name: "Outdoor Kitchen", price: 900},
        {name: "Outdoor Furniture", price: 400},
        {name: "Fire Pit", price: 350},
        {name: "Outdoor Lighting", price: 100},
        {name: "Water Features", price: 800},
        {name: "Artificial Turf", price: 30}
      ],
      "Paving and Driveway": [
        {name: "Concrete", price: 70},
        {name: "Asphalt", price: 65},
        {name: "Paver Stones", price: 45},
        {name: "Edging", price: 25},
        {name: "Drainage Systems", price: 40}
      ]
    };

    const outdoorContainer = document.getElementById('outdoorCategoriesContainer');

    function createOutdoorMaterialOptions(category) {
      if (!category || !outdoorCategories[category]) return '<option value="">Select category first</option>';
      return outdoorCategories[category]
        .map(m => `<option value="${m.name}" data-price="${m.price}">${m.name} (€${m.price})</option>`)
        .join('');
    }

    function createOutdoorCategoryTables() {
      for (const category in outdoorCategories) {
        const div = document.createElement('div');
        div.classList.add('category-table');

        div.innerHTML = `
          <h3>${category}</h3>
          <table data-category="${category}" class="outdoorTable">
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
          <button type="button" onclick="addOutdoorRow('${category}')">Add Material</button>
        `;

        outdoorContainer.appendChild(div);
        addOutdoorRow(category);
      }
    }

    window.addOutdoorRow = function(category) {
      const tableBody = outdoorContainer.querySelector(`table[data-category="${category}"] tbody`);

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>
          <select class="material" onchange="onOutdoorMaterialChange(this)" required>
            <option value="">Select material</option>
            ${createOutdoorMaterialOptions(category)}
          </select>
        </td>
        <td><input type="number" class="unit-price" readonly value="0"></td>
        <td><input type="number" class="quantity" min="0" step="0.01" value="0" onchange="onOutdoorQuantityChange(this)" required></td>
        <td class="total">0.00</td>
        <td><button type="button" class="remove-btn" onclick="removeOutdoorRow(this)">X</button></td>
      `;

      tableBody.appendChild(newRow);
    };

    window.onOutdoorMaterialChange = function(selectElem) {
      const row = selectElem.closest('tr');
      const selectedOption = selectElem.selectedOptions[0];
      const price = parseFloat(selectedOption.dataset.price) || 0;

      const unitPriceInput = row.querySelector('.unit-price');
      const quantityInput = row.querySelector('.quantity');
      const totalCell = row.querySelector('.total');

      unitPriceInput.value = price.toFixed(2);
      quantityInput.value = 0;
      totalCell.textContent = "0.00";

      updateOutdoorTotals();
    };

    window.onOutdoorQuantityChange = function(inputElem) {
      const row = inputElem.closest('tr');
      const unitPrice = parseFloat(row.querySelector('.unit-price').value) || 0;
      const quantity = parseFloat(inputElem.value) || 0;
      const totalCell = row.querySelector('.total');

      const total = unitPrice * quantity;
      totalCell.textContent = total.toFixed(2);

      updateOutdoorTotals();
    };

    window.removeOutdoorRow = function(button) {
      const row = button.closest('tr');
      row.remove();
      updateOutdoorTotals();
    };

    window.updateOutdoorTotals = function() {
      let grandTotal = 0;

      for (const category in outdoorCategories) {
        const tableBody = outdoorContainer.querySelector(`table[data-category="${category}"] tbody`);
        const categoryTotalElem = outdoorContainer.querySelector(`[data-category-total="${category}"]`);

        let categoryTotal = 0;
        tableBody.querySelectorAll('tr').forEach(row => {
          const totalText = row.querySelector('.total').textContent;
          categoryTotal += parseFloat(totalText) || 0;
        });

        categoryTotalElem.textContent = categoryTotal.toFixed(2);
        grandTotal += categoryTotal;
      }

      document.getElementById('outdoorGrandTotal').textContent = grandTotal.toFixed(2);
      updateCombinedGrandTotal();
    };

    // Expose function globally so it can be called on window.onload
    window.createOutdoorCategoryTables = createOutdoorCategoryTables;
  })();