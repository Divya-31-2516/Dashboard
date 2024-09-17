// src/components/Dashboard.tsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addWidget, removeWidget } from '../store/dashboardSlice';
import { Widget } from '../data/dashboardData';

const Dashboard: React.FC = () => {
  const categories = useSelector((state: RootState) => state.dashboard.categories);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [newWidget, setNewWidget] = useState<{ name: string; text: string; categoryId: string }>({
    name: '',
    text: '',
    categoryId: '',
  });

  const handleAddWidget = () => {
    if (newWidget.name && newWidget.text && newWidget.categoryId) {
      const widget: Widget = {
        id: Date.now().toString(),
        name: newWidget.name,
        text: newWidget.text,
      };
      dispatch(addWidget({ categoryId: newWidget.categoryId, widget }));
      setNewWidget({ name: '', text: '', categoryId: '' });
    }
  };

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Search widgets"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div>
        <h2>Add Widget</h2>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidget.name}
          onChange={e => setNewWidget({ ...newWidget, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={newWidget.text}
          onChange={e => setNewWidget({ ...newWidget, text: e.target.value })}
        />
        <select
          value={newWidget.categoryId}
          onChange={e => setNewWidget({ ...newWidget, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddWidget}>Add Widget</button>
      </div>
      {filteredCategories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          {category.widgets.map(widget => (
            <div key={widget.id}>
              <h3>{widget.name}</h3>
              <p>{widget.text}</p>
              <button onClick={() => handleRemoveWidget(category.id, widget.id)}>Remove</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;