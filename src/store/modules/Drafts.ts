import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    Dictionary,
    EntityId,
  } from "@reduxjs/toolkit";
  import { Draft } from "../../types";
  
  interface DraftsState {
    status: "loaded" | "loading" | "errored";
    error: Error | null;
    pendingDraft?: Draft;
    ids: EntityId[];
    entities: Dictionary<Draft>;
  }
  
  const DraftsAdapter = createEntityAdapter<Draft>({
    selectId: (Draft) => Draft.id,
  });
  
  export const newDraft = createAsyncThunk<Draft, number>(
    "Drafts/new",
    async (num) => {
      return {id: num, name: "", category: "", description: "", thumbnail: {uri: "default"}, gallery: [{uri: "default"}]};
    }
  );

  export const editDraft = createAsyncThunk<Draft, Draft>(
    "Drafts/edit",
    async (draft) => {
      return draft;
    }
  );

  export const emptyDraft = createAsyncThunk<Draft, any>(
    "Drafts/empty",
    async (num) => {
      return num;
    }
  );

  const initialState: DraftsState = {
    status: "loaded",
    error: null,
    pendingDraft: undefined,
    ...DraftsAdapter.getInitialState(),
  };
  
  const DraftsSlice = createSlice({
    name: "drafts",
    initialState,
    reducers: {
      addDraft: DraftsAdapter.addOne,
    },
    extraReducers: (builder) => {
      builder.addCase(newDraft.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
      builder.addCase(newDraft.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pendingDraft = action.payload;
      });
      builder.addCase(newDraft.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error as Error;
      });
      builder.addCase(editDraft.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
      builder.addCase(editDraft.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pendingDraft = action.payload;
      });
      builder.addCase(editDraft.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error as Error;
      });
      builder.addCase(emptyDraft.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
      builder.addCase(emptyDraft.fulfilled, (state, action) => {
        state.status = "loaded";
        state.pendingDraft = undefined;
      });
      builder.addCase(emptyDraft.rejected, (state, action) => {
        state.status = "errored";
        state.error = action.error as Error;
      });
    },
  });
  
  export const { addDraft } = DraftsSlice.actions;
  
  export const { selectAll: selectAllDrafts } = DraftsAdapter.getSelectors();

  export default DraftsSlice.reducer;