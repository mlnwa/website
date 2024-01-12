import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category, QueryCategoryList } from '../../api/module/category';
import { QueryTagList, Tag } from '../../api/module/tag';
import { Column, QueryColumnList } from '../../api/module/column';
import { RootState } from '..';

interface BlogMetaState {
  categorys: Category[];
  freshCategorys: boolean;
  tags: Tag[];
  freshTags: boolean;
  columns: Column[];
  freshColumns: boolean;
}

const initialState: BlogMetaState = {
  categorys: [],
  freshCategorys: true,
  tags: [],
  freshTags: true,
  columns: [],
  freshColumns: true,
};
export const fetchCategorys = createAsyncThunk<void, void, { state: RootState }>(
  'blogMeta/fetchCategorys',
  async (_, { dispatch, getState }) => {
    const { categorys, freshCategorys } = getState().blogMeta;
    if (categorys.length > 0 && !freshCategorys) {
      return;
    }
    let categoryModel = await QueryCategoryList({
      pageIndex: 1,
      pageSize: 199,
    });
    dispatch(setCategorys(categoryModel.result.list));
    dispatch(setFreshCategorys(false));
  },
);
export const fetchTags = createAsyncThunk<void, void, { state: RootState }>(
  'blogMeta/fetchTags',
  async (_, { getState, dispatch }) => {
    const { tags, freshTags } = getState().blogMeta;
    if (tags.length > 0 && !freshTags) {
      return;
    }
    let tagModel = await QueryTagList({
      pageIndex: 1,
      pageSize: 199,
    });
    dispatch(setTags(tagModel.result.list));
    dispatch(setFreshTags(false));
  },
);
export const fetchColumns = createAsyncThunk<void, void, { state: RootState }>(
  'blogMeta/fetchColumns',
  async (_, { getState, dispatch }) => {
    const { columns, freshColumns } = getState().blogMeta;
    if (columns.length > 0 && !freshColumns) {
      return;
    }
    let columnsModel = await QueryColumnList({
      pageIndex: 1,
      pageSize: 199,
    });
    dispatch(setColumns(columnsModel.result.list));
    dispatch(setFreshColumns(false));
  },
);

const blogMetaSlice = createSlice({
  name: 'blogMeta',
  initialState,
  reducers: {
    setCategorys: (state, { payload }) => {
      state.categorys = payload;
    },
    setTags: (state, { payload }) => {
      state.tags = payload;
    },
    setColumns: (state, { payload }) => {
      state.columns = payload;
    },
    setFreshCategorys: (state, { payload }) => {
      state.freshCategorys = payload;
    },
    setFreshTags: (state, { payload }) => {
      state.freshTags = payload;
    },
    setFreshColumns: (state, { payload }) => {
      state.freshColumns = payload;
    },
  },
});
export const { setCategorys, setTags, setColumns, setFreshCategorys, setFreshColumns, setFreshTags } =
  blogMetaSlice.actions;
export default blogMetaSlice.reducer;
