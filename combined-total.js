// === COMBINED GRAND TOTAL UPDATE ===
  function updateCombinedGrandTotal() {
    const poolhouseTotal = parseFloat(document.getElementById('poolhouseGrandTotal').textContent) || 0;
    const outdoorTotal = parseFloat(document.getElementById('outdoorGrandTotal').textContent) || 0;

    const combinedTotal = poolhouseTotal + outdoorTotal;
    document.getElementById('combinedGrandTotal').textContent = combinedTotal.toFixed(2);
  }

  // Call both tables creation on window load
  window.onload = function() {
    createConstructionCategoryTables();
    createPoolhouseCategoryTables();
    createOutdoorCategoryTables();
  };
