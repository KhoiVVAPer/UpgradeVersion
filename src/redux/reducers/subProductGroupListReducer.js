import { appConstants } from '../../config';

const { reduxConst } = appConstants;
const {
  SUB_PRODUCT_GROUPS_GET_SUCCESS,
  SUB_PRODUCT_GROUPS_GET_ERROR,
  SUB_PRODUCT_GROUPS_GET_LOADING,
  SUB_PRODUCT_GROUPS_GET_ARR_LOADING,
  SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS,
  SUB_PRODUCT_GROUPS_GET_ARR_ERROR,
  RESET_APP
} = reduxConst;

export default (state = {}, action) => {
  switch (action.type) {
    case SUB_PRODUCT_GROUPS_GET_SUCCESS: {
      const loadingState = {
        loading: false,
        error: false,
        obj: action.obj
      };
      return {
        ...state,
        [action.productgroupId]: loadingState
      };
    }

    case SUB_PRODUCT_GROUPS_GET_ERROR: {
      const loadingState = {
        loading: false,
        error: true,
        obj: {}
      };
      return {
        ...state,
        [action.productgroupId]: loadingState
      };
    }

    case SUB_PRODUCT_GROUPS_GET_LOADING: {
      const loadingState = {
        loading: true,
        error: false,
        obj: {}
      };
      return {
        ...state,
        [action.productgroupId]: loadingState
      };
    }

    case SUB_PRODUCT_GROUPS_GET_ARR_LOADING: {
      let groupsObj = { ...state };
      action.productgroupIdArr.map((productgroupId) => {
        const loadingState = {
          loading: true,
          error: false,
          obj: {}
        };
        groupsObj = {
          ...groupsObj,
          [productgroupId]: loadingState
        };
        return null;
      });
      return groupsObj;
    }

    case SUB_PRODUCT_GROUPS_GET_ARR_ERROR: {
      let groupsObj = { ...state };
      action.productgroupIdArr.map((productgroupId) => {
        const loadingState = {
          loading: false,
          error: true,
          obj: {}
        };
        groupsObj = {
          ...groupsObj,
          [productgroupId]: loadingState
        };
        return null;
      });
      return groupsObj;
    }

    case SUB_PRODUCT_GROUPS_GET_ARR_SUCCESS: {
      let groupsObj = { ...state };
      action.subProductGroupDataArr.map((subProductGroupData) => {
        const loadingState = {
          loading: false,
          error: false,
          obj: subProductGroupData
        };
        groupsObj = {
          ...groupsObj,
          [subProductGroupData.productgroupId]: loadingState
        };
        return null;
      });
      return groupsObj;
    }

    case RESET_APP:
      return {};

    default:
      return state;
  }
};
