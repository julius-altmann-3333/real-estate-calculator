function setupToggle(buttonId, containerId) {
    const btn = document.getElementById(buttonId);
    const box = document.getElementById(containerId);
    btn.onclick = () => {
      box.style.display = (box.style.display === "block") ? "none" : "block";
    };
  }

  setupToggle("toggleConstruction", "constructionCategoriesContainer");
  setupToggle("togglePoolhouse", "poolhouseCategoriesContainer");
  setupToggle("toggleOutdoor", "outdoorCategoriesContainer");