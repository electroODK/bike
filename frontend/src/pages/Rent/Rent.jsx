import s from "./Rent.module.scss";
import bikes from "../../../bikesData";
import { Link } from "react-router-dom";
import { useApp } from "../../../AuthContext"; // исправлено имя

const Rent = () => {
  const {
    BikeOptions,
    handleCheckBoxChange,
    question,
    switchQuestion,
    totalPrice,
  } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedBikes = BikeOptions.map((options, index) => ({
      bikeId: bikes[index].id,
      selectedOptions: options,
    }));

    console.log("Отправка данных:", selectedBikes);

    fetch("http://localhost:5000/api/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bikes: selectedBikes }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Ответ от сервера:", data))
      .catch((err) => console.error("Ошибка:", err));
  };

  return (
    <form onSubmit={handleSubmit} className={s.section}>
      <div className={s.container}>
        <h1 className={s.title}>Заявка на аренду велосипедов</h1>

        <div className={s.RentInfo}>
          <div className={s.block}>
            <h4>Тип аренды</h4>
            <h3>По дням</h3>
          </div>
          <div className={s.block}>
            <h4>Дата и время начала</h4>
            <h3>24.07.21 12:00</h3>
          </div>
          <div className={s.block}>
            <h4>Дата и время конца</h4>
            <h3>25.07.21 12:00</h3>
          </div>
          <div className={s.block}>
            <h4>Доставка</h4>
            <h3>По адресу</h3>
          </div>
        </div>

        <div className={s.titles}>
          <h4 className={s.title}>Название велосипедов</h4>
          <div className={s.titleOptions}>
            <h4>Шлем</h4>
            <h4>Фонарик</h4>
            <h4>Замок</h4>
          </div>
          <div className={s.price}>
            <h4>Стоимость</h4>
          </div>
        </div>

        <div className={s.BikesList}>
          {bikes.map((bike, i) => (
            <div key={bike.id} className={s.bikeItem}>
              <div className={s.titleBikes}>
                <img src={bike.image} alt="bike" />
                <h4 className={s.title}>{bike.title}</h4>
              </div>

              <div className={s.devices}>
                <div className={s.optionsContainer}>
                  {["helmet", "light", "lock"].map((item) => (
                    <label key={item} className={s.checkbox}>
                      <input
                        type="checkbox"
                        checked={BikeOptions[i]?.[item]}
                        onChange={() =>
                          handleCheckBoxChange(i, item, 180)
                        }
                      />
                      <span className={s.checkmark}></span>
                    </label>
                  ))}
                  <div className={s.prices}>
                    <h3 className={s.price}>{bike.price} AED</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className={s.totalInfo}>
            <div className={s.block}>
              <Link className={s.linkHome} to={"/"}>
                <h2>Назад к выбору велосипедов</h2>
              </Link>

              <div className={s.OrderInfo}>
                <div className={s.deliveryPrice}>
                  <h3>Доставка:</h3>
                  <h2>0 AED</h2>
                </div>
                <div className={s.totalPrice}>
                  <h3>Итого:</h3>
                  <h2>{totalPrice} AED</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.img}>
        <img src="/intersect.svg" alt="intersect" />
      </div>

      <div className={s.container_2}>
        <div className={s.block}>
          <div className={s.contact_details}>
            <div className={s.user_details}>
              <h2 className={s.title}>Контактные данные</h2>
              <div className={s.inputs}>
                <input className={s.inp_1} placeholder="Имя*" type="text" />
                <input className={s.inp_2} placeholder="Номер телефона*" type="tel" />
              </div>
            </div>

            <div className={s.infoOrder}>
              <h2 className={s.title}>Информация о доставке</h2>
              <input placeholder="Адрес*" type="text" />
            </div>

            <div className={s.payment_type}>
              <h2 className={s.title}>Форма оплаты</h2>
              <div className={s.radio_group}>
                <label>
                  <input type="radio" name="payment" value="online" />
                  <h3>Онлайн</h3>
                </label>

                <label>
                  <input type="radio" name="payment" value="on-site" />
                  <div className={s.text}></div>
                  <h3>
                    На месте
                    <svg
                      onClick={switchQuestion}
                      className={s.question}
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="39"
                        rx="9.5"
                        fill="white"
                        stroke="#DDE3EB"
                      />
                      <path
                        d="M17 17.625C17 16.1753 18.3431 15 20 15C21.6569 15 23 16.1753 23 17.625C23 18.5333 22.4728 19.3339 21.6715 19.8051C20.8384 20.2951 20 21.0335 20 22V22"
                        stroke="#297FFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="20" cy="25" r="1" fill="#297FFF" />
                    </svg>
                  </h3>
                </label>
              </div>
            </div>
          </div>

          <div className={s.return_date}>
            <div className={s.returnInfo}>
              <h3>Фактическая дата возврата велосипеда</h3>
              <div className={s.inputs}>
                <div className={s.date}>
                  <input className={s.inp} type="date" />
                  <input className={s.inp} type="time" />
                </div>
                <input className={s.address} placeholder="Возврат по адресу" type="text" />
              </div>

              <div className={question ? `${s.return_info} ${s.active}` : s.return_info}>
                <div className={s.return}>
                  <h3>Возвращение велосипеда</h3>
                  <p className={s.text}>
                    На возвращение велосипеда даётся 1 час. Задача организации,
                    в особенности же сложившаяся структура организации позволяет
                    выполнять важные задания по разработке позиций, занимаемых
                    участниками в отношении поставленных задач.
                  </p>
                </div>

                <div className={s.address_return}>
                  <h3>Выбор адреса для возврата</h3>
                  <p className={s.text}>
                    Вы также можете ввести адрес другого места, где мы заберем у вас велосипед.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.btn_submit}>
          <button className={s.btn} type="submit">
            Забронировать
          </button>
        </div>
      </div>
    </form>
  );
};

export default Rent;
