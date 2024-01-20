import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Advices, NewAdvice } from '../types/Advice';
import { addAdvice, removeAdvice, loadAdvices } from '../api/advices';
import { ServerErrorResponse } from '../types/ServerErrorResponse';
import { parseErrors } from '../helpers/parseErrors';

export type AdvicesState = {
  advices: Advices;
  isLoadingAdvices: boolean;
  isUploadingAdvice: boolean;
  deletingAdviceId: number | null;
  deletedAdviceId: number | null;
  errorsLoading: ServerErrorResponse | null;
  errorsUploading: ServerErrorResponse | null;
  errorsDelete: ServerErrorResponse | null;
};

const initialState: AdvicesState = {
  advices: {
    num_pages: 0,
    current_page: 1,
    next_page: null,
    previous_page: null,
    results: [],
  },
  isLoadingAdvices: false,
  isUploadingAdvice: false,
  deletingAdviceId: null,
  deletedAdviceId: null,
  errorsLoading: null,
  errorsUploading: null,
  errorsDelete: null,
};

export const init = createAsyncThunk('fetch/advices', async (page: string) => {
  const response = await loadAdvices(page);

  return response;
});

export const add = createAsyncThunk(
  'post/advice',
  async (newAdvice: NewAdvice) => {
    const response = await addAdvice(newAdvice);

    return response;
  },
);

export const remove = createAsyncThunk('delete/advice', async (id: number) => {
  await removeAdvice(id);

  return id;
});

export const advicesSlice = createSlice({
  name: 'advices',
  initialState,

  reducers: {
    clearDeletedId: state => {
      state.deletedAdviceId = null;
    },

    clearErrorsDelete: state => {
      state.errorsDelete = null;
    },
  },

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.isLoadingAdvices = true;
      state.errorsLoading = null;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.isLoadingAdvices = false;
      state.advices = action.payload;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.isLoadingAdvices = false;
      state.errorsLoading = parseErrors(action.error.message);
    });

    builder.addCase(add.pending, state => {
      state.isUploadingAdvice = true;
      state.errorsUploading = null;
    });

    builder.addCase(add.fulfilled, (state, action) => {
      state.isUploadingAdvice = false;
      state.advices.results.push(action.payload);
    });

    builder.addCase(add.rejected, (state, action) => {
      state.isUploadingAdvice = false;
      state.errorsUploading = parseErrors(action.error.message);
    });

    builder.addCase(remove.pending, (state, action) => {
      state.deletingAdviceId = action.meta.arg;
      state.errorsDelete = null;
    });

    builder.addCase(remove.fulfilled, (state, action) => {
      state.deletingAdviceId = null;
      state.advices.results = state.advices.results.filter(
        advice => advice.id !== action.payload,
      );
      state.deletedAdviceId = action.payload;
    });

    builder.addCase(remove.rejected, (state, action) => {
      state.deletingAdviceId = null;
      state.errorsDelete = parseErrors(action.error.message);
    });
  },
});

export const { clearDeletedId, clearErrorsDelete } = advicesSlice.actions;
export default advicesSlice.reducer;
