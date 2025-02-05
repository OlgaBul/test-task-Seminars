import React, { useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ onClose, seminar, onSave }) => {
  const [title, setTitle] = useState(seminar?.title || "");
  const [description, setDescription] = useState(seminar?.description || "");
  const [date, setDate] = useState(seminar?.date || "");
  const [time, setTime] = useState(seminar?.time || "");

  const handleSave = () => {
    onSave({ ...seminar, title, description, date, time });
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target == e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2>Редактировать семинар</h2>
        <div>
          <label>
            Семинар:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              autoFocus
            />
          </label>
        </div>
        <div>
          <label>
            Описание:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Дата:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Время:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.btn}>
          <button onClick={handleSave} className={styles.button}>
            Сохранить
          </button>
          <button onClick={onClose} className={styles.button}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
