import axios from "axios";
import {
  JOB_DATA_REQUEST,
  JOB_DATA_SUCCESS,
  JOB_DATA_FAILURE,
} from "./constants";

const jobAction = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: JOB_DATA_REQUEST,
    });
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/jobs", options);
    dispatch({
      type: JOB_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: JOB_DATA_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export default jobAction;
