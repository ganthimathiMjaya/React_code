import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from 'react';

import SelectBox from 'devextreme-react/select-box';
import { useToast } from "../utils/ToastContext";

const FormulaEditor = forwardRef(({ columnsData, formula, onAddColumn }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [selectedDataType, setSelectedDataType] = useState(null);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const formulaInputRef = useRef(null);
    const { showToast } = useToast();

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        resetForm: () => {
            setInputValue('');
            setFieldName('');
            setSelectedDataType(null);
        },
    }));

    const dataTypes = ['String', 'Integer', 'Decimal', 'Date'];

    useEffect(() => {
        setDropdownItems(
            formula
                .filter((f) => f.TypeId === 3)
                .map((f) => ({ id: f.FromulaId, text: f.Formula }))
        );
    }, [formula]);

    const handleInputChange = (value) => {
        setInputValue(value);

        if (value.trim() === '') {
            // If the input is empty, show only formulas with TypeId === 3
            setDropdownItems(
                formula
                    .filter((f) => f.TypeId === 3)
                    .map((f) => ({ id: f.FromulaId, text: f.Formula }))
            );
            setIsDropdownVisible(true);
            return;
        }

        const cursorPosition = formulaInputRef.current.selectionStart;
        const leftBracketIndex = value.lastIndexOf('[', cursorPosition - 1);
        const rightBracketIndex = value.indexOf(']', leftBracketIndex);

        if (
            leftBracketIndex !== -1 &&
            (rightBracketIndex === -1 || cursorPosition <= rightBracketIndex)
        ) {
            // Cursor is inside brackets, suggest columns
            const cursorText = value.slice(leftBracketIndex + 1, cursorPosition);
            const filteredSuggestions = columnsData
                .filter((f) =>
                    f.ColumnName.toUpperCase().includes(cursorText.toUpperCase())
                )
                .map((f) => ({ id: f.RowNo, text: f.ColumnName }));
            setDropdownItems(filteredSuggestions);
        } else {
            // Suggest formulas based on input
            const filteredFormulas = formula
                .filter((f) =>
                    f.Formula.toUpperCase().includes(value.toUpperCase())
                )
                .map((f) => ({ id: f.FromulaId, text: f.Formula }));
            setDropdownItems(filteredFormulas);
        }

        setIsDropdownVisible(true);
    };

    const handleAddColumn = () => {
        if (!fieldName.trim()) {
            showToast("Field name is required", "error");
            return;
        }
        if (/\s/.test(fieldName)) {
            showToast("Spaces are not allowed in field names", "error");
            return;
        }
        if (!selectedDataType) {
            showToast("Please select a data type", "error");
            return;
        }
        if (!inputValue.trim()) {
            showToast("Formula input is required", "error");
            return;
        }
    
        const payload = {
            formulaInput: inputValue.trim(),
            columnName: fieldName.trim(),
            datatype: selectedDataType,
            additionType: 3,
            oldRowNo: 0
        };
    
        // Pass the payload to the parent or backend
        onAddColumn(payload);
    };
    
   
    const handleFormulaSelect = (selected) => {
        const selectedItem = dropdownItems.find((item) => item.id === selected);
        if (selectedItem) {
            const inputField = formulaInputRef.current;
            const cursorPosition = inputField.selectionStart;
            const currentVal = inputValue;

            const newValue =
                currentVal.substring(0, cursorPosition) +
                selectedItem.text +
                (selectedItem.text.endsWith(']') ? '' : ']') +
                currentVal.substring(cursorPosition);

            setInputValue(newValue);

            setTimeout(() => {
                inputField.setSelectionRange(
                    cursorPosition + selectedItem.text.length + (selectedItem.text.endsWith(']') ? 0 : 1),
                    cursorPosition + selectedItem.text.length + (selectedItem.text.endsWith(']') ? 0 : 1)
                );
                inputField.focus();
            }, 0);
        }
        setIsDropdownVisible(false);
    };

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsDropdownVisible(false);
        }, 200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prev) => Math.min(prev + 1, dropdownItems.length - 1));
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
            e.preventDefault();
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            handleFormulaSelect(dropdownItems[selectedIndex].id);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setIsDropdownVisible(false);
        }
    };
    const suggestionStyles = {
        position: 'absolute',
        background: 'white',
        border: '1px solid #ddd',
        maxHeight: '200px', // Maximum height for the suggestion list
        overflowY: 'auto', // Vertical scroll when content exceeds maxHeight
        overflowX: 'hidden', // No horizontal scroll
        zIndex: 1000,
        width: '86%',
    };

    const suggestionItemStyles = {
        padding: '5px',
        cursor: 'pointer',
    };

    const highlightStyles = {
        ...suggestionItemStyles,
        backgroundColor: '#007bff',
        color: 'white',
    };


    return (
        <div style={{ padding: '20px' }}>
            <div>
                <label>Field Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '16px' }}>
                <SelectBox
                    items={dataTypes}
                    value={selectedDataType}
                    onValueChanged={(e) => setSelectedDataType(e.value)}
                    placeholder="Select Datatype"
                    className="form-control"
                />
            </div>
            <div style={{ marginTop: '16px' }}>
                <label>Column Formula</label>
                <div className="parent-container" style={{ flex: 1, marginBottom: '10px' }}>
                    <input
                        type="text"
                        id="formula-input"
                        placeholder="Enter formula..."
                        value={inputValue}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={formulaInputRef}
                        style={{ padding: '5px', width: '100%', minWidth: '200px' }}
                    />
                    {isDropdownVisible && (
                        <div id="suggestions" className="suggestionStyles">
                            {dropdownItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    style={index === selectedIndex ? highlightStyles : suggestionItemStyles}
                                    onClick={() => handleFormulaSelect(item.id)}
                                    title={formula.find((f) => f.FromulaId === item.id)?.Descripton || ''} // Show description if available
                                >
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div style={{ position: 'fixed', bottom: '20px', left: '80%', transform: 'translateX(-50%)', zIndex: 1100 }}>
                <button type="button" className="btn btn-default btnsave" data-dismiss="modal" onClick={handleAddColumn}>
                    Add Column
                </button>
            </div>
            </div>
        </div>
    );
});

export default FormulaEditor;
