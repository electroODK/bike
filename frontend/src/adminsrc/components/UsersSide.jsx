import React, { useState } from "react";
import s from "./userSide.module.css";

const UserSide = () => {
  const excelTable = [
    { id: 1, acc: "example@gmail.com",  status: "active", rentsNumber: 2 },
  ];

  return (
    <div className={s.container}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account</th>

            <th>Status</th>
            <th>Rents Number</th>
          </tr>
        </thead>
        <tbody>
          {excelTable.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.acc}</td>

              <td>{item.status}</td>
              <td>{item.rentsNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSide;
