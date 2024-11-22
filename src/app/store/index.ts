import { LayoutState, layoutReducer } from "./layouts/layouts.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface RootReducerState {
    layout: LayoutState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
}