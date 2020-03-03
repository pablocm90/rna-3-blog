import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";




const blogReducer = (state, action) => {
  switch(action.type) {
    case 'delete_blogpost':
      return state.filter((blogPost) => {
        return blogPost.id !== action.payload
      });
    case 'edit_blogpost':
      return state.map((blogPost) => {
        return action.payload.id !== blogPost.id
        ? blogPost
        : action.payload
      })
    case 'get_blogposts':
      return action.payload;
    default:
      return state;
  }
};


const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', {title, content});

    if (callback) {
      callback()
    }

  }
}
const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: 'delete_blogpost', payload: { id } })

  }
}

const editBlogPost =  (dispatch) => {
  return async (title, content, id, callback) => {
    await jsonServer.put(`/blogposts/${id}`, {title, content})

    dispatch({ type: 'edit_blogpost', payload: { title, content, id } })
    if (callback) {
      callback()
    }
  }
}

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');

    dispatch({type: 'get_blogposts', payload: response.data})
  };
}


export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts
  },
  []
);
