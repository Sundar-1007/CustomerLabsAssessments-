import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  segmentName: '',
  schemas: [],
  availableSchemas: [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ],
  loading: false,
};

export const saveSegment = createAsyncThunk(
  'segment/saveSegment',
  async (segmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://668109c956c2c76b495d5169.mockapi.io/api/data/schemas', segmentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const segmentSlice = createSlice({
  name: 'segment',
  initialState,
  reducers: {
    setSegmentName: (state, action) => {
      state.segmentName = action.payload;
    },
    addSchema: (state, action) => {
      const schema = state.availableSchemas.find(s => s.value === action.payload);
      if (schema) {
        state.schemas.push(schema);
        state.availableSchemas = state.availableSchemas.filter(s => s.value !== action.payload);
      }
    },
    removeSchema: (state, action) => {
      const removedSchema = state.schemas[action.payload];
      state.schemas.splice(action.payload, 1);
      state.availableSchemas.push(removedSchema);
    },
    resetForm: (state) => {
      state.segmentName = '';
      state.schemas = [];
      state.availableSchemas = initialState.availableSchemas;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSegment.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveSegment.fulfilled, (state) => {
        state.loading = false;
        state.segmentName = '';
        state.schemas = [];
        state.availableSchemas = initialState.availableSchemas;
      })
      .addCase(saveSegment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSegmentName, addSchema, removeSchema, resetForm } = segmentSlice.actions;

export default segmentSlice.reducer;
