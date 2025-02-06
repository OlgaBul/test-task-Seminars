import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import styles from "./SeminarList.module.css";
import { format, parse } from "date-fns";


const SeminarList = () => {
  const [data, setData] = useState([]); // Состояние для хранения семинаров
  const [editingSeminar, setEditingSeminar] = useState(null); // Состояние для редактируемого семинара
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия модального окна

  useEffect(() => {
    fetchData();
  }, []);

  // Функция для получения семинаров
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/seminars");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const seminars = await response.json();
      setData(seminars);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Функция для удаления семинаров
  const deleteSeminar = async (title) => {
    try {
      const isConfirm = confirm(`Вы уверены, что хотите удалить "${title}"`);
      if (isConfirm) {
        const response = await fetch(
          `http://localhost:3000/seminars/${title}`,
          {
            method: "DELETE",
          }
        );
        setData(data.filter((item) => item.title !== title));
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Функция для редактирования семинара
  const updateSeminar = async (updatedSeminar) => {
    try {
      const response = await fetch(
        `http://localhost:3000/seminars/${updatedSeminar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSeminar),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при редактировании семинара");
      }

      const seminar = await response.json();

      // Обновление состояния (изменение старого семинара на новый)
      setData(data.map((item) => (item.id === seminar.id ? seminar : item)));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Функция для изменения формата даты
  const formatDateForDisplay = (dateString) => {
    try {
      const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());
      return format(parsedDate, "dd.MM.yyyy");
    } catch (error) {
      return "";
    }
  };

   // Функция открытия модального окна
  const openModal = (item) => {
    setIsOpen(true);
    setEditingSeminar(item);
  };

   // Функция закрытия модального окна
  const closeModal = () => {
    setIsOpen(false);
    setEditingSeminar(null);
  };

  return (
    <section className={styles.container}>
      <h1>Тестовое задание для Junior React Developer</h1>
      <ul className={styles.card}>
        {data.map((item) => (
          <li key={item.id} className={styles.card_item}>
            <div className={styles.wrapper}>
              <img
                src={item.photo}
                alt="photo"
                className={styles.image}
              />
            </div>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.info_date}>
              <p>{formatDateForDisplay(item.date)}</p>
              <p>{item.time}</p>
            </div>
            <div>
              <button
                className={styles.btn}
                onClick={() => deleteSeminar(item.title)}
              >
                Удалить
              </button>
              <button onClick={() => openModal(item)} className={styles.btn}>
                Редактировать
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isOpen && <Modal
        onClose={closeModal}
        seminar={editingSeminar}
        onSave={updateSeminar}
      />}
    </section>
  );
};

export default SeminarList;
