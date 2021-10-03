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
      // eslint-disable-next-line no-param-reassign
      state.countriesInfo = action.payload;
    },
    mockStatusCountryApi: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.loadingStatusCountryApi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(covidApiAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loadingStatusCovidApi = 'loading';
      })
      .addCase(countriesApiAsync.pending, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loadingStatusCountryApi = 'loading';
      })
      .addCase(countriesApiAsync.rejected, (state) => {
        // eslint-disable-next-line no-param-reassign
        state.loadingStatusCountryApi = 'reject';
      })
      .addCase(covidApiAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loadingStatusCovidApi = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.global = action.payload.Global;
        // eslint-disable-next-line no-param-reassign
        state.countriesInCovid = action.payload.Countries;
      })
      .addCase(countriesApiAsync.fulfilled, (state, action) => {
        // eslint-disable-next-line no-param-reassign
        state.loadingStatusCountryApi = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.countriesInfo = action.payload;
      })
      .addCase(ipAddressAsync.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
        state.loadingStatusIpApi = 'idle';
        // eslint-disable-next-line no-param-reassign
        state.ipApi = ipConverter(action.payload.split('\n'));
      });
  },
});
export const { mockApiCountry, mockStatusCountryApi } = covidSlice.actions;

export default covidSlice.reducer;
