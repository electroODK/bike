import React from "react";
import s from "./FoodSide.module.css";

const FoodItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className={s.card}>
      <div className={s.imageWrapper}>
        <img 
          src={item.image} 
          alt={item.name}
          className={s.image}
        />
      </div>
      <h3 className={s.name}>{item.name}</h3>
      <p className={s.category}>{item.category}</p>
      <p className={s.price}>₹ {item.price}/H.</p>
      <div className={s.actions}>
        <button onClick={() => onEdit(item)} className={`${s.btn} ${s.edit}`}>
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className={`${s.btn} ${s.delete}`}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
