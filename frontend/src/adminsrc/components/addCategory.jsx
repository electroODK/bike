import React, { useState } from "react";
import axios from "axios";
import styles from "./adddFood.module.css"; // Reuse your styles

const AddCategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(null)

  const handleAddCategory = async () => {
    if (!name.trim()) {
      setMessage("Category name is required");
      return;
    }

    setLoading(true);
    setMessage(null);
    setShowAddForm(null)

    try {
      const res = await axios.post("/api/categories", {
        name,
        information: information || null,
      });

      if (res.data.success) {
        setName("");
        setInformation("");
        setMessage("Category added successfully");
        if (onCategoryAdded) onCategoryAdded(res.data.data); // optional callback
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Add category error:", err);
      setMessage("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>

    


      <div className={styles.grid}>
        <div>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Enter category name"
          />
        </div>
        <div>
          <label className={styles.label}>Information (optional)</label>
          <textarea
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            className={styles.input}
            placeholder="Enter details"
          />
        </div>
        {message && <p className={styles.error}>{message}</p>}
        <div className={styles.actions}>
          <button
            onClick={handleAddCategory}
            className={styles.addItem}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryForm;
