import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../../../utils/constants';
import { IProductCard } from '../../../../components/ProductCard/ProductCardTypes';

interface ICardsState {
  status: 'idle' | 'success' | 'loading' | 'failed';
  error: unknown;
  cards: IProductCard[];
  card: IProductCard;
}

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (params: string = 'NEWEST', { rejectWithValue, fulfillWithValue }) => {
    const sort = `sort=${params}`;

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/product/search/?${sort}`,
      );
      return fulfillWithValue(data);
    } catch (error: unknown) {
      rejectWithValue(error);
    }
  },
);

export const fetchSingleCard = createAsyncThunk(
  'cards/fetchSingleCard',
  async (id: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/product/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const initialState: ICardsState = {
  status: 'idle',
  error: null,
  cards: [],
  card: {
    name: '',
    price: 0,
    installationPrice: 0,
    image: { url: '' },
  },
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchSingleCard.fulfilled, (state, action) => {
        state.card = action.payload;
      });
  },
});

export default cardsSlice.reducer;
