import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import styles from "./adddFood.module.css";
import FoodItemCard from "./FoodSide";

const AddFoodItemsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [categories, setCategories] = useState([{ id: 1, name: "Default" }]);
  const [materials, setMaterials] = useState([{ id: 1, name: "Steel" }]);
  const [foodItems, setFoodItems] = useState([]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    size: "Medium",
    category_id: 1,
    material_id: 1,
    image: "/api/placeholder/150/150",
  });

  // Fetch bikes
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get("/api/bikes");
        setFoodItems(res.data.data);
      } catch (err) {
        console.error("Failed to fetch bikes:", err);
      }
    };

    fetchBikes();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? foodItems
      : foodItems.filter((item) => item.category_id === parseInt(activeCategory));

  const handleAddItem = async () => {
    if (newItem.name && newItem.price) {
      try {
        const payload = {
          name: newItem.name,
          price: parseFloat(newItem.price),
          size: newItem.size,
          category_id: parseInt(newItem.category_id),
          material_id: parseInt(newItem.material_id),
          photo: [newItem.image],
          status: "available",
        };

        const res = await axios.post("/api/bikes", payload);
        setFoodItems([...foodItems, res.data.data]);
        setNewItem({
          name: "",
          price: "",
          size: "Medium",
          category_id: 1,
          material_id: 1,
          image: "/api/placeholder/150/150",
        });
        setShowAddForm(false);
      } catch (err) {
        console.error("Failed to add bike:", err);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/api/bikes/${id}`);
      setFoodItems(foodItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete bike:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Add Bike Items</h1>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={styles.addButton}
            >
              <Plus size={16} />
              Add New Item
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>Add New Bike</h2>
            <div className={styles.grid}>
              <div>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className={styles.input}
                  placeholder="Enter item name"
                />
              </div>

              <div>
                <label className={styles.label}>Price</label>
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className={styles.input}
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className={styles.label}>Size</label>
                <select
                  value={newItem.size}
                  onChange={(e) =>
                    setNewItem({ ...newItem, size: e.target.value })
                  }
                  className={styles.select}
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div>
                <label className={styles.label}>Category</label>
                <select
                  value={newItem.category_id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category_id: e.target.value })
                  }
                  className={styles.select}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={styles.label}>Material</label>
                <select
                  value={newItem.material_id}
                  onChange={(e) =>
                    setNewItem({ ...newItem, material_id: e.target.value })
                  }
                  className={styles.select}
                >
                  {materials.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.actions}>
                <button onClick={handleAddItem} className={styles.addItem}>
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className={styles.cancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.filterButtons}>
          <button
            key="All"
            onClick={() => setActiveCategory("All")}
            className={`${styles.categoryButton} ${
              activeCategory === "All" ? styles.addButton : ""
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(String(cat.id))}
              className={`${styles.categoryButton} ${
                activeCategory === String(cat.id) ? styles.addButton : ""
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className={styles.foodGrid}>
          {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} onDelete={handleDeleteItem} />
            ))
          ) : (
            <p className={styles.noItemsText}>No bike items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFoodItemsPage;
