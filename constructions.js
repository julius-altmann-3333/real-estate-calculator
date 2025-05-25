(function() {
  const constructionCategories = {
    "Foundation & Structural Materials": [
      { name: "Concrete", price: 80 },
      { name: "Rebar", price: 50 },
      { name: "Precast Concrete", price: 90 },
      { name: "Masonry", price: 60 },
      { name: "Gravel/Sand", price: 20 },
      { name: "Cement", price: 35 },
      { name: "Waterproofing Membranes", price: 45 },
      { name: "Piles", price: 100 }
    ],
    "Exterior Wall Materials": [
      { name: "Brick", price: 70 },
      { name: "Concrete Blocks", price: 55 },
      { name: "Natural Stone", price: 120 },
      { name: "Stone Veneer", price: 95 },
      { name: "Precast Concrete Panels", price: 110 },
      { name: "Fiber Cement Siding", price: 85 },
      { name: "Stucco", price: 65 },
      { name: "Wood Cladding", price: 75 },
      { name: "Metal Panels", price: 90 }
    ],
    "Roofing Materials": [
      { name: "Asphalt Shingles", price: 60 },
      { name: "Clay or Concrete Tiles", price: 100 },
      { name: "Metal Roofing", price: 120 },
      { name: "Slate Roofing", price: 140 },
      { name: "Flat Roof Waterproofing", price: 80 },
      { name: "Insulation Boards", price: 70 }
    ],
    "Windows & Doors": [
      { name: "UPVC Frames", price: 110 },
      { name: "Aluminum Frames", price: 130 },
      { name: "Wood Frames", price: 125 },
      { name: "Double-Glazed Glass", price: 140 },
      { name: "Sliding Doors", price: 200 },
      { name: "Wooden or Metal Doors", price: 150 }
    ],
    "Exterior Finishes": [
      { name: "Paint", price: 25 },
      { name: "Stone Cladding", price: 90 },
      { name: "Wood Finishes", price: 70 },
      { name: "Tile Cladding", price: 85 },
      { name: "Render & Plaster", price: 60 }
    ],
    "Exterior Flooring": [
      { name: "Porcelain Tiles", price: 75 },
      { name: "Natural Stone Flooring", price: 100 },
      { name: "Wooden Decking", price: 90 },
      { name: "Concrete Slabs", price: 60 },
      { name: "Rubber Tiles", price: 50 }
    ],
    "Landscaping & Exterior Hardscape Materials": [
      { name: "Lawn Grass", price: 10 },
      { name: "Shrubs", price: 15 },
      { name: "Trees", price: 30 },
      { name: "Gravel", price: 12 },
      { name: "Pebbles", price: 14 },
      { name: "Decorative Stone", price: 35 },
      { name: "Pavers", price: 40 },
      { name: "Retaining Walls", price: 60 },
      { name: "Outdoor Lighting", price: 100 }
    ]
  };

  const container = document.getElementById('constructionCategoriesContainer');

  function getMaterialOptions(category) {
    return constructionCategories[category]
      .map(mat => `<option value="${mat.name}" data-price="${mat.price}">${mat.name} (€${mat.price})</option>`)
      .join('');
  }

  function buildTables() {
    for (const category in constructionCategories) {
      const div = document.createElement('div');
      div.classList.add('category-table');
      div.innerHTML = `
        <h3>${category}</h3>
        <table data-category="${category}" class="constructionTable">
          <thead>
            <tr>
              <th>Material</th>
              <th>Unit Price (€)</th>
              <th>Quantity</th>
              <th>Total (€)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <p class="category-total">Category Total: €<span data-category-total="${category}">0.00</span></p>
        <button type="button" onclick="addConstructionRow('${category}')">Add Material</button>
      `;
      container.appendChild(div);
      addConstructionRow(category); // Add first row
    }
  }

  window.addConstructionRow = function(category) {
    const tbody = container.querySelector(`table[data-category="${category}"] tbody`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <select onchange="onConstructionMaterialChange(this)">
          <option value="">Select material</option>
          ${getMaterialOptions(category)}
        </select>
      </td>
      <td><input type="number" class="unit-price" readonly value="0"></td>
      <td><input type="number" class="quantity" min="0" step="0.01" value="0" onchange="onConstructionQuantityChange(this)"></td>
      <td class="total">0.00</td>
      <td><button onclick="removeConstructionRow(this)">X</button></td>
    `;
    tbody.appendChild(row);
  };

  window.onConstructionMaterialChange = function(select) {
    const row = select.closest('tr');
    const price = parseFloat(select.selectedOptions[0].dataset.price) || 0;
    row.querySelector('.unit-price').value = price.toFixed(2);
    row.querySelector('.quantity').value = 0;
    row.querySelector('.total').textContent = "0.00";
    updateConstructionTotals();
  };

  window.onConstructionQuantityChange = function(input) {
    const row = input.closest('tr');
    const price = parseFloat(row.querySelector('.unit-price').value) || 0;
    const qty = parseFloat(input.value) || 0;
    const total = price * qty;
    row.querySelector('.total').textContent = total.toFixed(2);
    updateConstructionTotals();
  };

  window.removeConstructionRow = function(button) {
    button.closest('tr').remove();
    updateConstructionTotals();
  };

  window.updateConstructionTotals = function() {
    let grandTotal = 0;
    for (const category in constructionCategories) {
      const tbody = container.querySelector(`table[data-category="${category}"] tbody`);
      const categoryTotalElem = container.querySelector(`[data-category-total="${category}"]`);
      let categoryTotal = 0;
      tbody.querySelectorAll('tr').forEach(row => {
        categoryTotal += parseFloat(row.querySelector('.total').textContent) || 0;
      });
      categoryTotalElem.textContent = categoryTotal.toFixed(2);
      grandTotal += categoryTotal;
    }
    document.getElementById('constructionGrandTotal').textContent = grandTotal.toFixed(2);
    updateCombinedGrandTotal?.(); // Optional: call if you're calculating combined totals elsewhere
  };

  window.createConstructionCategoryTables = buildTables;
})();
