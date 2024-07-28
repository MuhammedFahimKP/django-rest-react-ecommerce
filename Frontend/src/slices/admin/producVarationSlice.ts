import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  VariationWithSize,
  Variation,
  SizeVariation,
  UpdateSizeVariation,
} from "../../@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/api-client";

interface State extends VariationWithSize {
  current_img: string;
}

const initialState: State = {
  id: "",
  img_id: "",
  img_1: "",
  img_2: "",
  img_3: "",
  color: "",
  current_img: "",
  size_varations: [],
};

export const getVariation = createAsyncThunk(
  "getVaration",
  async (varid: string) => {
    const res = await apiClient.get<Variation>(`admin/varation/${varid}/`);
    const size = await apiClient.get<SizeVariation[]>(
      `admin/varation/sizes/${res.data.id}/`
    );

    return { variation: res.data, sizes: size.data };
  }
);

export const getSizeVarations = createAsyncThunk(
  "getSizeVariation",
  async (varid: string) => {
    const res = await apiClient.get(`admin/varation/sizes/${varid}/`);
    return res.data;
  }
);

const productVariationSlice = createSlice({
  name: "productVariation",
  initialState,
  reducers: {
    setVariation(state: State, action: PayloadAction<VariationWithSize>) {
      state = { ...state, ...action.payload };
    },

    setCurrentImage(state: State, action: PayloadAction<string>) {
      state.current_img = action.payload;
    },

    setSizeVariationOnly(state: State, action: PayloadAction<SizeVariation[]>) {
      state.size_varations = action.payload;
    },

    updateSizeVariation(
      state: State,
      action: PayloadAction<UpdateSizeVariation>
    ) {
      state.size_varations.forEach((item: SizeVariation) => {
        if (item.id === action.payload.id) {
          const price = action.payload?.price
            ? action.payload.price
            : item.price;
          const stock = action.payload?.stock
            ? action.payload.stock
            : item.stock;
          item.price = price;
          item.stock = stock;
        }
      });
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      getVariation.fulfilled,
      (
        state: State,
        action: PayloadAction<{ variation: Variation; sizes: SizeVariation[] }>
      ) => {
        state.id = action.payload.variation.id;
        state.img_1 = action.payload.variation.img_1;
        state.img_2 = action.payload.variation.img_2;
        state.img_3 = action.payload.variation.img_3;
        state.size_varations = action.payload.sizes;
        state.color = action.payload.variation.color;
      }
    ),
      builder.addCase(
        getSizeVarations.fulfilled,
        (state: State, action: PayloadAction<SizeVariation[]>) => {
          state.size_varations = action.payload;
        }
      );
  },
});

export const {
  setVariation,
  setCurrentImage,
  setSizeVariationOnly,
  updateSizeVariation,
} = productVariationSlice.actions;

export default productVariationSlice.reducer;
