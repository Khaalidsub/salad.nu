import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as apiActions from "./../api";

const defaultSelectedCourse = { id: -1 };
const defaultSelectedSection = { info: null };
const defaultBuilding = { lat: null, lon: null };
const noBuilding = { lat: -360, lon: -360 };
const defaultHoveredScheduledSection = { id: -1 };
const defaultHoveredSection = { id: -1 };

// Reducers
const slice = createSlice({
  name: "interactions",
  initialState: {
    searchStr: "",
    selectedCourse: defaultSelectedCourse,
    selectedSection: defaultSelectedSection,
    currentBuilding: defaultBuilding,
    hoveredScheduledSection: defaultHoveredScheduledSection,
    hoveredSection: defaultHoveredSection,
  },
  reducers: {
    updatedSearch: (interactions, action) => {
      interactions.searchStr = action.payload.searchStr;
    },
    updatedSelectedCourse: (interactions, action) => {
      interactions.selectedCourse = action.payload;
    },
    clearedSelectedCourse: (interactions, action) => {
      interactions.selectedCourse = defaultSelectedCourse;
    },
    updatedSelectedSection: (interactions, action) => {
      interactions.selectedSection = action.payload;
    },
    clearedSelectedSection: (interactions, action) => {
      interactions.selectedSection = defaultSelectedSection;
    },
    updatedCurrentBuilding: (interactions, action) => {
      const response = action.payload.data;
      if (!response || !response.lat || !response.lon)
        interactions.currentBuilding = noBuilding;
      else
        interactions.currentBuilding = { lat: response.lat, lon: response.lon };
    },
    updatedNoCurrentBuilding: (interactions, action) => {
      interactions.currentBuilding = noBuilding;
    },
    clearedCurrentBuilding: (interactions, action) => {
      interactions.currentBuilding = defaultBuilding;
    },
    updatedHoveredScheduledSection: (interactions, action) => {
      interactions.hoveredScheduledSection.id = action.payload.id;
    },
    clearedHoveredScheduledSection: (interactions, action) => {
      interactions.hoveredScheduledSection = defaultHoveredScheduledSection;
    },
    updatedHoveredSection: (interactions, action) => {
      interactions.hoveredSection.id = action.payload.id;
    },
    clearedHoveredSection: (interactions, action) => {
      interactions.hoveredSection = defaultHoveredSection;
    },
  },
});

const {
  updatedSearch,
  updatedSelectedCourse,
  clearedSelectedCourse,
  updatedSelectedSection,
  clearedSelectedSection,
  updatedCurrentBuilding,
  updatedNoCurrentBuilding,
  clearedCurrentBuilding,
  updatedHoveredScheduledSection,
  clearedHoveredScheduledSection,
  updatedHoveredSection,
  clearedHoveredSection,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const updateSearch = (searchStr) => {
  return updatedSearch({ searchStr });
};

export const updateSelectedCourse = (id) => {
  return updatedSelectedCourse({ id });
};

export const clearSelectedCourse = () => {
  return clearedSelectedCourse();
};

export const updateSelectedSection = (info) => {
  return updatedSelectedSection({ info });
};

export const updateRemovableSelectedSection = (info) => {
  return updatedSelectedSection({ info: { ...info, removable: true } });
};

export const clearSelectedSection = () => {
  return clearedSelectedSection();
};

export const updateCurrentBuilding = (buildingId) => (dispatch, getState) => {
  const resource = "buildings";
  return dispatch(
    apiActions.apiRequested({
      resource,
      data: buildingId,
      onSuccess: updatedCurrentBuilding.type,
    })
  );
};

export const updateNoCurrentBuilding = () => {
  return updatedNoCurrentBuilding();
};

export const clearCurrentBuilding = () => {
  return clearedCurrentBuilding();
};

export const updateHoveredScheduledSection = (id) => {
  return updatedHoveredScheduledSection({ id });
};

export const clearHoveredScheduledSection = () => {
  return clearedHoveredScheduledSection();
};

export const updateHoveredSection = (id) => {
  return updatedHoveredSection({ id });
};

export const clearHoveredSection = () => {
  return clearedHoveredSection();
};

// Selectors
export const getSearch = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.searchStr
);

export const getSelectedCourse = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.selectedCourse
);

export const getSelectedSection = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.selectedSection
);

export const getCurrentBuilding = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.currentBuilding
);

export const getHoveredScheduledSection = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.hoveredScheduledSection
);

export const getHoveredSection = createSelector(
  (state) => state.interactions,
  (interactions) => interactions.hoveredSection
);
