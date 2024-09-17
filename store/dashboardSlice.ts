// src/store/dashboardSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardData, initialDashboardData, Widget } from '../data/dashboardData';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialDashboardData,
  reducers: {
    addWidget: (state, action: PayloadAction<{ categoryId: string; widget: Widget }>) => {
      const category = state.categories.find(c => c.id === action.payload.categoryId);
      if (category) {
        category.widgets.push(action.payload.widget);
      }
    },
    removeWidget: (state, action: PayloadAction<{ categoryId: string; widgetId: string }>) => {
      const category = state.categories.find(c => c.id === action.payload.categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== action.payload.widgetId);
      }
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;

