import React, { useState } from 'react';
import './TableDimensionModal.css';

const MAX_COLUMNS = 20;
const MAX_ROWS = 20;

const TableDimensionModal = ({ visible, onClose, onSubmit }) => {
    const [columns, setColumns] = useState(3);
    const [rows, setRows] = useState(3);
    const [error, setError] = useState('');

    const handleColumnsChange = (e) => {
        let value = parseInt(e.target.value, 10);

        if (value > MAX_COLUMNS) {
            setError(`Максимум столбцов: ${MAX_COLUMNS}`);
            value = MAX_COLUMNS;
        } else {
            setError('');
        }
        setColumns(value);
    };

    const handleRowsChange = (e) => {
        let value = parseInt(e.target.value, 10);

        if (value > MAX_ROWS) {
            setError(`Максимум строк: ${MAX_ROWS}`);
            value = MAX_ROWS;
        } else {
            setError('');
        }
        setRows(value);
    };

    const handleSubmit = () => {
        console.log(columns, "columns")
        if (isNaN(rows) || isNaN(columns)  || rows < 1 || columns < 1) {
            setError('Количество строк и столбцов должно быть не меньше 1');
            return;
        }
        onSubmit(rows, columns);
        onClose();
    };

    if (!visible) return null;

    return (
        <div className='shadow-overlay'>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Размер таблицы</h4>
                    <div className="modal-input-group">
                        <label>
                            Столбцы:
                            <input
                                type="number"
                                value={columns}
                                min="1"
                                max={MAX_COLUMNS}
                                onChange={handleColumnsChange}
                            />
                        </label>
                        <label>
                            Строки:
                            <input
                                type="number"
                                value={rows}
                                min="1"
                                max={MAX_ROWS}
                                onChange={handleRowsChange}
                            />
                        </label>
                    </div>
                    {error && <div className="modal-error">{error}</div>}
                    <div className="modal-buttons">
                        <button onClick={onClose} className="modal-btn modal-btn-cancel">
                            Отмена
                        </button>
                        <button onClick={handleSubmit} className="modal-btn modal-btn-submit">
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableDimensionModal;
