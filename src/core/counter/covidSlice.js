import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProjectApi from "../api/covidApi/provider";
import ipConverter from "../api/covidApi/ipConverter";

const initialState = {
  global: [],
  countriesInCovid: [],
  value: 100,
  loadingStatusCovidApi: 'initialize',
  loadingStatusCountryApi: 'initialize',
  loadingStatusIpApi: 'initialize',
  countriesInfo: [],
  ipApi: [],
};

export const covidApiAsync = createAsyncThunk(
  'covid/getAllCovid',
  async () => {
    const response = await ProjectApi.getCovid();

    return response;
  },
);

export const countriesApiAsync = createAsyncThunk(
  'covid/getAllCountry',
  async () => {
    const response = await ProjectApi.getCountry();

    return response;
  },
);

export const ipAddressAsync = createAsyncThunk(
  'covid/get ipAddress',
  async () => {
    const response = await ProjectApi.getLookup();

    return response;
  },
);

export const covidSlice = createSlice({
  name: 'covid',
  initialState,
  reducers: {
    mockApiCountry: (state, action) => {
      state.countriesInfo = action.payload;
    },
    mockStatusCountryApi: (state, action) => {
      state.loadingStatusCountryApi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(covidApiAsync.pending, (state) => {
        state.loadingStatusCovidApi = 'loading';
      })
      .addCase(countriesApiAsync.pending, (state) => {
        state.loadingStatusCountryApi = 'loading';
      })
      .addCase(countriesApiAsync.rejected, (state) => {
        state.loadingStatusCountryApi = 'reject';
      })
      .addCase(covidApiAsync.fulfilled, (state, action) => {
        state.loadingStatusCovidApi = 'idle';
        state.global = action.payload.Global;
        state.countriesInCovid = action.payload.Countries;
      })
      .addCase(countriesApiAsync.fulfilled, (state, action) => {
        state.loadingStatusCountryApi = 'idle';
        state.countriesInfo = action.payload;
      })
      .addCase(ipAddressAsync.fulfilled, (state, action) => {
        state.loadingStatusIpApi = 'idle';
        state.ipApi = ipConverter(action.payload.split('\n'));
      });
  },
});
export const { mockApiCountry, mockStatusCountryApi } = covidSlice.actions;

export default covidSlice.reducer;
